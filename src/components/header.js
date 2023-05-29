import * as React from "react";
import { useRef } from "react";
import { useEffect } from "react";

import PropTypes from "prop-types";

import Hamburger from "./hamburger";
import useMediaQuery from "./hooks/useMediaQuery";

import { Link } from "gatsby";
import * as styles from "./header.module.scss";

const breakpointTablet = 768;

const Header = ({ siteTitle }) => {
  const home = useRef(null);
  const projects = useRef(null);
  const faq = useRef(null);
  const about = useRef(null);



  useEffect(() => {
    window.location.pathname == "/" && home.current.classList.add("navActive");
    window.location.pathname == "/projects/" &&
      projects.current.classList.add("navActive");
    window.location.pathname == "/faq/" &&
    faq.current.classList.add("navActive");
    window.location.pathname == "/about/" &&
      about.current.classList.add("navActive");
  }, []);

  const isNarrow = useMediaQuery(`(max-width: ${breakpointTablet}px)`);

  return (
    <>
      <header>
        <div className={styles.container}>
          <Link to="/">
            <h1 id="brand" className={styles.h1}>
              Prove <br /> Us <br /> Wrong
            </h1>
          </Link>
          {isNarrow && <Hamburger className={styles.hamburger} />}
          <div className={styles.overlay} id="overlay">
            <nav className={`${styles.nav} overlay-menu`}>
              <h1 style={{ display: "none" }}>Navigation</h1>
              <ul>
                <li ref={home}>
                  <Link to="/">HOME</Link>
                </li>

                <li ref={projects}>
                  <Link to="/projects/">PROJECTS</Link>
                </li>
                <li ref={faq}>
                  <Link to="/faq/">F.A.Q.</Link>
                </li>
                <li>
                  <a href="https://blog.proveuswrong.io" target="_blank" rel="noopener noreferrer">BLOG</a>

                </li>
                <li ref={about}>
                  <Link to="/about/">ABOUT</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
