import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "./projects.module.scss";

const Projects = () => (
  <Layout>
    <Seo title="Projects" />
    <div className={styles.container}>
      <a
        href="https://provemewrong.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>Prove Me Wrong</h2>
      </a>
      <h3>A Curated List of Truth With Decentralized Fact Checking</h3>

      <p>
        Using probabilistic truthfulness, this application of{" "}
        <a href="https://kleros.io" rel="noopener noreferrer">
          Kleros
        </a>{" "}
        provides an effective way to prove anything to public. Fully
        decentralized: no need to trust anyone. Claim something. Put a bounty.
        Invite others to prove you wrong.
      </p>
    </div>
  </Layout>
);

export default Projects;
