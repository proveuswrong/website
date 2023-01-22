import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "./index.module.scss";

const IndexPage = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          buildTime
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  console.debug(`Build time: ${site.buildTime}`);
  console.debug(`Environment: ${process.env.ENV}`);

  return (
    <Layout>
      <Seo title="Home" />
      <div className={styles.container}>
        <h1 id="slogan" className={`hero ` + styles.h1}>
          In Decentralized Curation, We Trust
        </h1>

        <p>
          Decentralized curation allows for a more open and democratic system of content creation and distribution. It eliminates the need for centralized gatekeepers and allows for a wider range of voices and perspectives to be heard. Additionally, it can also help to mitigate issues such as censorship, bias, and manipulation that can arise in centralized systems. This can ultimately lead to a more diverse, equitable and robust ecosystem for content creation and distribution. That's why at Prove Us Wrong we are working on building solutions to decentrally curate information.
        </p>

        <p>The next cool thing is decentralized curation and we build the next cool thing.</p>

        <Link to="/projects/" className="hero mt-3">
          Show Me
        </Link>
      </div>
    </Layout>
  );
};

export default IndexPage;
