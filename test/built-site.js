const fs = require("fs");
const path = require("path");

const { describePage, withoutQuery } = require("./page-facts");

const REPOSITORY = path.join(__dirname, "..");
const OUTPUT_DIRECTORY =
  process.env.OUTPUT_DIRECTORY || path.join(REPOSITORY, "public");
const STATIC_DIRECTORY = path.join(REPOSITORY, "static");
const SOURCE_DIRECTORY = path.join(REPOSITORY, "src");
const REFERENCE_FILE = path.join(__dirname, "reference.json");

const PAGE_ADDRESSES = [
  "/",
  "/about/",
  "/faq/",
  "/projects/",
  "/projects/arrow/",
  "/projects/decentralized-curation/",
  "/projects/public-goods/",
  "/projects/the-truth-post/",
  "/story/",
];
const ERROR_PAGE_ADDRESS = "/404.html";
const PRODUCTION_SITE_URL = "https://proveuswrong.io/";

const EXPECTED_BUILDS = ["production", "preview"];

/**
 * The kind of build the checks are told to expect, from `EXPECTED_BUILD`.
 * The checks never work it out from the output: a production build that
 * wrongly marks itself `noindex` has to fail, not pass as a preview.
 */
const expectedBuild = () => {
  const expected = process.env.EXPECTED_BUILD;

  if (!EXPECTED_BUILDS.includes(expected)) {
    throw new Error(
      `Set EXPECTED_BUILD to one of: ${EXPECTED_BUILDS.join(", ")}`
    );
  }
  return expected;
};

const DIRECTORY_INDEX = "index.html";

const fileOfAddress = (address) =>
  address.endsWith("/") ? `${address}${DIRECTORY_INDEX}` : address;

const builtFile = (address) =>
  path.join(OUTPUT_DIRECTORY, fileOfAddress(address));

const isBuilt = (address) =>
  fs.existsSync(builtFile(address)) && fs.statSync(builtFile(address)).isFile();

const readBuilt = (address) => fs.readFileSync(builtFile(address));

const readBuiltText = (address) => readBuilt(address).toString("utf8");

const linesOfBuilt = (address) =>
  isBuilt(address)
    ? readBuiltText(address)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

const HEADERS_FILE = "/_headers";
const HEADER_LINE = /^\s+([^\s:!][^:]*):\s*(.*)$/;
const INDENTED = /^\s/;
const COMMENT = "#";
const SPLAT = "*";
const PLACEHOLDER = /:[A-Za-z]/;

const escapedForPattern = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const MOST_SPLATS_IN_A_PATTERN = 1;

const matcherOfPattern = (pattern) => {
  const splats = pattern.split(SPLAT).length - 1;
  if (!pattern.startsWith("/") || PLACEHOLDER.test(pattern)) {
    throw new Error(`The checks read only path patterns with splats: ${pattern}`);
  }
  if (splats > MOST_SPLATS_IN_A_PATTERN) {
    throw new Error(`Cloudflare Pages allows one splat in a pattern: ${pattern}`);
  }
  const expression = new RegExp(
    `^${pattern.split(SPLAT).map(escapedForPattern).join(".*")}$`
  );
  return (pathname) => expression.test(pathname);
};

// Cloudflare Pages reads `_headers` as rules: an unindented line is a path
// pattern, in which one splat matches any characters, and the indented
// `Name: value` lines below it are headers for the responses it matches. A
// header that several matching rules set gets their values joined by commas:
// https://developers.cloudflare.com/pages/configuration/headers/
const headerRulesOfBuild = () =>
  readBuiltText(HEADERS_FILE)
    .split("\n")
    .filter((line) => line.trim() && !line.trim().startsWith(COMMENT))
    .reduce((rules, line) => {
      if (!INDENTED.test(line)) {
        return [...rules, { matches: matcherOfPattern(line.trim()), headers: [] }];
      }
      const header = line.match(HEADER_LINE);
      if (!header || rules.length === 0) {
        throw new Error(`The checks cannot read this _headers line: ${line}`);
      }
      const [, name, value] = header;
      rules.at(-1).headers.push([name.trim().toLowerCase(), value.trim()]);
      return rules;
    }, []);

/**
 * The headers that the built `_headers` adds to the response at a path, by
 * lower-case name; none when the build has no `_headers`.
 */
