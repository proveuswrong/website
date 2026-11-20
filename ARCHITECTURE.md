# Architecture

A static site. Astro turns the sources into files under `public/` and Cloudflare Pages serves them. Nothing runs on a server, and a page runs one script: the menu.

## Parts

| Part | Where | Owns |
|---|---|---|
| Build settings | `astro.config.mjs` | Output and static directories, the form of addresses, the Markdown processor and its plugins, the Sass load path, the oldest browsers the styles are written for |
| Site facts | `src/site.mjs` | What a production build is, the address a build is for, the site's title, description and author, the organization's profiles on other sites |
| Layout | `src/layouts/`, `src/components/` | The document: head tags, among them the structured data that names the site and the organization, header with the menu, footer, global styles |
| Pages | `src/pages/` | `/`, `/about/` and the error page by hand; `[...slug].astro` renders every Markdown page |
| Content | `src/content/pages/` | The Markdown pages. In the frontmatter, `slug` sets the address, `description` is what search results and link previews say about the page, `toc` asks for a contents list and `draft` leaves the page out |
| Markdown plugins | `src/markdown-plugins.mjs` | The anchor link in each heading; new-tab attributes on links that leave the site |
| Crawler files | `src/crawler-files.mjs` | `robots.txt` and `sitemap.xml` |
| Response headers | `src/response-headers.mjs` | `_headers`, the rules Cloudflare Pages adds to responses: a year's caching without revalidation for the files Astro writes to `_astro/`, and `noindex` on every response of a build that is not production |
| Styles | `src/styles/`, `*.module.scss` | Shared variables and partials; one CSS Module per component or page |
| Fonts | `src/fonts.mjs`, `static/fonts/` | Space Mono for the text and Monoton for the name in the header. Each family's folder holds its files and licence; Astro's fonts feature writes their faces into every page, and styles reach them through `--font-space-mono` and `--font-monoton` |
| Static files | `static/` | Served from the root unchanged: redirects, press kit, icons, web app manifest, the font families with their licences |
| Checks | `test/` | Read a built `public/` and compare it with the contract and with `reference.json`. Apart from them, `lockfile-age.js` judges each version `yarn.lock` newly locks against a base revision by Yarn's age gate, importing nothing installed |

## Guarantees

- **Production is decided once.** `isProduction` in `src/site.mjs` follows the branch Cloudflare Pages says it is building: `main` is production, every other branch is not. The head tags and the response headers read it; nothing else decides.
- **A build that is not production is not indexed.** Every page carries `noindex`, and `_headers` sends it with every response, because Cloudflare adds its own header only on `pages.dev` addresses. A production build has neither, except the error page's `noindex`.
- **A production page names its one address.** Every page of a production build carries a canonical link to its address on the production site. The error page carries `noindex` instead, because Cloudflare Pages also serves it with status 200 at `/404`.
- **Addresses come from content.** A Markdown page lives where its `slug` says. The sitemap lists whatever was built, except the error page.
- **Only files named after what they hold skip revalidation.** Astro names each file under `_astro/` after its content, an image after its source and its size, format and quality, so a changed file gets a new address and browsers keep these files a year without asking again. A change to the image service's settings alone renames no image, so returning visitors keep the earlier rendering. Pages and files from `static/` keep their addresses and Cloudflare's own cache headers, at most four hours in the browser; nothing from `static/` may land in `_astro/`.
- **A page contacts no other site as it loads.** Its styles, fonts, scripts and images come from the site, so opening a page tells no third party about the visit.
- **The checks judge the output.** They are told which kind of build to expect and never infer it, so a production build that marks itself `noindex` fails.

## Deployment

Cloudflare Pages runs `yarn build` and publishes `public/`: `main` as production at https://proveuswrong.io, `develop` as a preview at https://develop.proveuswrong.io. The build writes to `public/` and reads static files from `static/`, the reverse of Astro's defaults, because `public/` is the directory the Pages project publishes.

A push to `main` fast-forwards `develop` to it (`.github/workflows/fastForwardDevelop.yml`), so after a release the two branches are the same commit. The push is never forced: if `develop` holds commits that `main` lacks, the workflow fails and leaves both branches as they are.

## Why it is built this way

- **No client framework.** The pages are documents; the menu is their only behaviour.
- **Markdown plugins of our own.** Two short visitors do the work of two dependencies.
- **Install scripts off.** No dependency needs one, so none may run.
- **Monoton unsubsetted.** Its licence reserves the name "Monoton" for unmodified versions, so the site serves the original file rather than Google Fonts' subsets; Cloudflare compresses it in transit.
- **Plain fallbacks.** Until a web font arrives, or if it never does, text falls back to the system's `monospace` and `cursive`. Astro can generate a fallback sized like Space Mono, which avoids a small shift at the swap, but it fills the bold and italic faces with the regular system font and so drops emphasis.
- **Font folders in `static/`.** Serving a font distributes it, and the SIL Open Font License must travel with every copy; Monoton's file carries no licence of its own, so each family is published whole, licence included.
