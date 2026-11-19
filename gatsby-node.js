const fs = require("fs");
const path = require("path");

const HEADER_RULES_FILE = path.join(__dirname, "public", "_headers");
const NO_HEADER_RULES = "";
const NOINDEX_ON_EVERY_RESPONSE = "/*\n  X-Robots-Tag: noindex\n";

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
 * Writes the Cloudflare Pages `_headers` file of every build. A production
 * build writes it too, so that it never serves a rule left in `public/` by an
 * earlier non-production build.
 */
exports.onPostBuild = async ({ graphql }) => {
  const { data } = await graphql(`
    {
      site {
        siteMetadata {
          isProduction
        }
      }
    }
  `);
  const headerRules = data.site.siteMetadata.isProduction
    ? NO_HEADER_RULES
    : NOINDEX_ON_EVERY_RESPONSE;

  fs.writeFileSync(HEADER_RULES_FILE, headerRules);
};
