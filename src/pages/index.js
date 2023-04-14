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
  console.debug(`Deploy Preview: ${process.env.PULL_REQUEST}`)
  console.debug(process.env)

  return (
    <Layout>
      <Seo title="Home" />
      <div className={styles.container}>
        <h1 id="slogan" className={`hero ` + styles.h1}>
          In Decentralized Curation We Trust
        </h1>

        <p>
          Curation is a productivity multiplier which enables us to make informed choices without classifying and verifying every bit information by ourselves.
          The big problem with it is that we need to assume curator is honest and competent.
        </p>

        <p>We are an open-source organization working on curation solutions in which there is no honesty or competency assumption, utilizing state-of-the-art crypto-economic techniques. The next cool thing is decentralized curation, and we are building the next cool thing; prove us wrong.</p>

        <Link to="/projects/" className="hero mt-3">
          Show Me
        </Link>
      </div>
    </Layout>
  );
};

export default IndexPage;
