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
        onMouseEnter={(e) => {
          // console.log(e);
          // document.bgColor = "black";
          // document.getElementById("brand").style.color = "white";
          // Array.from(document.getElementsByTagName("A"))
          //   .filter((el) => el != e.target)
          //   .map((e) => (e.style.display = "none"));
        }}
        onMouseLeave={(e) => {
          // document.bgColor = "white";
          // document.getElementById("brand").style.color = "red";
          // Array.from(document.getElementsByTagName("A")).map(
          //   (e) => (e.style.display = "block")
          // );
        }}
        href="https://provemewrong.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h1>Prove Me Wrong</h1>
      </a>
      <h2>
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
