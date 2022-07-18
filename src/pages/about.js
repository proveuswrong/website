import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { StaticImage } from "gatsby-plugin-image";
import * as styles from "./about.module.scss";

const About = () => (
  <Layout>
    <Seo title="About" />
    <div className={styles.about}>
      <h1> Who We Are </h1>

      <h2>Goals and Values</h2>
      <p>
        We identify ourselves as cypherpunks and libertarians. We believe that
        this world would be better with more freedom, thus justice, free speech,
        and privacy. We build to create more freedom.
      </p>
      <p>
        We believe that coordinating for the public interest is the biggest
        obstacle to a better world. We invent business models for sustainable
        public good projects to incentivize contributions to the public
        interest.
      </p>
      <p>
        We are an organization that develops public good software. We build the
        next cool thing. Prove us wrong.
      </p>
      <h2> Members </h2>
      <div className={styles.portraits}>
        <div>
          <StaticImage
            src="../images/ferit_bgBlack.png"
            objectFit="contain"
            minwidth={50}
            width={170}
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="A Gatsby astronaut"
            style={{ marginBottom: `0.45rem`, marginTop: `1rem` }}
          />
          <h3 className="m-0">
            <a
              href="https://github.com/0xferit"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ferit
            </a>
          </h3>
          <p className="m-0">Founder - Software Engineer</p>
        </div>
        <div>
          <StaticImage
            src="../images/munevver_bgBlack.png"
            minwidth={50}
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
              Münevver
            </a>
          </h3>
          <p className="m-0">Product Designer</p>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
