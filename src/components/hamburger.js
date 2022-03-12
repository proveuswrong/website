import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import * as styles from "./hamburger.module.scss";

const Hamburger = ({ children }) => {
  return <i className={styles.hamburger}></i>;
};

export default Hamburger;
