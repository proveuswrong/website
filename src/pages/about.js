import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { StaticImage } from "gatsby-plugin-image";
import * as styles from "./about.module.scss";

const About = () => (
  <Layout>
    <Seo title="About" />
    <div className={styles.about}>
      <h1> About Us </h1>
      <p>
        We believe that this world would be better with more freedom, thus
        justice, free speech, and privacy. We build to create more freedom.
      </p>
      <p>
        We believe that coordinating for the public interest is the biggest
        obstacle to a better world. Governing people to coordinate is hard and
        historically inefficient to solve this problem, but creating clever
        incentivization mechanisms for public interest can overcome this
        obstacle with ease. We build software to incentivize public interest to
        fight against "the tragedy of commons".
      </p>
      <p>
        We identify ourselves as cypherpunks and libertarians. We
        are activists, but we don't segregate ourselves from the realities of
        everyday life. We welcome donations, but we don't resort to them.
        Instead, we turn public good projects into business ideas to build
        self-sustaining products.
      </p>
      <p>
        We contribute to the public interest with what we do best: building
        software. Contributing to the public interest is cool, and we build the
        next cool thing. Prove us wrong.
      </p>
      <h2> Members </h2>
      <div className={styles.portraits}>
        <div>
          <StaticImage
            src="../images/ferit.png"
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
            src="../images/munevver.png"
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
