import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "./markdownPage.module.scss";
import * as cheerio from 'cheerio';

export default function MarkdownPage({ data }) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  const $ = cheerio.load(html);
  const h1 = $('h1')

  let manipulatedHTML = html;

  if(frontmatter.toc)
  {
    const h2Elements = $('h2');
    const ulElements = cheerio.load('<ul></ul>')('ul')

    h2Elements.each(function(index) {
      ulElements.append(`<li key=${index}><a href=#${this.attribs.id}>${$(this).text()}</a></li>`)
    });

    $('h1').after(ulElements)
    manipulatedHTML = $.html()
  }


  return (
    <Layout>
      <Seo title={h1.text()} />

        {!frontmatter.draft === true || process.env.ENV === "DEV" ? (
          <div className={styles.markdownPage} dangerouslySetInnerHTML={{ __html: manipulatedHTML }} />
        ) : (
          <p>This document is not ready yet. Come back later.</p>
        )}

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
        toc
      }
    }
  }
`;
