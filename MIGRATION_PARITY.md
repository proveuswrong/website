# Astro Migration Parity Contract

This document defines the "must match" behaviors and routes to keep the Astro
migration safe and low-risk. Changes outside this list are deferred until after
cutover.

## Must Match

### Routes (trailing slash preserved)
- `/` (home)
- `/about/`
- `/faq/`
- `/projects/`
- `/projects/gazette-protocol/` (draft content; see Draft Handling)
- `/projects/the-truth-post/`
- `/projects/prove-me-wrong/` (draft content; see Draft Handling)
- `/404/` (404 page)

### Markdown Source + Frontmatter
Source files live in `src/pages/**/*.md` with frontmatter:
- `slug` (string, required)
- `draft` (boolean, optional)
- `toc` (boolean, optional)

### Draft Handling
Current Gatsby behavior hides drafts in all environments because `process.env.ENV`
is undefined. For parity-first, drafts should remain hidden in production and
preview unless we explicitly opt-in to show them.

### TOC Behavior
If `toc: true`, insert a list of `h2` headings immediately after the first `h1`.
Each entry links to the heading id (slugged).

### SEO + Metadata
- Canonical/OG/Twitter tags match the current `Seo` component.
- `og:url` and canonical should use the deployment base URL.
  - Production base: `https://proveuswrong.io/`
  - Preview base: `CF_PAGES_URL` (Cloudflare Pages)
- `og:image` defaults to the site icon (`src/images/icon.png`).

### Sitemap/Robots
- `sitemap.xml` available at `/sitemap.xml`
- `robots.txt` allows all (`User-agent: *`, `Allow: /`)

### Assets + Paths
- Static files in `static/` are served from the site root:
  - `/pressKit.zip`
  - `/link.svg`
  - `/linkRed.svg`
- Image assets in `src/images/` are used by layout and About page.

### Styling
- SCSS modules and global styles must retain current visual output.

## Open Decisions (post-parity)
- PWA manifest/offline support (currently in Gatsby, can be reintroduced later).
- Whether drafts should be visible in preview builds.
- Whether to keep React components or rewrite to native Astro.

## Parity Check Results (Astro build)
- Routes rendered in `astro/dist`: `/`, `/about/`, `/faq/`, `/projects/`, `/projects/the-truth-post/`, `/404/`.
- Draft routes excluded from build output as expected (`/projects/gazette-protocol/`, `/projects/prove-me-wrong/`).
- TOC insertion verified on `/faq/` (list of `h2` links placed after first `h1`).
- SEO tags present on sampled pages (title, description, OG/Twitter, `og:url` uses `https://proveuswrong.io/`).
- Static assets verified in output root and `/images/` (press kit + icons + portraits).
- `sitemap.xml` now served as an index pointing to `/sitemap-0.xml` (fixes robots.txt parity).
