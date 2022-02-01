import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <div>
      <h1>We build the next cool thing.</h1>
      <h2>Prove us wrong.</h2>
    </div>
  </Layout>
);

export default IndexPage;
