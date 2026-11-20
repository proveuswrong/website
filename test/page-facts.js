const { parse } = require("parse5");

const BLOCK_ELEMENTS = new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "br",
  "dd",
  "div",
  "dl",
  "dt",
  "figcaption",
  "figure",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "table",
  "td",
  "th",
  "tr",
  "ul",
]);
const ELEMENTS_WITHOUT_VISIBLE_TEXT = new Set([
  "noscript",
  "script",
  "style",
  "svg",
  "template",
]);
const HEADING_ELEMENTS = ["h1", "h2", "h3", "h4", "h5", "h6"];
const CONTENTS_LIST_LABEL = "On this page";
const DESCRIBING_META = [
  "description",
  "og:title",
  "og:description",
  "og:type",
  "og:url",
  "twitter:creator",
  "twitter:description",
  "twitter:card",
  "twitter:image:alt",
  "theme-color",
];
const ICON_LINK_RELATIONS = ["icon", "manifest", "apple-touch-icon"];
const STRUCTURED_DATA = "application/ld+json";

const attributeOf = (element, name) =>
  element.attrs.find((attribute) => attribute.name === name)?.value;

function* descendantsOf(node) {
  for (const child of node.childNodes || []) {
    yield child;
    yield* descendantsOf(child);
  }
}

const elementsIn = (node, ...tagNames) =>
  [...descendantsOf(node)].filter((descendant) =>
    tagNames.includes(descendant.tagName)
  );

const firstElementIn = (node, tagName) => elementsIn(node, tagName)[0];

const textWithBlockBreaksOf = (node) => {
  if (node.nodeName === "#text") return node.value;
  if (!node.tagName || ELEMENTS_WITHOUT_VISIBLE_TEXT.has(node.tagName)) {
    return "";
  }

  const text = node.childNodes.map(textWithBlockBreaksOf).join("");
  return BLOCK_ELEMENTS.has(node.tagName) ? `\n${text}\n` : text;
};

const linesOfTextIn = (node) =>
  textWithBlockBreaksOf(node)
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);

const textOf = (node) => linesOfTextIn(node).join(" ");

const withoutSite = (address, siteUrl) =>
  address.startsWith(siteUrl) ? `/${address.slice(siteUrl.length)}` : address;

const withoutQuery = (address) => address.split("?")[0];

const withoutSiteThroughout = (value, siteUrl) => {
  if (typeof value === "string") return withoutSite(value, siteUrl);
  if (Array.isArray(value)) {
    return value.map((item) => withoutSiteThroughout(item, siteUrl));
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        withoutSiteThroughout(item, siteUrl),
      ])
    );
  }
  return value;
};

const codeOf = (script) =>
  script.childNodes.map((node) => node.value ?? "").join("");

const structuredDataOf = (document, siteUrl) =>
  elementsIn(document, "script")
    .filter((script) => attributeOf(script, "type") === STRUCTURED_DATA)
    .map((script) => withoutSiteThroughout(JSON.parse(codeOf(script)), siteUrl));

const metaNamed = (head, name) =>
  elementsIn(head, "meta").find((meta) =>
    [attributeOf(meta, "name"), attributeOf(meta, "property")].includes(name)
  );

const contentOfMeta = (head, name) => {
  const meta = metaNamed(head, name);
  return meta && attributeOf(meta, "content");
};

const describingMetaOf = (head, siteUrl) =>
  Object.fromEntries(
    DESCRIBING_META.map((name) => [name, contentOfMeta(head, name)])
      .filter(([, content]) => content !== undefined)
      .map(([name, content]) => [name, withoutSite(content, siteUrl)])
  );

const iconLinksOf = (head) =>
  elementsIn(head, "link")
    .filter((link) => ICON_LINK_RELATIONS.includes(attributeOf(link, "rel")))
    .map((link) => ({
      rel: attributeOf(link, "rel"),
      sizes: attributeOf(link, "sizes"),
      href: withoutQuery(attributeOf(link, "href")),
    }));

