import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import Helmet from "react-helmet";

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/teaching-page.scss";

export const TeachingPageTemplate = props => {
  const { page } = props;

  return (
    <article className="teachings">
        <header className="banner">
          <img src={page.frontmatter.mainImage.image} alt={page.frontmatter.mainImage.imageAlt} />
        </header>
        <section className="content-block">
          <div className="container">
          <h1>{page.frontmatter.title}</h1>
          {/* The page.html is actually markdown when viewing the page from the netlify CMS,
              so we must use the ReactMarkdown component to parse the mardown in that case  */}
          {page.bodyIsMarkdown ? (
            <ReactMarkdown source={page.html} />
          ) : (
            <HTMLContent content={page.html} />
          )}
          </div>
        </section>
    </article>
  );
};

const TeachingPage = ({ data }) => {
  const { markdownRemark: page, footerData, navbarData } = data;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
  } = page;

  return (
    <Layout footerData={footerData} navbarData={navbarData}>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet>
      <TeachingPageTemplate page={{ ...page, bodyIsMarkdown: false }} />
    </Layout>
  );
};

TeachingPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TeachingPage;

export const teachingPageQuery = graphql`
  query TeachingPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        mainImage {
          image
          imageAlt
        }
        seo {
          browserTitle
          title
          description
        }
      }
    }
    ...LayoutFragment
  }
`;
