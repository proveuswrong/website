const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];
const ADDRESS_WITH_A_SCHEME = /^[a-z][a-z\d+.-]*:/i;
const LINK_ICON_SIZE = 16;
const LINK_ICON =
  "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z";

const linkIcon = () => ({
  type: "element",
  tagName: "svg",
  properties: {
    ariaHidden: "true",
    focusable: "false",
    height: LINK_ICON_SIZE,
    width: LINK_ICON_SIZE,
    viewBox: `0 0 ${LINK_ICON_SIZE} ${LINK_ICON_SIZE}`,
  },
  children: [
    {
      type: "element",
      tagName: "path",
      properties: { fillRule: "evenodd", d: LINK_ICON },
      children: [],
    },
  ],
});

/**
 * Puts a link to the heading itself in front of every heading that has an
 * id, so that a reader can copy the address of a section. It has to run
 * after the plugin that gives headings their ids.
 */
export const headingAnchors = {
  name: "heading-anchors",
  element: {
    filter: HEADINGS,
    visit(heading, context) {
      const { id } = heading.properties;
      if (typeof id !== "string") return;

      context.prependChild(heading, {
        type: "element",
        tagName: "a",
        properties: {
          href: `#${id}`,
          ariaLabel: `${id.split("-").join(" ")} permalink`,
          className: ["anchor"],
        },
        children: [linkIcon()],
      });
    },
  },
};

/**
 * Makes every link that leaves the site open in a new tab without giving
 * the opened page a handle on this one. A link leaves the site when its
 * address names a scheme, which includes `mailto:`.
 */
export const externalLinks = {
  name: "external-links",
  element: {
    filter: ["a"],
    visit(link, context) {
      const { href } = link.properties;
      if (typeof href !== "string" || !ADDRESS_WITH_A_SCHEME.test(href)) return;

      context.setProperty(link, "target", "_blank");
      context.setProperty(link, "rel", "noopener noreferrer");
    },
  },
};
