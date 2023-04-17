const isProd = (branchName) =>
  branchName === 'main' || branchName === 'release' || branchName?.startsWith('release/')

require("dotenv").config({
  path: `${isProd(process.env.BRANCH) ? ".env.production" : ".env.development"}`,
});


const SITE_URL = "https://proveuswrong.io/"

module.exports = {
  siteMetadata: {
    title: `Prove Us Wrong`,
    description: `We are an organization that develops decentralized curation solutions as public goods. We build the next cool thing. Prove us wrong.`,
    author: `@0xferit`,
    siteUrl: SITE_URL,
    head: process.env.HEAD,
    pullRequest: process.env.PULL_REQUEST,
    branch: process.env.BRANCH,
    commitRef: process.env.COMMIT_REF,
    reviewID: process.env.REVIEW_ID,
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
    `gatsby-plugin-sass`,
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
          {
            resolve: "gatsby-remark-mermaid",
            options: {
              language: "mermaid",
              theme: "dark",
              viewport: {
                width: 200,
                height: 200,
              },
              mermaidOptions: {
                themeCSS:
                  ".node rect { stroke: none; fill: #ff355e; }; .edgeLabel {background-color: #171717; color: #ececec !important;}",
              },
            },
          },
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
