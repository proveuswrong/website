import { writeFileSync } from "node:fs";

import { siteUrl } from "./site.mjs";

const ERROR_PAGE = "404";

const XML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

const escapeXml = (text) =>
  text.replace(/[&<>"']/g, (character) => XML_ENTITIES[character]);

const addressOf = (pathname) => new URL(pathname, siteUrl).href;

const sitemapUrl = addressOf("sitemap.xml");

const robots = () =>
  [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${sitemapUrl}`,
    `Host: ${new URL(siteUrl).origin}`,
    "",
  ].join("\n");

const sitemapOf = (pathnames) =>
  [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...pathnames
      .filter((pathname) => !pathname.startsWith(ERROR_PAGE))
      .map(addressOf)
      .sort()
      .map((address) => `  <url><loc>${escapeXml(address)}</loc></url>`),
    `</urlset>`,
    "",
  ].join("\n");

/**
 * Writes the files that speak to crawlers once the pages are built:
 * `robots.txt` and the sitemap it points at, which lists every page except
 * the error page.
 */
export const crawlerFiles = () => ({
  name: "crawler-files",
  hooks: {
    "astro:build:done": ({ dir, pages }) => {
      const write = (file, content) =>
        writeFileSync(new URL(file, dir), content);

      write("robots.txt", robots());
      write(
        new URL(sitemapUrl).pathname.slice(1),
        sitemapOf(pages.map(({ pathname }) => pathname))
      );
    },
  },
});
