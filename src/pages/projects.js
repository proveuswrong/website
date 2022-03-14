import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "./projects.module.scss";

const Projects = () => (
  <Layout>
    <Seo title="Projects" />
    <div className={styles.container}>
      <h1>Prove Me Wrong</h1>
      <h2>
        Better Advertising with Curated Lists of Facts with Decentralized
        Fact-Checking
      </h2>
      <p>
        Since, most of the time, there is no trustworthy way to prove claims to
        the public, advertisers follow the "louder is righter" approach. This is
        wasteful because it drives advertisers to compete and use more and more
        resources. Actually, advertising is the most wasteful industry: it
        produces no goods yet consumes an enormous amount of resources.
        Convincing people to facts should not be that expensive. And with
        <a
          href="https://provemewrong.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Prove Me Wrong
        </a>
        , it does not have to be that expensive anymore.
      </p>
      <p>
        Using probabilistic truthfulness to gain consumers' trust, this
        application of{" "}
        <a href="https://kleros.io" target="_blank" rel="noopener noreferrer">
          Kleros
        </a>{" "}
        provides an effective way to prove (advertise) anything to the public.
        Advertisers pay only if they are proven wrong. And thanks to
        decentralized fact-checking, neither consumers nor advertisers need to
        trust anyone.
      </p>
      <p>
        <strong>Claim anything.</strong>
        <br />
        <strong>Put a bounty.</strong> <br />
        <strong>Invite others to prove you wrong.</strong>
      </p>
    </div>
  </Layout>
);

export default Projects;
