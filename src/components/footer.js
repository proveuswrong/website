import * as React from "react";
import * as styles from "./footer.module.scss";
import Github from "../images/github.svg";
import Twitter from "../images/twitter.svg";
import Email from "../images/email.svg";
import Angel from "../images/angel.svg";
import Discord from "../images/discord.svg";
import LinkedIn from "../images/linkedin.svg";
import PressKit from "../images/pressKit.svg";

const Footer = () => (
  <footer>
    <div className={styles.container}>
      <div className={styles.social}>
        <a
          href="https://www.linkedin.com/company/prove-us-wrong/"
          target="_blank"
          rel="noopener noreferrer"
          title='LinkedIn Company Page'
        >
          <span style={{ display: "none" }}>Link to LinkedIn profile</span>
          <LinkedIn aria-hidden="true" id="linkedin" />
        </a>
        <a
          href="https://angel.co/company/prove-us-wrong"
          target="_blank"
          rel="noopener noreferrer"
          title='AngelList Page'
        >
          <span style={{ display: "none" }}>Link to AngelList profile</span>
          <Angel aria-hidden="true" id="angel" />
        </a>

        <a
          href="https://twitter.com/ProveUsWrongIO"
          target="_blank"
          rel="noopener noreferrer"
          title='Twitter Page'
        >
          <span style={{ display: "none" }}>Link to Twitter profile</span>
          <Twitter aria-hidden="true" id="twitter" />
        </a>


        <a
          href="https://discord.gg/FvDrdDtYAV"
          target="_blank"
          rel="noopener noreferrer"
          title='Discord Community'
        >
          <span style={{ display: "none" }}>Link to Discord community</span>
          <Discord aria-hidden="true" id="discord" />
        </a>
        <a
          href="https://github.com/proveuswrong"
          target="_blank"
          rel="noopener noreferrer"
          title='GitHub Organization'
        >
          <span style={{ display: "none" }}>Link to GitHub profile</span>
          <Github aria-hidden="true" id="github" />
        </a>

        <a
          href="mailto:inbox@proveuswrong.io"
          target="_blank"
          rel="noopener noreferrer"
          title='E-mail Address'
        >
          <span style={{ display: "none" }}>Link to e-mail address</span>
          <Email aria-hidden="true" id="email" />
        </a>
        <a
          href="/pressKit.zip"
          target="_blank"
          rel="noopener noreferrer"
          title='Press Kit'
        >
          <span style={{ display: "none" }}>Press Kit</span>
          <PressKit aria-hidden="true" id="pressKit" />
        </a>
      </div>

      <small>Copyright {new Date().getFullYear()} Prove Us Wrong</small>
      <small>This site is powered by <a href="https://netlify.com">Netlify</a></small>

    </div>
  </footer>
);

export default Footer;