const headersOfResponse = (pathname) =>
  (isBuilt(HEADERS_FILE) ? headerRulesOfBuild() : [])
    .filter(({ matches }) => matches(pathname))
    .flatMap(({ headers }) => headers)
    .reduce(
      (headers, [name, value]) => ({
        ...headers,
        [name]: name in headers ? `${headers[name]}, ${value}` : value,
      }),
      {}
    );

const filesUnder = (directory, prefix = "") =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? filesUnder(
            path.join(directory, entry.name),
            `${prefix}${entry.name}/`
          )
        : [`${prefix}${entry.name}`]
    );

const builtPageAddresses = () =>
  filesUnder(OUTPUT_DIRECTORY)
    .filter((file) => path.basename(file) === DIRECTORY_INDEX)
    .map((file) => `/${file.slice(0, -DIRECTORY_INDEX.length)}`)
    .sort();

const ROBOTS_SITEMAP_FIELD = "Sitemap: ";

/**
 * The address the build was made for, with its trailing slash. It is read
 * from the sitemap that robots.txt names, which sits at the root of the
 * site; the `Host` field of robots.txt drops the scheme of an http site.
 */
const siteUrl = () => {
  const sitemap = linesOfBuilt("/robots.txt").find((line) =>
    line.startsWith(ROBOTS_SITEMAP_FIELD)
  );

  if (!sitemap) throw new Error("robots.txt of the build names no sitemap");
  return new URL("./", sitemap.slice(ROBOTS_SITEMAP_FIELD.length)).href;
};

const describedPages = new Map();

const describeBuiltPage = (address) => {
  if (!describedPages.has(address)) {
    describedPages.set(
      address,
      describePage(readBuiltText(address), siteUrl())
    );
  }
  return describedPages.get(address);
};

const manifestOfBuild = () => {
  const manifest = JSON.parse(readBuiltText("/manifest.webmanifest"));

  return {
    ...manifest,
    icons: manifest.icons.map((icon) => ({
      ...icon,
      src: withoutQuery(icon.src),
    })),
  };
};

const ADDRESS_OF_THE_PAGE_ITSELF = "og:url";

const renderingOfBuiltPage = (address) => {
  const { rendering } = describeBuiltPage(address);
  if (address !== ERROR_PAGE_ADDRESS) return rendering;

  const { [ADDRESS_OF_THE_PAGE_ITSELF]: unusedForAnErrorPage, ...meta } =
    rendering.meta;
  return { ...rendering, meta };
};

/**
 * What the reference keeps of the build: how each page of the contract
 * renders, and the web app manifest. The error page is served for any
 * unknown address, so the address it gives for itself is left out.
 */
const renderingOfBuild = () => ({
  pages: Object.fromEntries(
    [...PAGE_ADDRESSES, ERROR_PAGE_ADDRESS].map((address) => [
      address,
      renderingOfBuiltPage(address),
    ])
  ),
  manifest: manifestOfBuild(),
});

const FRONTMATTER_FENCE = "---";

const frontmatterOf = (markdown) => {
  const lines = markdown.split("\n");
  const end = lines.indexOf(FRONTMATTER_FENCE, 1);

  if (lines[0] !== FRONTMATTER_FENCE || end === -1) return {};
  return Object.fromEntries(
    lines.slice(1, end).map((line) => {
      const separator = line.indexOf(":");
      const value = line.slice(separator + 1).trim();

      return [line.slice(0, separator).trim(), value.replace(/^"|"$/g, "")];
    })
  );
};

const markdownPages = () =>
  filesUnder(SOURCE_DIRECTORY)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { slug, toc, draft } = frontmatterOf(
        fs.readFileSync(path.join(SOURCE_DIRECTORY, file), "utf8")
      );

      return {
        file: `src/${file}`,
        address: `${slug}/`,
        hasContentsList: toc === "true",
        isDraft: draft === "true",
      };
    });

module.exports = {
  ERROR_PAGE_ADDRESS,
  OUTPUT_DIRECTORY,
  PAGE_ADDRESSES,
  PRODUCTION_SITE_URL,
  REFERENCE_FILE,
  STATIC_DIRECTORY,
  builtPageAddresses,
  describeBuiltPage,
  expectedBuild,
  filesUnder,
  headersOfResponse,
  isBuilt,
  linesOfBuilt,
  manifestOfBuild,
  markdownPages,
  readBuilt,
  readBuiltText,
  renderingOfBuild,
  siteUrl,
};
