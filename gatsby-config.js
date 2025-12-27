const isProductionEnv = () => {
  if (process.env.CF_PAGES_ENVIRONMENT) {
    return process.env.CF_PAGES_ENVIRONMENT === "production";
  }

  const branchName =
    process.env.CF_PAGES_BRANCH || process.env.BRANCH || process.env.HEAD;
  if (!branchName) {
    return process.env.NODE_ENV === "production";
  }

  return (
    branchName === "main" ||
    branchName.startsWith("hotfix/") ||
    branchName.startsWith("release/") ||
    (branchName === "develop" && process.env.PULL_REQUEST === "true")
  );
};

const isProd = isProductionEnv();

require("dotenv").config({
  path: isProd ? ".env.production" : ".env.development",
});

const withTrailingSlash = (url) => {
  if (!url) return url;
  return url.endsWith("/") ? url : `${url}/`;
};

const PROD_SITE_URL = withTrailingSlash("https://proveuswrong.io");
const PREVIEW_SITE_URL = withTrailingSlash(
  process.env.CF_PAGES_URL || "http://localhost:8000"
);
const SITE_URL = isProd ? PROD_SITE_URL : PREVIEW_SITE_URL;

const branchName =
  process.env.CF_PAGES_BRANCH || process.env.BRANCH || process.env.HEAD;
const commitRef = process.env.CF_PAGES_COMMIT_SHA || process.env.COMMIT_REF;
const pullRequest =
  process.env.PULL_REQUEST ||
  (process.env.CF_PAGES_ENVIRONMENT
    ? process.env.CF_PAGES_ENVIRONMENT === "production"
      ? "false"
      : "true"
    : undefined);
const reviewID = process.env.CF_PAGES_DEPLOYMENT_ID || process.env.REVIEW_ID;
const headRef = process.env.HEAD || branchName;

module.exports = {
  siteMetadata: {
    title: `Prove Us Wrong`,
    description: `We are an organization that develops decentralized curation solutions as public goods. We build the next cool thing. Prove us wrong.`,
    author: `@0xferit`,
    siteUrl: SITE_URL,
    head: headRef,
    pullRequest,
    branch: branchName,
    commitRef,
    reviewID,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: SITE_URL,
        sitemap: SITE_URL + "sitemap.xml",
        policy: [{userAgent: '*', allow: '/'}]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Prove Us Wrong`,
        short_name: `PUW`,
        start_url: `/`,
        background_color: "#171717",
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        theme_color: "#171717",
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer"
            }
          }
        ],
      },
    },
    `gatsby-plugin-catch-links`,
  ],
};
