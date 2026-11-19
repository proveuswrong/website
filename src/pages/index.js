import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "./index.module.scss";

const IndexPage = ({ location }) => {
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
      <Seo title="Home" pathname={location?.pathname} />
      <div className={styles.home}>
        <h1 id="slogan" className={styles.slogan}>
          In Decentralized Curation We Trust
        </h1>

        <p className={styles.statement}>
          We are Prove Us Wrong. Since late 2021 we have worked on curating information without a trusted curator: first with Prove Me Wrong, a bounty on falsifiable claims, then with The Truth Post, a news application on Ethereum.
        </p>

        <dl className={styles.levels}>
          <div>
            <dt>The framework</dt>
            <dd>
              <Link to="/projects/decentralized-curation/">Decentralized Curation</Link>, by our founder Ferit Tunçer, is a general framework for curation in any information domain: open rules designed to reward people for producing, assessing and correcting information.
            </dd>
          </div>

          <div>
            <dt>Applications</dt>
            <dd>
              Two are worked out so far: news, with{" "}
              <Link to="/projects/the-truth-post/">The Truth Post</Link>, a partial version of which went live on Ethereum mainnet in June 2023; and{" "}
              <Link to="/projects/public-goods/">public goods funding</Link>, a proposed design. The framework paper also sketches advertising.
            </dd>
          </div>

          <div>
            <dt>Experiment</dt>
            <dd>
              <Link to="/projects/arrow/">Arrow</Link>, a planned curation experiment at Octant, tests one part of the design.
            </dd>
          </div>
        </dl>

        <p className={styles.statement}>
          Cooperative Kleros incubated our first project in 2022. [[CONFIRM: Golem Foundation incubates our work.]] None of this is proven yet; the{" "}
          <a href="https://doi.org/10.5281/zenodo.20543760" target="_blank" rel="noopener noreferrer">framework paper</a> and the{" "}
          <a href="https://doi.org/10.5281/zenodo.23354211" target="_blank" rel="noopener noreferrer">public goods paper</a> say so themselves. Think it can't work? Prove us wrong.
        </p>

        <Link to="/story/" className="hero">Read Our Story</Link>
      </div>
    </Layout>
  );
};

export default IndexPage;
