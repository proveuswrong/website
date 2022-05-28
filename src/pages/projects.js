import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "./projects.module.scss";

const Projects = () => (
  <Layout>
    <Seo title="Projects" />
    <div className={styles.container}>
      <h1>Gazette Protocol</h1>
      <h2>Launch your own decentralized gazette</h2>
      <h3>What</h3>
      <p>
        Make the rules, launch your gazette and let the community do the rest.
        The incentive mechanism will incentivize reporters to make news that
        resonates with communities' interests and is fake-free. Enjoy credibly
        neutral fact-checking and curation processes while you watch your
        gazette grow in content organically. Let people speculate on the future
        of your gazette and invest in it.
      </p>
      <h3>Why</h3>
      <p>
        <ol>
          <li>
            The right to access information and freedom of speech is not honored
            enough by the news we have now.
          </li>
          <li>
            There is not enough incentive to make news in the public interest.
          </li>
          <li>
            Fake news is a problem and centralized fact-checking is another
            problem.
          </li>
          <li>
            Intermediaries are taking lion's share of news reporting revenues.
          </li>
        </ol>
      </p>
      <h3>How</h3>
      <p>
        A just-right mix of decentralized dispute resolution via{" "}
        <a href="https://kleros.io" target="_blank" rel="noopener noreferrer">
          Kleros
        </a>{" "}
        and clever crypto-economic incentives. Details later.
      </p>
    </div>
  </Layout>
);

export default Projects;
