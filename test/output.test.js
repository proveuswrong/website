const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const {
  ERROR_PAGE_ADDRESS,
  PAGE_ADDRESSES,
  PRODUCTION_SITE_URL,
  STATIC_DIRECTORY,
  builtPageAddresses,
  describeBuiltPage,
  expectedBuild,
  filesUnder,
  isBuilt,
  linesOfBuilt,
  manifestOfBuild,
  markdownPages,
  readBuilt,
  readBuiltText,
  siteUrl,
} = require("./built-site");
const { STRUCTURED_DATA } = require("./page-facts");

const EVERY_PAGE = [...PAGE_ADDRESSES, ERROR_PAGE_ADDRESS];
const STATE_THE_MENU_SCRIPT_KEEPS = "aria-expanded";
const NOINDEX = "noindex";
const NOINDEX_HEADER_RULE = ["/*", `X-Robots-Tag: ${NOINDEX}`];
const OPEN_GRAPH_IMAGE_ADDRESS = "/icons/icon-256x256.png";
const CHARACTERS_SEARCH_RESULTS_SHOW = 160;
const EDITORS_NOTE = /\[\[[^\]]*\]\]/;

// Width and height of a PNG are the first two fields of its IHDR chunk:
// https://www.w3.org/TR/png-3/#11IHDR
const PNG_WIDTH_OFFSET = 16;
const PNG_HEIGHT_OFFSET = 20;

const sizeOfPng = (png) =>
  `${png.readUInt32BE(PNG_WIDTH_OFFSET)}x${png.readUInt32BE(
    PNG_HEIGHT_OFFSET
  )}`;

const runs = ({ type }) => type !== STRUCTURED_DATA;

const siteWithoutSlash = () => siteUrl().slice(0, -1);

const addressOnSite = (address) => `${siteWithoutSlash()}${address}`;

const targetOf = (href, pageAddress) =>
  new URL(href, addressOnSite(pageAddress));

const isWebAddress = (target) => ["http:", "https:"].includes(target.protocol);

const isOnSite = (target) => target.origin === new URL(siteUrl()).origin;

const anchorsOf = (pageAddress) =>
  describeBuiltPage(pageAddress).anchors.map((anchor) => ({
    ...anchor,
    target: targetOf(anchor.href, pageAddress),
    opensIn: anchor.target,
  }));

const leadsSomewhere = (target) => {
  const address = decodeURIComponent(target.pathname);
  if (!isBuilt(address)) return false;
  if (!target.hash) return true;

  const id = decodeURIComponent(target.hash.slice(1));
  return describeBuiltPage(address).ids.includes(id);
};

test("every address of the contract is a built page", () => {
  assert.deepEqual(
    EVERY_PAGE.filter((address) => !isBuilt(address)),
    []
  );
});

test("no page is built beyond the contract", () => {
  assert.deepEqual(builtPageAddresses(), [...PAGE_ADDRESSES].sort());
});

test("a page runs one script, and it is the menu", () => {
  for (const address of EVERY_PAGE) {
    const scripts = describeBuiltPage(address).scripts.filter(runs);

    assert.equal(
      scripts.length,
      1,
      `${address} runs ${scripts.length} scripts`
    );

    const [{ src, code }] = scripts;
    const menuScript = src
      ? readBuiltText(new URL(src, siteUrl()).pathname)
      : code;
    assert.ok(
      menuScript.includes(STATE_THE_MENU_SCRIPT_KEEPS),
      `the script of ${address} never touches ${STATE_THE_MENU_SCRIPT_KEEPS}`
    );
  }
});

test("every file in static/ is served from the root unchanged", () => {
  for (const file of filesUnder(STATIC_DIRECTORY)) {
    assert.ok(isBuilt(`/${file}`), `${file} is missing from the build`);
    assert.ok(
      readBuilt(`/${file}`).equals(
        fs.readFileSync(path.join(STATIC_DIRECTORY, file))
      ),
      `${file} differs from static/${file}`
    );
  }
});

