import * as React from "react";
import { useRef } from "react";
import { useEffect } from "react";

import PropTypes from "prop-types";
import { Link } from "gatsby";
import * as styles from "./header.module.scss";

const sleep = (ms, r) => new Promise((r) => setTimeout(r, ms));

const handleMouseEnter = (e) => {
  // setTimeout(() => {
  //   e.target.click();
  // }, 3000);
  if (matchMedia("(pointer:fine)").matches) {
    document.bgColor = "black";
    if (document.getElementById("slogan"))
      document.getElementById("slogan").style.color = "white";
    if (window.location.pathname != "/")
      document.getElementById("main").style.opacity = "0";
  }
};

const handleMouseLeave = (e) => {
  document.bgColor = "white";
  if (document.getElementById("slogan"))
    document.getElementById("slogan").style.color = "black";
  if (window.location.pathname != "/")
    document.getElementById("main").style.opacity = "100";
};

const Header = ({ siteTitle }) => {
  const home = useRef(null);
  const projects = useRef(null);
  const about = useRef(null);

  useEffect(() => {
    window.location.pathname == "/" && home.current.classList.add("grayed-out");
    window.location.pathname == "/projects/" &&
      projects.current.classList.add("grayed-out");
    window.location.pathname == "/about/" &&
      about.current.classList.add("grayed-out");
  }, []);

  return (
    <header>
      <div className={styles.container}>
        <Link to="/">
          <h1
            id="brand"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.h1}
          >
            Prove <br /> Us <br /> Wrong
          </h1>
        </Link>

        <nav className={styles.nav}>
          <h1 style={{ display: "none" }}>Navigation</h1>
          <ul>
            <li
              ref={home}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a href="/">HOME</a>
            </li>

            <li
              ref={projects}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a href="/projects">PROJECTS</a>
            </li>

            <li
              ref={about}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a href="/about">ABOUT</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
