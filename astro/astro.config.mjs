// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import remarkTocAfterH1 from "./src/lib/remark-toc-after-h1.js";

const isProd =
  process.env.CF_PAGES_ENVIRONMENT === "production" ||
  process.env.NODE_ENV === "production";
const site =
  process.env.SITE_URL ||
  (isProd
    ? "https://proveuswrong.io"
    : process.env.CF_PAGES_URL || "http://localhost:4321");

// https://astro.build/config
export default defineConfig({
  build: {
    format: "directory",
  },
  trailingSlash: "always",
  site,
  integrations: [react(), sitemap()],
  adapter: cloudflare({
    mode: "static",
  }),
  markdown: {
    remarkPlugins: [remarkTocAfterH1],
  },
});
