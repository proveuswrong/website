import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { StaticImage } from "gatsby-plugin-image";
import * as styles from "./about.module.scss";

const About = ({ location }) => (
  <Layout>
    <Seo title="About" pathname={location?.pathname} />
    <div>
      <h1> Who We Are </h1>
      <p>
        Prove Us Wrong has worked on decentralized curation since late 2021. We
        built The Truth Post, a news application on Ethereum, and our founder,
        Ferit, wrote the two Decentralized Curation papers. Our story, year by
        year, is <Link to="/story/">here</Link>.
      </p>

      <h2>What We Believe</h2>
      <p>
        We identify ourselves as cypherpunks and libertarians. We believe that
        this world would be better with more freedom, thus justice, free speech,
        and privacy. We build to create more freedom.
      </p>
      <p>
        We believe that coordinating for the public interest is the biggest
        obstacle to a better world, and that curation is a major source of that
        difficulty. The second part is a hypothesis, and Ferit's framework paper
        states it as one. That is why we work on decentralized curation, and why
        we publish what we build as public goods.
      </p>

      <h2>Support</h2>
      <p>
        <strong>Cooperative Kleros.</strong> Our first project, Prove Me Wrong,
        was in the second cohort of the{" "}
        <a
          href="https://blog.kleros.io/kleros-community-update-june-2022/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kleros incubator
        </a>{" "}
        in 2022. The incubator funded our early work.
      </p>
      <p>
        [[CONFIRM: <strong>Golem Foundation</strong> incubates our work.]]
      </p>
      <p>
        <strong>Octant</strong> sponsored Ferit's{" "}
        <a
          href="https://decentralized-curation.0xferit.workers.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          workshop materials
        </a>{" "}
        on the public goods application.
      </p>

      <h2>Disclosure</h2>
      <p>
        Ferit has multi-year engineering experience with Kleros, which The Truth
        Post uses to settle disputes. He holds no Pinakion tokens and has no
        ongoing financial relationship with Kleros.
      </p>

      <h2>People</h2>
      <p>
        [[CONFIRM: Today Prove Us Wrong is Ferit; the people below built it with
        him.]]
      </p>
      <p>These people have built Prove Us Wrong.</p>
      <ul className={styles.people}>
        <li>
          <StaticImage
            src="../images/ferit_bgBlack.png"
            objectFit="contain"
            minwidth={50}
            width={170}
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="Ferit's photo"
          />
          <h3>
            <a
              href="https://github.com/0xferit"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ferit
            </a>
          </h3>
          <p>Founder, engineering</p>
        </li>
        <li>
          <StaticImage
            src="../images/munevver_bgBlack.png"
            minwidth={50}
            width={170}
            objectFit="contain"
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="Münevver's photo"
          />
          <h3>
            <a
              href="https://dribbble.com/munevver/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Münevver
            </a>
          </h3>
          <p>Product design</p>
        </li>
        <li>
          <StaticImage
            src="../images/ifeoluwa_bgBlack.png"
            minwidth={50}
            width={170}
            objectFit="contain"
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="Ifeoluwa's photo"
          />
          <h3>
            <a
              href="https://www.linkedin.com/in/iamifeolushola/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ifeoluwa
            </a>
          </h3>
          <p>Community and writing, 2023</p>
        </li>
        <li>
          <StaticImage
            src="../images/stanislav_bgBlack.jpg"
            objectFit="contain"
            minwidth={50}
            width={170}
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="Stanislav's photo"

          />
          <h3>
            <a
              href="https://github.com/gratestas"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stanislav
            </a>
          </h3>
          <p>Engineering on The Truth Post</p>
        </li>
      </ul>

    </div>
  </Layout>
);

export default About;
