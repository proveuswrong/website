import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "./index.module.scss";

const IndexPage = () => {
  const isNetlify = Boolean(process.env.NETLIFY);
  const { site } = useStaticQuery(
    graphql`
        query   {
            site {
                buildTime
                siteMetadata {
                    title
                    description
                    author
                    siteUrl
                    ...buildMetadata
                }
            }
        }

        fragment buildMetadata on SiteSiteMetadata{
            pullRequest
            head
            branch
            commitRef
            reviewID
        }
    `
  );


  console.debug(`Build time: ${site.buildTime}`);
  console.debug(`Environment: ${process.env.GATSBY_ENV}`);
  console.debug(`Pull Request: ${site.siteMetadata.pullRequest}`);
  console.debug(`Head: ${site.siteMetadata.head}`);
  console.debug(`Branch: ${site.siteMetadata.branch}`);
  console.debug(`Commit Ref: ${site.siteMetadata.commitRef}`);
  console.debug(`Review ID: ${site.siteMetadata.reviewID}`);


  return (
    <Layout>
      <Seo title="Home" />
      <div className={styles.container}>
        <h1 id="slogan" className={`hero ` + styles.h1}>
          In Decentralized Curation We Trust
        </h1>

        <p>
          Information is only valuable when it's carefully curated for qualities like accuracy, relevance, completeness, timeliness, and objectivity. In today’s vast cosmos of information, we rely on effective curation to guide us. Being well-informed is essential for making decisions every day. While we seek to benefit from curated information, we often face the challenge of placing trust in curators. The constant threat of misinformation and disinformation misleads us, wasting our resources and pushing us toward poor decisions. It’s time for smarter, more reliable curation to help us navigate this complex landscape.
        </p>

        <p>
          We are an open-source organization dedicated to developing public good solutions that harness the power of curation while eliminating the need for blind trust. By utilizing Web3, decentralized systems and cutting-edge crypto-economic techniques, we can remove the reliance on traditional curators. The future lies in decentralized curation, and we’re building it. Think it’s impossible? Prove us wrong.</p>

        <Link to="/projects/" className="hero mt-3">
          Show Me
        </Link>
      </div>
    </Layout>
  );
};

export default IndexPage;
