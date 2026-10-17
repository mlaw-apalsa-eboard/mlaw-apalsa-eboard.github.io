# Michigan APALSA website

Source for [mlawapalsa.com](https://www.mlawapalsa.com), the website of the Asian Pacific
American Law Students Association at the University of Michigan Law School.

> **Board members:** you don't need anything in this file. To edit the site, see
> **[docs/EDITING.md](docs/EDITING.md)**. For the yearly board transition, see
> **[docs/HANDOFF.md](docs/HANDOFF.md)**.

## How it works

| Piece        | What it does                                                              | Cost         |
| ------------ | ------------------------------------------------------------------------- | ------------ |
| [Astro]      | Turns the content files in `src/content/` into a fast, static website     | Free         |
| [Pages CMS]  | A web editor so board members can change content without touching code    | Free         |
| GitHub       | Stores the code and content; every change is versioned and can be undone  | Free         |
| GitHub Pages | Hosts the site. A GitHub Action rebuilds and publishes it on every change | Free         |
| Domain       | `mlawapalsa.com`                                                          | ~$10–11/year |

```
Board member edits in Pages CMS ──► commit to GitHub (main) ──► GitHub Action builds ──► live site
```

If a change is invalid (say, a required field is blank or a photo is missing), the build fails
and the live site stays on the last good version. The site also rebuilds daily so past events
move out of "Upcoming".

[Astro]: https://astro.build
[Pages CMS]: https://pagescms.org

## Developing locally

Requires Node.js 22.22 or later (see `.nvmrc`).

```sh
npm install
npm run dev        # http://localhost:4321
```

| Command             | Does                                                      |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Start the dev server with live reload                     |
| `npm run build`     | Build the production site into `dist/`                    |
| `npm run preview`   | Serve the built site locally                              |
| `npm run check`     | Type-check and validate all content against its schema    |
| `npm run check:cms` | Confirm `.pages.yml` matches the content (see below)      |
| `npm run lint`      | ESLint, including accessibility rules                     |
| `npm run format`    | Format everything with Prettier                           |
| `npm run validate`  | Everything CI runs: format, lint, check, check:cms, build |

## Project structure

```
.pages.yml                 Pages CMS editor configuration
.github/workflows/         deploy.yml (publish to Pages), ci.yml (checks on pull requests)
scripts/                   check-cms-config.ts
src/
  content/                 ← all editable content
    board/                 one .yml file per board member
    events/                one .md file per event
    pages/                 text and settings for each page
    settings/site.yml      email, social links, address
  assets/uploads/          photos (board headshots, page photos); optimized at build time
  content.config.ts        schemas that validate the content
  components/              reusable UI pieces
  layouts/BaseLayout.astro shared <head>, header, and footer
  lib/                     board ordering, event dates, navigation
  pages/                   one file per URL
  styles/global.css        design tokens and base styles
docs/                      guides for editors and for the yearly handoff
```

## Conventions

- **Content lives in `src/content/`, never in components.** If a board member might want to
  change some text, put it in a content file and add a matching field to `.pages.yml`.
- **`.pages.yml` must list every field in the content.** Pages CMS rewrites a file from its
  field list when saving, so a field missing from the config would be deleted on the next save.
  `npm run check:cms` (part of CI) catches this.
- **Board positions** are defined in `src/lib/board.ts` (`BOARD_ROLES`, which also sets their
  order on the Board page) and repeated in the `role` options in `.pages.yml`. Change both.
  `npm run check:cms` verifies they match.
- **Event times** are wall-clock times in Ann Arbor (`America/Detroit`), stored as
  `YYYY-MM-DDTHH:mm`. `src/lib/datetime.ts` handles them as strings so the build server's time
  zone can't shift them.
- **Images** go through `astro:assets`, which resizes them and converts them to modern formats.
  Uploads use the path `/src/assets/uploads/...` so Astro can find them.
- **Accessibility:** semantic HTML, a skip link, visible focus styles, alt text required on photos,
  and `eslint-plugin-astro`'s strict jsx-a11y rules. Pages were checked with axe (WCAG 2.2 AA).
- **Formatting** is Prettier's, enforced in CI. Content files are excluded so we don't fight Pages
  CMS's own formatting.
- **Dependencies** are updated monthly by Dependabot pull requests. Merge them if CI passes.

## Deployment

Pushing to `main` deploys automatically through `.github/workflows/deploy.yml`. First-time
setup (GitHub organization, Pages, custom domain, Pages CMS) is in
[docs/LAUNCH.md](docs/LAUNCH.md).
