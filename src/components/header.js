import * as React from "react";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { Link } from "gatsby";
import * as styles from "./header.module.scss";

const NAVIGATION_ID = "site-navigation";

const sections = [
  { label: "HOME", to: "/" },
  { label: "PROJECTS", to: "/projects/", includesSubpages: true },
  { label: "F.A.Q.", to: "/faq/" },
  { label: "BLOG", href: "https://blog.proveuswrong.io" },
  { label: "ABOUT", to: "/about/" },
];

const Header = ({ siteTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const closeOnEscape = (event) => event.key === "Escape" && closeMenu();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header>
      <div className={styles.container}>
        <Link to="/" aria-label={`${siteTitle}, home`}>
          <span id="brand" className={styles.brand}>
            Prove <br /> Us <br /> Wrong
          </span>
        </Link>
        <button
          type="button"
          className={`${styles.menuButton} ${isMenuOpen ? styles.open : ""}`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls={NAVIGATION_ID}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          id={NAVIGATION_ID}
          className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}
          aria-label="Main"
        >
          <ul>
            {sections.map(({ label, to, href, includesSubpages }) => (
              <li key={label}>
                {to ? (
                  <Link
                    to={to}
                    activeClassName={styles.active}
                    partiallyActive={includesSubpages}
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
