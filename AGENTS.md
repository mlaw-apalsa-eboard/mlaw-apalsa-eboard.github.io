# Agent notes

Static Astro site for Michigan APALSA, hosted on GitHub Pages and edited by non-technical board
members through Pages CMS. Read `README.md` first.

## Rules

- Editable content lives in `src/content/` and is validated by `src/content.config.ts`.
- Every content field must also appear in `.pages.yml`, or Pages CMS will delete it on save.
  Run `npm run check:cms` after changing either.
- Board positions: `BOARD_ROLES` in `src/lib/board.ts` and the `role` options in `.pages.yml`
  must match.
- Event times are Ann Arbor wall-clock strings; use the helpers in `src/lib/datetime.ts`.
- Run `npm run validate` before finishing a change.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Astro docs: https://docs.astro.build
