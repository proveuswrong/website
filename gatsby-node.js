const fs = require("fs");
const path = require("path");

const OUTPUT_DIRECTORY = path.join(__dirname, "public");

const HEADER_RULES_FILE = path.join(OUTPUT_DIRECTORY, "_headers");
const NO_HEADER_RULES = "";
const NOINDEX_ON_EVERY_RESPONSE = "/*\n  X-Robots-Tag: noindex\n";

const XML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

const escapeXml = (text) =>
  text.replace(/[&<>"']/g, (character) => XML_ENTITIES[character]);

const isErrorPage = (pagePath) => pagePath.startsWith("/404");

const writeHeaderRules = (isProduction) => {
  const headerRules = isProduction
    ? NO_HEADER_RULES
    : NOINDEX_ON_EVERY_RESPONSE;

  fs.writeFileSync(HEADER_RULES_FILE, headerRules);
};

const writeSitemap = ({ pagePaths, siteUrl, sitemapUrl }) => {
  const listedPages = pagePaths
    .filter((pagePath) => !isErrorPage(pagePath))
    .sort()
    .map((pagePath) => new URL(pagePath, siteUrl).href)
    .map((address) => `  <url><loc>${escapeXml(address)}</loc></url>`);
  const sitemap = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...listedPages,
    `</urlset>`,
    ``,
  ].join("\n");
  const sitemapFile = path.join(OUTPUT_DIRECTORY, new URL(sitemapUrl).pathname);

  fs.writeFileSync(sitemapFile, sitemap);
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /jsdom/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type SiteSiteMetadata {
      pullRequest: String
      head: String
      branch: String
      commitRef: String
      reviewID: String
    }
  `;

  createTypes(typeDefs);
};

/**
 * Writes two files of every build: the Cloudflare Pages `_headers` file and
 * the sitemap that `robots.txt` points at, which lists every page except the
 * error page. A production build writes `_headers` too, so that it never
 * serves a rule left in `public/` by an earlier non-production build.
 */
exports.onPostBuild = async ({ graphql }) => {
  const { data } = await graphql(`
    {
      site {
        siteMetadata {
          isProduction
          siteUrl
          sitemapUrl
        }
      }
      allSitePage {
        nodes {
          path
        }
      }
    }
  `);
  const { isProduction, siteUrl, sitemapUrl } = data.site.siteMetadata;
  const pagePaths = data.allSitePage.nodes.map(
    ({ path: pagePath }) => pagePath
  );

  writeHeaderRules(isProduction);
  writeSitemap({ pagePaths, siteUrl, sitemapUrl });
};
