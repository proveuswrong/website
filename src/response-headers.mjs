import { writeFileSync } from "node:fs";

import { isProduction } from "./site.mjs";

const A_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
const NOINDEX_ON_EVERY_RESPONSE = "/*\n  X-Robots-Tag: noindex\n";

const cachedForAYearUnder = (directory) =>
  `/${directory}/*\n  Cache-Control: public, max-age=${A_YEAR_IN_SECONDS}, immutable\n`;

/**
 * Writes the Cloudflare Pages `_headers` file once the pages are built.
 * Browsers keep the files Astro writes to its build directory for a year
 * without revalidating them: Astro names each file after its content, so a
 * changed file gets a new address. A build that is not the production build
 * also marks every response `noindex`.
 */
export const responseHeaders = () => {
  let buildFilesDirectory;
  return {
    name: "response-headers",
    hooks: {
      "astro:config:done": ({ config }) => {
        buildFilesDirectory = config.build.assets;
      },
      "astro:build:done": ({ dir }) => {
        const rules = [
          ...(isProduction ? [] : [NOINDEX_ON_EVERY_RESPONSE]),
          cachedForAYearUnder(buildFilesDirectory),
        ];
        writeFileSync(new URL("_headers", dir), rules.join("\n"));
      },
    },
  };
};
