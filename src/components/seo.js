import * as React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useEffect, useState } from "react";

const constructUrl = (baseUrl, path) =>
  !baseUrl || !path ? null : `${baseUrl}${path}`;

function Seo({ description, lang, meta, title, customImageUrl, imageAlt }) {
  const { ogImageDefault, site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        ogImageDefault: file(relativePath: { eq: "icon.png" }) {
          childImageSharp {
            fixed(height: 260, width: 260) {
              src
            }
          }
        }
      }
    `
  );

  const [actualURL, setActualURL] = useState();

  useEffect(() => {
    setActualURL(window.location.href);
  }, []); // Not working

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: defaultTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: actualURL || site.siteMetadata.siteUrl,
        },
        {
          name: `og:image`,
          content:
            customImageUrl ||
            constructUrl(
              actualURL || site.siteMetadata.siteUrl,
              ogImageDefault?.childImageSharp?.fixed?.src
            ),
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },

        {
          name: `twitter:card`,
          content: customImageUrl ? `summary_large_image` : `summary`,
        },
        {
          name: `twitter:image:alt`,
          content: imageAlt || defaultTitle,
        },
      ].concat(meta)}
    />
  );
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default Seo;