test("robots.txt lets every crawler in and names the site and its sitemap", () => {
  const [userAgent, allow, sitemap, host, ...others] =
    linesOfBuilt("/robots.txt");
  const waysToNameTheHost = [
    `Host: ${siteWithoutSlash()}`,
    `Host: ${new URL(siteUrl()).host}`,
  ];

  assert.deepEqual(
    [userAgent, allow, sitemap, others],
    ["User-agent: *", "Allow: /", `Sitemap: ${siteUrl()}sitemap.xml`, []]
  );
  assert.ok(waysToNameTheHost.includes(host), `unexpected line: ${host}`);
});

test("the sitemap lists the pages of the contract and nothing else", () => {
  const listed = [
    ...readBuiltText("/sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g),
  ].map(([, address]) => address);

  assert.deepEqual(listed.sort(), PAGE_ADDRESSES.map(addressOnSite).sort());
});

if (expectedBuild() === "production") {
  test("a production build is published at the address of the site", () => {
    assert.equal(siteUrl(), PRODUCTION_SITE_URL);
  });

  test("a production build asks no crawler to stay away from a page of the contract", () => {
    assert.deepEqual(
      PAGE_ADDRESSES.filter(
        (address) => describeBuiltPage(address).robots !== null
      ),
      []
    );
    assert.deepEqual(
      linesOfBuilt("/_headers").filter((line) => /x-robots-tag/i.test(line)),
      []
    );
  });

  test("every page of the contract names its own address, and only it, as canonical", () => {
    assert.deepEqual(
      PAGE_ADDRESSES.map(
        (address) => describeBuiltPage(address).canonicalAddresses
      ),
      PAGE_ADDRESSES.map((address) => [addressOnSite(address)])
    );
  });
} else {
  test("a preview build marks every page noindex", () => {
    assert.deepEqual(
      EVERY_PAGE.filter(
        (address) => describeBuiltPage(address).robots !== NOINDEX
      ),
      []
    );
  });

  test("a preview build sends a noindex header with every response", () => {
    assert.deepEqual(linesOfBuilt("/_headers"), NOINDEX_HEADER_RULE);
  });

  test("a preview build names no canonical address", () => {
    assert.deepEqual(
      EVERY_PAGE.filter(
        (address) => describeBuiltPage(address).canonicalAddresses.length > 0
      ),
      []
    );
  });
}

test("the error page asks every crawler to stay away and names no canonical address", () => {
  const { robots, canonicalAddresses } = describeBuiltPage(ERROR_PAGE_ADDRESS);

  assert.deepEqual({ robots, canonicalAddresses }, {
    robots: NOINDEX,
    canonicalAddresses: [],
  });
});

test("the web app manifest names icons that exist in the size they declare", () => {
  const { icons } = manifestOfBuild();

  assert.ok(icons.length > 0, "the manifest names no icon");
  for (const { src, sizes } of icons) {
    const address = new URL(src, addressOnSite("/")).pathname;

    assert.ok(isBuilt(address), `${address} is missing from the build`);
    assert.equal(sizeOfPng(readBuilt(address)), sizes, address);
  }
});

test("every icon a page links to exists", () => {
  const missing = EVERY_PAGE.flatMap((address) =>
    describeBuiltPage(address)
      .rendering.icons.filter(({ href }) => !isBuilt(href))
      .map(({ href }) => `${address} -> ${href}`)
  );

  assert.deepEqual(missing, []);
});

test("every page offers the 256 pixel icon as its Open Graph image", () => {
  assert.ok(
    isBuilt(OPEN_GRAPH_IMAGE_ADDRESS),
    `${OPEN_GRAPH_IMAGE_ADDRESS} is missing from the build`
  );
  for (const address of EVERY_PAGE) {
    assert.deepEqual(
      describeBuiltPage(address).openGraphImage,
      { address: addressOnSite(OPEN_GRAPH_IMAGE_ADDRESS), isProperty: true },
      address
    );
  }
});

test("every page has a description of its own that search results show whole", () => {
  const descriptionOf = (address) =>
    describeBuiltPage(address).rendering.meta.description ?? "";
  const pagesSharingADescription = [
    ...Map.groupBy(EVERY_PAGE, descriptionOf).values(),
  ].filter((pages) => pages.length > 1);

  assert.deepEqual(
    EVERY_PAGE.filter((address) => descriptionOf(address) === ""),
    [],
    "pages without a description"
  );
  assert.deepEqual(pagesSharingADescription, [], "pages sharing a description");
  assert.deepEqual(
    EVERY_PAGE.filter(
      (address) =>
        [...descriptionOf(address)].length > CHARACTERS_SEARCH_RESULTS_SHOW
    ),
    [],
    `pages whose description is longer than ${CHARACTERS_SEARCH_RESULTS_SHOW} characters`
  );
});

test("no page shows an editor's note", () => {
  const shown = EVERY_PAGE.flatMap((address) =>
    describeBuiltPage(address)
      .rendering.text.filter((line) => EDITORS_NOTE.test(line))
      .map((line) => `${address}: ${line}`)
  );

  assert.deepEqual(shown, []);
});

test("every internal link leads to something the build contains", () => {
  const broken = EVERY_PAGE.flatMap((address) =>
    anchorsOf(address)
      .filter(({ target }) => isWebAddress(target) && isOnSite(target))
      .filter(({ target }) => !leadsSomewhere(target))
      .map(({ href }) => `${address} -> ${href}`)
  );

  assert.deepEqual(broken, []);
});

test("an external link opens in a new tab and keeps the opener to itself", () => {
  const lax = EVERY_PAGE.flatMap((address) =>
    anchorsOf(address)
      .filter(({ target }) => isWebAddress(target) && !isOnSite(target))
      .filter(
        ({ opensIn, rel = "" }) =>
          opensIn !== "_blank" ||
          !rel.split(" ").includes("noopener") ||
          !rel.split(" ").includes("noreferrer")
      )
      .map(({ href }) => `${address} -> ${href}`)
  );

  assert.deepEqual(lax, []);
});

test("the menu button starts closed and controls the navigation", () => {
  for (const address of EVERY_PAGE) {
    const { button, navigationId } = describeBuiltPage(address).menu;

    assert.equal(button.type, "button", address);
    assert.ok(button.label, `${address}: the menu button has no label`);
    assert.equal(button.expanded, "false", address);
    assert.ok(navigationId, `${address}: the navigation has no id`);
    assert.equal(button.controls, navigationId, address);
  }
});

test("a Markdown page is built at the address its slug names", () => {
  const pages = markdownPages().filter(({ isDraft }) => !isDraft);

  assert.ok(pages.length > 0, "no Markdown page was found under src/");
  assert.deepEqual(
    pages.filter(({ address }) => !isBuilt(address)).map(({ file }) => file),
    []
  );
});

test("a Markdown page has a contents list of its second-level headings exactly when its frontmatter asks for one", () => {
  for (const { address, hasContentsList, isDraft } of markdownPages()) {
    if (isDraft) continue;

    const { headings, rendering } = describeBuiltPage(address);
    const secondLevelHeadings = headings
      .filter(({ level }) => level === 2)
      .map(({ id, text }) => ({ href: `#${id}`, text }));

    assert.deepEqual(
      rendering.contents,
      hasContentsList ? secondLevelHeadings : null,
      address
    );
  }
});

test("every heading of a Markdown page has an id and links to itself", () => {
  const unlinked = markdownPages()
    .filter(({ isDraft }) => !isDraft)
    .flatMap(({ address }) =>
      describeBuiltPage(address)
        .headings.filter(({ id, linksToItself }) => !id || !linksToItself)
        .map(({ text }) => `${address}: ${text}`)
    );

  assert.deepEqual(unlinked, []);
});
