<p align="center">
  <a href="https://proveuswrong.io">
    <img alt="Prove Us Wrong" src="https://avatars.githubusercontent.com/u/95221290?s=400&u=63ccfc89bdf4ea44f1542698cf5c322affa967f3&v=4" width="60" />
  </a>
</p>
<h1 align="center">
  Prove Us Wrong
</h1>

[![Production](https://img.shields.io/website?label=production&url=https%3A%2F%2Fproveuswrong.io&logo=cloudflare&logoColor=white)](https://proveuswrong.io)
[![Develop](https://img.shields.io/website?label=develop&url=https%3A%2F%2Fdevelop.proveuswrong.io&logo=cloudflare&logoColor=white)](https://develop.proveuswrong.io)


[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=proveuswrong_website&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=proveuswrong_website)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=proveuswrong_website&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=proveuswrong_website)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=proveuswrong_website&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=proveuswrong_website)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=proveuswrong_website&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=proveuswrong_website)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=proveuswrong_website&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=proveuswrong_website)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=proveuswrong_website&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=proveuswrong_website)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=proveuswrong_website&metric=bugs)](https://sonarcloud.io/summary/new_code?id=proveuswrong_website)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=proveuswrong_website&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=proveuswrong_website)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=proveuswrong_website&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=proveuswrong_website)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=proveuswrong_website&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=proveuswrong_website)

The website of the organization: a static site built with [Astro](https://astro.build) and served by Cloudflare Pages. [ARCHITECTURE.md](ARCHITECTURE.md) says what lives where.

## Working on it

Node and Yarn are pinned in `package.json`. Install scripts are turned off in `.yarnrc.yml`; the build does not need them.

`.yarnrc.yml` also keeps Yarn from picking a version younger than its age gate. A pull request whose `yarn.lock` newly locks one anyway fails CI before anything is installed, and `node test/lockfile-age.js origin/develop` runs the same check locally. To adopt a version early on purpose, list it as an exact `name@version` under `npmPreapprovedPackages` and remove it once it clears the gate.

| Command | What it does |
|---|---|
| `yarn install --immutable` | Installs exactly what `yarn.lock` pins |
| `yarn develop` | Serves the site locally and rebuilds on change |
| `yarn build` | Builds the site into `public/` |
| `yarn test` | Builds a preview and a production build and checks each |

The pages written in Markdown are in `src/content/pages/`. The address of each comes from its `slug`, and what search results and link previews say about it from its `description`.

## Checking a build

`yarn test` builds the site twice, as a preview build and as a production build, and checks each against the contract in [#69](https://github.com/proveuswrong/website/issues/69): the addresses, the rules for crawlers, the links, and how every page renders compared with `test/reference.json`.

When a change is meant to alter a page, the comparison fails and shows what differs. Run `yarn reference` after `yarn test` and commit the new `test/reference.json` with the change.
