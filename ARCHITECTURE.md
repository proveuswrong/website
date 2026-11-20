# Architecture

A static site. Astro turns the sources into files under `public/` and Cloudflare Pages serves them. Nothing runs on a server, and a page loads one script: the menu.

## Parts

| Part | Where | Owns |
|---|---|---|
| Build settings | `astro.config.mjs` | Output and static directories, the form of addresses, the Markdown processor and its plugins, the Sass load path, the oldest browsers the styles are written for |
| Site facts | `src/site.mjs` | What a production build is, the address a build is for, the site's title, description and author, the organization's profiles on other sites |
| Layout | `src/layouts/`, `src/components/` | The document: head tags, header with the menu, footer, global styles |
| Pages | `src/pages/` | `/`, `/about/` and the error page by hand; `[...slug].astro` renders every Markdown page |
| Content | `src/content/pages/` | The Markdown pages. In the frontmatter, `slug` sets the address, `toc` asks for a contents list and `draft` leaves the page out |
| Markdown plugins | `src/markdown-plugins.mjs` | The anchor link in each heading; new-tab attributes on links that leave the site |
| Crawler files | `src/crawler-files.mjs` | `robots.txt`, `sitemap.xml`, and the `_headers` rule of a build that is not production |
| Styles | `src/styles/`, `*.module.scss` | Shared variables and partials; one CSS Module per component or page |
| Static files | `static/` | Served from the root unchanged: redirects, press kit, icons, web app manifest |
| Checks | `test/` | Read a built `public/` and compare it with the contract and with `reference.json` |

## Guarantees

- **Production is decided once.** `isProduction` in `src/site.mjs` follows the branch Cloudflare Pages says it is building: `main` is production, every other branch is not. The head tags and the crawler files read it; nothing else decides.
- **A build that is not production is not indexed.** Every page carries `noindex`, and `_headers` sends it with every response, because Cloudflare adds its own header only on `pages.dev` addresses. A production build has neither.
- **Addresses come from content.** A Markdown page lives where its `slug` says. The sitemap lists whatever was built, except the error page.
- **The checks judge the output.** They are told which kind of build to expect and never infer it, so a production build that marks itself `noindex` fails.

## Deployment

Cloudflare Pages runs `yarn build` and publishes `public/`: `main` as production at https://proveuswrong.io, `develop` as a preview at https://develop.proveuswrong.io. The build writes to `public/` and reads static files from `static/`, the reverse of Astro's defaults, because `public/` is the directory the Pages project publishes.

A push to `main` fast-forwards `develop` to it (`.github/workflows/fastForwardDevelop.yml`), so after a release the two branches are the same commit. The push is never forced: if `develop` holds commits that `main` lacks, the workflow fails and leaves both branches as they are.

## Why it is built this way

- **No client framework.** The pages are documents; the menu is their only behaviour.
- **Markdown plugins of our own.** Two short visitors do the work of two dependencies.
- **Install scripts off.** No dependency needs one, so none may run.
