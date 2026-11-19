import * as React from "react";
import { useEffect, useRef } from "react";

import Hamburger from "./Hamburger";
import useMediaQuery from "./hooks/useMediaQuery";

import * as styles from "./header.module.scss";

const breakpointTablet = 768;

const Header = () => {
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
          <a href="/">
            <h1 id="brand" className={styles.h1}>
              Prove <br /> Us <br /> Wrong
            </h1>
          </a>
          {isNarrow && <Hamburger className={styles.hamburger} />}
          <div className={styles.overlay} id="overlay">
            <nav className={`${styles.nav} overlay-menu`}>
              <h1 style={{ display: "none" }}>Navigation</h1>
              <ul>
                <li ref={home}>
                  <a href="/">HOME</a>
                </li>

                <li ref={projects}>
                  <a href="/projects/">PROJECTS</a>
                </li>
                <li ref={faq}>
                  <a href="/faq/">F.A.Q.</a>
                </li>
                <li>
                  <a href="https://blog.proveuswrong.io" target="_blank" rel="noopener noreferrer">BLOG</a>
                </li>
                <li ref={about}>
                  <a href="/about/">ABOUT</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
