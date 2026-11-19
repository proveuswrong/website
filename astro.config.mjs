import { fileURLToPath } from "node:url";

import { satteri, satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri";
import { defineConfig } from "astro/config";

import { crawlerFiles } from "./src/crawler-files.mjs";
import { externalLinks, headingAnchors } from "./src/markdown-plugins.mjs";
import { siteUrl } from "./src/site.mjs";

const REPOSITORY = fileURLToPath(new URL("./", import.meta.url));
const OLDEST_BROWSERS_STYLED = [
  "chrome107",
  "edge107",
  "firefox104",
  "safari15",
];

export default defineConfig({
  site: siteUrl,
  outDir: "./public",
  publicDir: "./static",
  trailingSlash: "always",
  build: { format: "directory" },
  markdown: {
    processor: satteri({
      features: { smartPunctuation: false },
      hastPlugins: [satteriHeadingIdsPlugin(), headingAnchors, externalLinks],
    }),
  },
  integrations: [crawlerFiles()],
  vite: {
    build: { cssTarget: OLDEST_BROWSERS_STYLED },
    css: {
      preprocessorOptions: { scss: { loadPaths: [REPOSITORY] } },
    },
  },
});
