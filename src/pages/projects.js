import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Brand from "../images/proveuswrong.svg";
import * as styles from "./projects.module.scss";

const Projects = () => (
  <Layout>
    <Seo title="Home" />
    <div>
      <h1>
        <a
          href="https://provemewrong.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prove Me Wrong
        </a>
      </h1>
      <p>
        Claim something. <br />
        Put a bounty. <br /> Invite others to prove you wrong.
      </p>
    </div>
  </Layout>
);

export default Projects;
