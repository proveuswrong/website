import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { StaticImage } from "gatsby-plugin-image";
import * as styles from "./about.module.scss";

const About = () => (
  <Layout>
    <Seo title="About" />
    <div className={styles.about}>
      <h1> Meet the Team </h1>
      <h2>
        We are a small, passionate team that develops decentralized
        applications.
      </h2>
      <div className={styles.portraits}>
        <div>
          <StaticImage
            src="../images/ferit.png"
            objectFit="contain"
            minWidth={50}
            width={170}
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="A Gatsby astronaut"
            style={{ marginBottom: `0.45rem`, marginTop: `1rem` }}
          />
          <h3 className="m-0">
            <a
              href="https://ferittuncer.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ferit Tunçer
            </a>
          </h3>
          <p className="m-0">Founder - Software Engineer</p>
        </div>
        <div>
          <StaticImage
            src="../images/munevver.png"
            minWidth={50}
            width={170}
            objectFit="contain"
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="A Gatsby astronaut"
            style={{ marginBottom: `0.45rem`, marginTop: `1rem` }}
          />
          <h3 className="m-0">
            <a
              href="https://dribbble.com/munevver/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Münevver Aslan
            </a>
          </h3>
          <p className="m-0">Product Designer</p>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
