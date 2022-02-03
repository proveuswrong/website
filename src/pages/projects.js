import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Brand from "../images/proveuswrong.svg";
import * as styles from "./projects.module.scss";

const Projects = () => (
  <Layout>
    <Seo title="Home" />
    <div className={styles.centeredText}>
      <h1>Under Construction.</h1>
    </div>
  </Layout>
);

export default Projects;
