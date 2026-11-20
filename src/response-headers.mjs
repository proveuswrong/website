import { writeFileSync } from "node:fs";

import { isProduction } from "./site.mjs";

const NOINDEX_ON_EVERY_RESPONSE = "/*\n  X-Robots-Tag: noindex\n";

/**
 * Writes the Cloudflare Pages `_headers` file once the pages are built. A build
 * that is not the production build gets the rule that marks every response
 * `noindex`; a production build has no rule, so it gets no file.
 */
export const responseHeaders = () => ({
  name: "response-headers",
  hooks: {
    "astro:build:done": ({ dir }) => {
      if (!isProduction) {
        writeFileSync(new URL("_headers", dir), NOINDEX_ON_EVERY_RESPONSE);
      }
    },
  },
});
