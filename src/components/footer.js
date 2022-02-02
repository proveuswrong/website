import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import * as styles from "./footer.module.scss";
import Github from "../images/github.svg";

const Footer = () => (
  <footer>
    <div className={styles.container}>
      <small>
        <a
          href="https://github.com/proveuswrong"
          target="_blank"
          rel="noopener no referrer"
        >
          GitHub
        </a>
      </small>
    </div>
  </footer>
);

export default Footer;
