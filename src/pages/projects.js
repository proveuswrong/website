import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Brand from "../images/proveuswrong.svg";
import * as styles from "./projects.module.scss";

const Projects = () => (
  <Layout>
    <Seo title="Home" />
    <div className={styles.container}>
      <h1>
        <a
          href="https://provemewrong.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prove Me Wrong
        </a>
      </h1>
      <h2>
        {" "}
        A curated list of truth with decentralized fact checking powered by{" "}
        <a href="https://kleros.io" rel="noopener noreferrer">
          Kleros
        </a>
        .
      </h2>
      <p>Claim something. Put a bounty. Invite others to prove you wrong.</p>
    </div>
  </Layout>
);

export default Projects;
