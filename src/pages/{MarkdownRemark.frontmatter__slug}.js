import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "./markdownPage.module.scss";

export default function MarkdownPage({ data }) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <Seo title="Readme" />

      <div className={styles.markdownPage}>
        {!frontmatter.draft === true ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <p>This document is not ready yet. Come back later.</p>
        )}
      </div>
    </Layout>
  );
}
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        draft
      }
    }
  }
`;
