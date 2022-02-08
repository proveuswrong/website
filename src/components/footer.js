import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import * as styles from "./footer.module.scss";
import Github from "../images/github.svg";
import Twitter from "../images/twitter.svg";

const handleGithubMouseEnter = (e) => {
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

const Footer = () => (
  <footer>
    <div>
      <small>
        <a
          href="https://github.com/proveuswrong"
          target="_blank"
          rel="noopener nodereferrer"
          onMouseEnter={handleGithubMouseEnter}
          onMouseLeave={handleGithubMouseLeave}
        >
          <Github id="github" />
        </a>
        <a
          href="https://twitter.com/ProveUsWrongIO"
          target="_blank"
          rel="noopener nodereferrer"
          onMouseEnter={handleTwitterMouseEnter}
          onMouseLeave={handleTwitterMouseLeave}
        >
          <Twitter id="twitter" />
        </a>
      </small>
    </div>
  </footer>
);

export default Footer;
