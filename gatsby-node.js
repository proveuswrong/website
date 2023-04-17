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