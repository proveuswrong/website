import * as React from "react";

import * as styles from "./hamburger.module.scss";

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
      onKeyDown={handleHamburgerClick}
      role="button"
    >
      <span className={styles.top}></span>
      <span className={styles.middle}></span>
      <span className={styles.bottom}></span>
    </div>
  );
};

export default Hamburger;
