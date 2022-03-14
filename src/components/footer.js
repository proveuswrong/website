import * as React from "react";
import * as styles from "./footer.module.scss";
import Github from "../images/github.svg";
import Twitter from "../images/twitter.svg";
import LinkedIn from "../images/linkedin.svg";

const ANIMATIONS_ENABLED = false;

const handleGithubMouseEnter = (e) => {
  if (!ANIMATIONS_ENABLED) return;

  if (matchMedia("(pointer:fine)").matches) {
    document.bgColor = "black";
    if (document.getElementById("slogan"))
      document.getElementById("slogan").style.color = "white";
    if (window.location.pathname != "/")
      document.getElementById("main").style.opacity = "0";
    document.getElementById("github").lastChild.style.fill = "white";
    document.getElementById("twitter").style.opacity = "0";
  }
};

const handleGithubMouseLeave = (e) => {
  if (!ANIMATIONS_ENABLED) return;

  if (matchMedia("(pointer:fine)").matches) {
    document.bgColor = "white";
    if (document.getElementById("slogan"))
      document.getElementById("slogan").style.color = "black";
    if (window.location.pathname != "/")
      document.getElementById("main").style.opacity = "100";
    document.getElementById("github").lastChild.style.fill = "black";
    document.getElementById("twitter").style.opacity = "100";
  }
};

const handleTwitterMouseEnter = (e) => {
  if (!ANIMATIONS_ENABLED) return;

  if (matchMedia("(pointer:fine)").matches) {
    document.bgColor = "black";
    if (document.getElementById("slogan"))
      document.getElementById("slogan").style.color = "white";
    if (window.location.pathname != "/")
      document.getElementById("main").style.opacity = "0";
    document.getElementById("twitter").lastChild.style.fill = "white";
    document.getElementById("github").style.opacity = "0";
  }
};

const handleTwitterMouseLeave = (e) => {
  if (!ANIMATIONS_ENABLED) return;

  if (matchMedia("(pointer:fine)").matches) {
    document.bgColor = "white";
    if (document.getElementById("slogan"))
      document.getElementById("slogan").style.color = "black";
    if (window.location.pathname != "/")
      document.getElementById("main").style.opacity = "100";
    document.getElementById("twitter").lastChild.style.fill = "black";
    document.getElementById("github").style.opacity = "100";
  }
};

const handleLinkedInMouseEnter = (e) => {
  if (!ANIMATIONS_ENABLED) return;

  if (matchMedia("(pointer:fine)").matches) {
    document.bgColor = "black";
    if (document.getElementById("slogan"))
      document.getElementById("slogan").style.color = "white";
    if (window.location.pathname != "/")
      document.getElementById("main").style.opacity = "0";
    document.getElementById("linkedin").lastChild.style.fill = "white";
    document.getElementById("github").style.opacity = "0";
  }
};

const handleLinkedInMouseLeave = (e) => {
  if (!ANIMATIONS_ENABLED) return;

  if (matchMedia("(pointer:fine)").matches) {
    document.bgColor = "white";
    if (document.getElementById("slogan"))
      document.getElementById("slogan").style.color = "black";
    if (window.location.pathname != "/")
      document.getElementById("main").style.opacity = "100";
    document.getElementById("linkedin").lastChild.style.fill = "black";
    document.getElementById("github").style.opacity = "100";
  }
};

const Footer = () => (
  <footer>
    <div className={styles.container}>
      <div className={styles.social}>
        <a
          href="https://github.com/proveuswrong"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleGithubMouseEnter}
          onMouseLeave={handleGithubMouseLeave}
        >
          <span style={{ display: "none" }}>Link to GitHub profile</span>
          <Github aria-hidden="true" id="github" />
        </a>
        <a
          href="https://twitter.com/ProveUsWrongIO"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleTwitterMouseEnter}
          onMouseLeave={handleTwitterMouseLeave}
        >
          <span style={{ display: "none" }}>Link to Twitter profile</span>
          <Twitter aria-hidden="true" id="twitter" />
        </a>
        <a
          href="https://www.linkedin.com/company/prove-us-wrong/"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleLinkedInMouseEnter}
          onMouseLeave={handleLinkedInMouseLeave}
        >
          <span style={{ display: "none" }}>Link to LinkedIn profile</span>
          <LinkedIn aria-hidden="true" id="linkedin" />
        </a>
      </div>
      <small>Copyright {new Date().getFullYear()} Prove Us Wrong</small>
    </div>
  </footer>
);

export default Footer;
