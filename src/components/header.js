import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import * as styles from "./header.module.scss";

const Header = ({ siteTitle }) => (
  <header>
    <div className={styles.container}>
      <h1 className={styles.h1}>
        <Link to="/">{siteTitle}</Link>
      </h1>

      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>

          <li>
            <a href="#">About</a>
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
