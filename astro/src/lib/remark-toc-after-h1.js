import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";

const extractText = (node) => {
  if (!node) return "";
  if (node.type === "text") return node.value;
  if (!node.children) return "";
  return node.children.map(extractText).join("");
};

const setHeadingId = (node, id) => {
  node.data ??= {};
  node.data.id = id;
  node.data.hProperties = {
    ...(node.data.hProperties || {}),
    id,
  };
};

const buildList = (items) => ({
  type: "list",
  ordered: false,
  spread: false,
  children: items.map((item) => ({
    type: "listItem",
    spread: false,
    children: [
      {
        type: "paragraph",
        children: [
          {
            type: "link",
            url: `#${item.slug}`,
            children: [{ type: "text", value: item.text }],
          },
        ],
      },
    ],
  })),
});

export default function remarkTocAfterH1() {
  return (tree, file) => {
    const frontmatter =
      file?.data?.astro?.frontmatter || file?.data?.frontmatter || {};

    const slugger = new GithubSlugger();
    const h2Headings = [];

    visit(tree, "heading", (node) => {
      const text = extractText(node);
      const slug = slugger.slug(text);
      setHeadingId(node, slug);

      if (node.depth === 2) {
        h2Headings.push({ text, slug });
      }
    });

    if (!frontmatter.toc || h2Headings.length === 0) return;

    const children = tree.children || [];
    const h1Index = children.findIndex(
      (node) => node.type === "heading" && node.depth === 1
    );
    const insertIndex = h1Index === -1 ? 0 : h1Index + 1;
    children.splice(insertIndex, 0, buildList(h2Headings));
  };
}
