import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "./markdownPage.module.scss";
import * as cheerio from 'cheerio';

export default function MarkdownPage({ data, location }) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  const $ = cheerio.load(html);
  const h1 = $('h1')

  let manipulatedHTML = html;

  if(frontmatter.toc)
  {
    const contents = cheerio.load('<nav class="toc" aria-label="On this page"><ul></ul></nav>')('nav')

    $('h2').each(function() {
      contents.find('ul').append(`<li><a href="#${this.attribs.id}">${$(this).text()}</a></li>`)
    });

    $('h1').after(contents)
    manipulatedHTML = $('body').html()
  }

  const pageClassName = frontmatter.toc ? `${styles.markdownPage} ${styles.withContents}` : styles.markdownPage;

  return (
    <Layout>
      <Seo title={h1.text()} pathname={location?.pathname} />

        {!frontmatter.draft === true || process.env.ENV === "dev" ? (
          <div className={pageClassName} dangerouslySetInnerHTML={{ __html: manipulatedHTML }} />
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
