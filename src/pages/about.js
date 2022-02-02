import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Brand from "../images/proveuswrong.svg";
import { StaticImage } from "gatsby-plugin-image";
import * as styles from "./about.module.scss";

const About = () => (
  <Layout>
    <Seo title="Home" />
    <div className={styles.centeredText}>
      <p>
        We are a small passionate team working on cryptography applications just
        for fun.
      </p>
      <div className={styles.portraits}>
        <div>
          <StaticImage
            src="../images/ferit.jpg"
            objectFit="contain"
            width={300}
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="A Gatsby astronaut"
            style={{ marginBottom: `0.45rem` }}
          />
          <p className="m-0">Ferit Tunçer</p>
          <p className="m-0">Software Engineer</p>
        </div>
        <div style={{ display: "none" }}>
          <StaticImage
            src="../images/ferit.jpg"
            width={300}
            objectFit="contain"
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="A Gatsby astronaut"
            style={{ marginBottom: `0.45rem` }}
          />
          <p className="m-0">Ferit Tunçer</p>
          <p className="m-0">Software Engineer</p>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
