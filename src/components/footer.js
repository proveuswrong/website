import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import * as styles from "./footer.module.scss";
import Github from "../images/github.svg";

const Footer = () => (
  <footer>
    <div>
      <small>
        <a
          href="https://github.com/proveuswrong"
          target="_blank"
          rel="noopener nodereferrer"
          onMouseEnter={(e) => {
            document.bgColor = "black";
            if (document.getElementById("slogan"))
              document.getElementById("slogan").style.color = "white";
            if (window.location.pathname != "/")
              document.getElementById("main").style.opacity = "0";
            document.getElementById("github").lastChild.style.fill = "white";
          }}
          onMouseLeave={(e) => {
            document.bgColor = "white";
            if (document.getElementById("slogan"))
              document.getElementById("slogan").style.color = "black";
            if (window.location.pathname != "/")
              document.getElementById("main").style.opacity = "100";
            document.getElementById("github").lastChild.style.fill = "black";
            console.log(document.getElementById("github").firstChild);
          }}
        >
          <Github id="github" />
        </a>
      </small>
    </div>
  </footer>
);

export default Footer;
