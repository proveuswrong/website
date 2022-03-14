import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import * as styles from "./hamburger2.module.scss";

const handleHamburgerClick = (e) => {
  document.getElementById("toggle").classList.toggle(styles.active);

  document.getElementById("overlay").classList.toggle("open");
};

const Hamburger = ({ children }) => {
  return (
    <div
      className={styles.button_container}
      id="toggle"
      onClick={handleHamburgerClick}
    >
      <span className={styles.top}></span>
      <span className={styles.middle}></span>
      <span className={styles.bottom}></span>
    </div>
  );
};

export default Hamburger;
