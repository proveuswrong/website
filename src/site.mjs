const PRODUCTION_URL = "https://proveuswrong.io";
const LOCAL_URL = "http://localhost:4321";
const PRODUCTION_BRANCH = "main";

const branchBuiltByCloudflare = process.env.CF_PAGES_BRANCH;

/**
 * Whether this build is the one published at the address of the site.
 * Cloudflare Pages names the branch of each of its builds, and only the
 * production branch is published there. Away from Cloudflare a build counts
 * as production and the development server does not.
 */
export const isProduction = branchBuiltByCloudflare
  ? branchBuiltByCloudflare === PRODUCTION_BRANCH
  : process.env.NODE_ENV === "production";

export const siteUrl = isProduction
  ? PRODUCTION_URL
  : process.env.CF_PAGES_URL || LOCAL_URL;

export const title = "Prove Us Wrong";
export const description =
  "We work on decentralized curation, so no single curator has to be trusted: Ferit Tunçer's framework and its applications to news and public goods funding.";
export const author = "@0xferit";

/** The organization's own pages on other sites. */
export const profiles = {
  linkedIn: "https://www.linkedin.com/company/prove-us-wrong/",
  twitter: "https://twitter.com/ProveUsWrongIO",
  gitHub: "https://github.com/proveuswrong",
};
