module.exports = {
  siteMetadata: {
    title: `Prove Us Wrong`,
    description: `We are an organization that is building decentralized public goods. We build the next cool thing. Prove us wrong.`,
    author: `@0xferit`,
    siteUrl: `https://proveuswrong.io/`,
  },
  plugins: [
    "gatsby-plugin-robots-txt",
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
  ],
};
