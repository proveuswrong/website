import * as React from "react";
import * as styles from "./footer.module.scss";
import githubIcon from "../icons/github.svg?raw";
import twitterIcon from "../icons/twitter.svg?raw";
import emailIcon from "../icons/email.svg?raw";
import angelIcon from "../icons/angel.svg?raw";
import discordIcon from "../icons/discord.svg?raw";
import linkedInIcon from "../icons/linkedin.svg?raw";
import pressKitIcon from "../icons/pressKit.svg?raw";

const InlineSvg = ({ svg, id }) => (
  <span
    aria-hidden="true"
    id={id}
    dangerouslySetInnerHTML={{ __html: svg }}
  />
);

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
          <InlineSvg svg={linkedInIcon} id="linkedin" />
        </a>
        <a
          href="https://angel.co/company/prove-us-wrong"
          target="_blank"
          rel="noopener noreferrer"
          title='AngelList Page'
        >
          <span style={{ display: "none" }}>Link to AngelList profile</span>
          <InlineSvg svg={angelIcon} id="angel" />
        </a>

        <a
          href="https://twitter.com/ProveUsWrongIO"
          target="_blank"
          rel="noopener noreferrer"
          title='Twitter Page'
        >
          <span style={{ display: "none" }}>Link to Twitter profile</span>
          <InlineSvg svg={twitterIcon} id="twitter" />
        </a>


        <a
          href="https://discord.gg/FvDrdDtYAV"
          target="_blank"
          rel="noopener noreferrer"
          title='Discord Community'
        >
          <span style={{ display: "none" }}>Link to Discord community</span>
          <InlineSvg svg={discordIcon} id="discord" />
        </a>
        <a
          href="https://github.com/proveuswrong"
          target="_blank"
          rel="noopener noreferrer"
          title='GitHub Organization'
        >
          <span style={{ display: "none" }}>Link to GitHub profile</span>
          <InlineSvg svg={githubIcon} id="github" />
        </a>

        <a
          href="mailto:inbox@proveuswrong.io"
          target="_blank"
          rel="noopener noreferrer"
          title='E-mail Address'
        >
          <span style={{ display: "none" }}>Link to e-mail address</span>
          <InlineSvg svg={emailIcon} id="email" />
        </a>
        <a
          href="/pressKit.zip"
          target="_blank"
          rel="noopener noreferrer"
          title='Press Kit'
        >
          <span style={{ display: "none" }}>Press Kit</span>
          <InlineSvg svg={pressKitIcon} id="pressKit" />
        </a>
      </div>

      <small>Copyright {new Date().getFullYear()} Prove Us Wrong</small>
      <small>This site is powered by <a target="_blank" rel="noopener noreferrer" href="https://pages.cloudflare.com/">Cloudflare Pages</a></small>

    </div>
  </footer>
);

export default Footer;
