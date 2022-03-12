import * as React from "react";
import { useRef } from "react";
import { useEffect } from "react";

import PropTypes from "prop-types";

import Hamburger from "./hamburger";

import { Link } from "gatsby";
import * as styles from "./header.module.scss";

const sleep = (ms, r) => new Promise((r) => setTimeout(r, ms));

const ANIMATIONS_ENABLED = false;
const handleMouseEnter = (e) => {
  // setTimeout(() => {
  //   e.target.click();
  // }, 3000);

  if (!ANIMATIONS_ENABLED) return;
  if (matchMedia("(pointer:fine)").matches) {
    document.bgColor = "black";
    if (document.getElementById("slogan"))
      document.getElementById("slogan").style.color = "white";
    if (window.location.pathname != "/")
      document.getElementById("main").style.opacity = "0";
  }
};

const handleMouseLeave = (e) => {
  if (!ANIMATIONS_ENABLED) return;

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
    <>
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
            <ul style={{ display: "none" }}>
              <li
                ref={home}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/">HOME</Link>
              </li>

              <li
                ref={projects}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/projects/">PROJECTS</Link>
              </li>

              <li
                ref={about}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/about/">ABOUT</Link>
              </li>
            </ul>
            <Hamburger />
          </nav>
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
