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
            document.bgColor = "black";
            document.getElementById("brand").style.color = "white";
          }}
          onMouseLeave={(e) => {
            document.bgColor = "white";
            document.getElementById("brand").style.color = "red";
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
            }}
            onMouseLeave={(e) => {
              document.bgColor = "white";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "black";
            }}
          >
            <a href="/">HOME</a>
          </li>
          <li
            onMouseEnter={(e) => {
              document.bgColor = "black";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "white";
            }}
            onMouseLeave={(e) => {
              document.bgColor = "white";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "black";
            }}
          >
            <a href="/projects">PROJECTS</a>
          </li>

          <li
            onMouseEnter={(e) => {
              document.bgColor = "black";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "white";
            }}
            onMouseLeave={(e) => {
              document.bgColor = "white";
              if (document.getElementById("slogan"))
                document.getElementById("slogan").style.color = "black";
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