const anchorsIn = (node) =>
  elementsIn(node, "a")
    .filter((anchor) => attributeOf(anchor, "href") !== undefined)
    .map((anchor) => ({
      href: attributeOf(anchor, "href"),
      text: textOf(anchor),
      target: attributeOf(anchor, "target"),
      rel: attributeOf(anchor, "rel"),
    }));

const contentsListOf = (main) => {
  const contentsList = elementsIn(main, "nav").find(
    (nav) => attributeOf(nav, "aria-label") === CONTENTS_LIST_LABEL
  );

  return contentsList
    ? anchorsIn(contentsList).map(({ href, text }) => ({ href, text }))
    : null;
};

const linksToItself = (heading) =>
  anchorsIn(heading).some(
    ({ href }) => href === `#${attributeOf(heading, "id")}`
  );

const headingsOf = (main) =>
  elementsIn(main, ...HEADING_ELEMENTS).map((heading) => ({
    level: Number(heading.tagName.slice(1)),
    id: attributeOf(heading, "id"),
    text: textOf(heading),
    linksToItself: linksToItself(heading),
  }));

const marksCurrentSection = (link) =>
  attributeOf(link, "aria-current") !== undefined ||
  (attributeOf(link, "class") || "").includes("active");

const menuOf = (header) => {
  const button = firstElementIn(header, "button");
  const navigation = firstElementIn(header, "nav");

  return {
    button: {
      type: attributeOf(button, "type"),
      label: attributeOf(button, "aria-label"),
      expanded: attributeOf(button, "aria-expanded"),
      controls: attributeOf(button, "aria-controls"),
    },
    navigationId: attributeOf(navigation, "id"),
    sections: elementsIn(navigation, "a").map((link) => ({
      text: textOf(link),
      href: attributeOf(link, "href"),
      current: marksCurrentSection(link),
    })),
  };
};

const canonicalAddressOf = (head) => {
  const link = elementsIn(head, "link").find(
    (element) => attributeOf(element, "rel") === "canonical"
  );
  return link ? attributeOf(link, "href") : null;
};

const openGraphImageOf = (head) => {
  const meta = metaNamed(head, "og:image");

  return (
    meta && {
      address: attributeOf(meta, "content"),
      isProperty: attributeOf(meta, "property") === "og:image",
    }
  );
};

const asPlainData = (value) => JSON.parse(JSON.stringify(value));

/**
 * Describes one built page.
 *
 * `rendering` holds what a reader and a crawler get from the page and is
 * what the reference keeps: it does not depend on the generator or on the
 * host the build is for, since addresses on `siteUrl` are made relative.
 * The other fields serve the checks of the contract.
 */
const describePage = (html, siteUrl) => {
  const document = parse(html);
  const head = firstElementIn(document, "head");
  const main = firstElementIn(document, "main");
  const header = firstElementIn(document, "header");
  const menu = menuOf(header);
  const headings = headingsOf(main);

  return asPlainData({
    rendering: {
      language: attributeOf(firstElementIn(document, "html"), "lang"),
      title: textOf(firstElementIn(head, "title")),
      meta: describingMetaOf(head, siteUrl),
      icons: iconLinksOf(head),
      structuredData: structuredDataOf(document, siteUrl),
      sections: menu.sections,
      headings: headings.map(({ level, id, text }) => ({ level, id, text })),
      contents: contentsListOf(main),
      text: linesOfTextIn(main),
      images: elementsIn(main, "img")
        .map((image) => attributeOf(image, "alt"))
        .filter(Boolean),
      links: anchorsIn(main).filter(({ text }) => text !== ""),
    },
    robots: contentOfMeta(head, "robots") ?? null,
    canonicalAddress: canonicalAddressOf(head),
    openGraphImage: openGraphImageOf(head) ?? null,
    scripts: elementsIn(document, "script").map((script) => ({
      type: attributeOf(script, "type"),
      src: attributeOf(script, "src"),
      code: codeOf(script),
    })),
    menu,
    headings,
    anchors: anchorsIn(document),
    ids: [...descendantsOf(document)]
      .filter((node) => node.tagName && attributeOf(node, "id") !== undefined)
      .map((element) => attributeOf(element, "id")),
  });
};

module.exports = { STRUCTURED_DATA, describePage, withoutQuery };
