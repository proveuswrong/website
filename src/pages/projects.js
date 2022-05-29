import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "./projects.module.scss";

// TODO: Don't use h2s as subtitles. https://css-tricks.com/html-for-subheadings-and-headings/

const Projects = () => (
  <Layout>
    <Seo title="Projects" />
    <div className={styles.container}>
      <h1>
        Gazette Protocol <span style={{ visibility: "hidden" }}>: </span>
        <p>Launch Your Own Decentralized Gazette</p>
      </h1>
      <h2>What</h2>
      <p>
        Make the rules, launch your gazette and let the community do the rest.
        The incentive mechanism will incentivize reporters to make news that
        resonates with communities' interests and is fake-free. Enjoy credibly
        neutral fact-checking and curation processes while you watch your
        gazette grow in content organically. Let people speculate on the future
        of your gazette and invest in it.
      </p>
      <h2>Why</h2>
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
      <h2>How</h2>
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
