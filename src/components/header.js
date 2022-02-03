import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import * as styles from "./header.module.scss";

const Header = ({ siteTitle }) => (
  <header>
    <div className={styles.container}>
      <Link to="/">
        <h1
          id="brand"
          onMouseEnter={(e) => {
            if (matchMedia("(pointer:fine)").matches) {
              document.bgColor = "black";
              document.getElementById("brand").style.color = "white";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "white";
              if (window.location.pathname != "/")
                document.getElementById("main").style.opacity = "0";
            }
          }}
          onMouseLeave={(e) => {
            document.bgColor = "white";
            document.bgColor = "white";
            if (document.getElementById("slogan"))
              document.getElementById("slogan").style.color = "black";
            document.getElementById("brand").style.color = "red";
            if (window.location.pathname != "/")
              document.getElementById("main").style.opacity = "100";
          }}
          className={styles.h1}
        >
          PROVE <br /> US <br /> WRONG
        </h1>
      </Link>

      <nav className={styles.nav}>
        <ul>
          <li
            onMouseEnter={(e) => {
              document.bgColor = "black";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "white";
              if (window.location.pathname != "/")
                document.getElementById("main").style.opacity = "0";
            }}
            onMouseLeave={(e) => {
              document.bgColor = "white";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "black";
              if (window.location.pathname != "/")
                document.getElementById("main").style.opacity = "100";
            }}
          >
            <a href="/">HOME</a>
          </li>
          <li
            onMouseEnter={(e) => {
              document.bgColor = "black";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "white";
              if (window.location.pathname != "/")
                document.getElementById("main").style.opacity = "0";
            }}
            onMouseLeave={(e) => {
              document.bgColor = "white";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "black";
              if (window.location.pathname != "/")
                document.getElementById("main").style.opacity = "100";
            }}
          >
            <a href="/projects">PROJECTS</a>
          </li>

          <li
            onMouseEnter={(e) => {
              document.bgColor = "black";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "white";
              if (window.location.pathname != "/")
                document.getElementById("main").style.opacity = "0";
            }}
            onMouseLeave={(e) => {
              document.bgColor = "white";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "black";
              if (window.location.pathname != "/")
                document.getElementById("main").style.opacity = "100";
            }}
          >
            <a href="/about">ABOUT</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
