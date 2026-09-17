# Notes from Japan

A minimalist personal journal. 
Built with Astro, Markdown/MDX, local fonts, and plain CSS. The output is a static website with no client JavaScript, accounts, comments, social widgets, or analytics.

## Development

Use Node 22.12+ (Node 24 recommended) and npm.

```sh
npm ci
npm run dev -- --background
```

Open http://localhost:4321/blog/ (or the URL printed by Astro).

```sh
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run check
npm run build
npm run preview
```

The production files are in `dist/`.

## Write an entry

Create `src/content/blog/my-entry.md` or `.mdx`:

```md
---
title: 'A quiet morning'
description: 'A short introduction to this entry.'
pubDate: 2026-09-17
category: Journey
location: Kyoto
draft: true
---

Write your story here.
```

Categories are `Journey`, `Ideas`, and `Photography`. `location`, `updatedDate`, `heroImage`, `heroAlt`, and `photos` are optional. Set `draft: false` (or remove it) to publish. Drafts and future-dated entries are excluded from every page, the photo archive, and RSS, including in development. Future entries need a new build on or after their publication date to appear. Dates display in UTC consistently.

The filename becomes the entry URL, e.g. `/blog/blog/my-entry/` with the default GitHub Pages base. Keep filenames stable to preserve links. For internal links in Markdown, include the configured base path. MDX can import `withBase` and `postUrl` from `src/lib/paths.ts` when links need to work with different base paths.

The included `a-place-to-begin.md` is editable starter copy, not an imported travel account. Replace it or mark it as a draft before publishing if you prefer an empty journal. `_template.md` is an unpublished writing template.

## Add photographs

Put your images in `src/assets/photos/`. Add an optional cover and a photo list to the entry’s frontmatter (paths are relative to the Markdown file):

```yaml
heroImage: '../../assets/photos/kyoto-morning.jpg'
heroAlt: 'Morning light falling across a narrow street in Kyoto'
photos:
  - src: '../../assets/photos/kyoto-morning.jpg'
    alt: 'Morning light falling across a narrow street in Kyoto'
    caption: 'Before the city wakes up.'
    location: Kyoto
  - src: '../../assets/photos/train-window.jpg'
    alt: 'Fields seen through the window of a train'
    caption: 'Somewhere along the way.'
```

Photos appear below the entry, in the photo archive, and in the homepage’s latest four photographs. Cover images appear in the journal list and entry header; add them to `photos` too if you want them in the archive. Images get responsive sizes, lazy loading (except the entry cover), and build-time optimization. Select a gallery image to open a larger optimized version using the browser’s native image viewer; use Back to return. Gallery images require alt text, and covers require `heroAlt`.

For an image within the writing, ordinary Markdown also works:

```md
![Describe the scene](../../assets/photos/kyoto-morning.jpg)
```

The initial photo archive is empty because no personal photographs have been supplied.

## Customize

- Name, title, and description: `src/consts.ts`.
- Introduction and biography: `src/pages/index.astro`.
- Colors, typography, and layout: `src/styles/global.css`.
- Content validation: `src/content.config.ts`.

## Repository and publishing

The local repository is connected to `https://github.com/kr0bi/blog.git` as `origin`. That remote was empty when inspected, so there was no remote history or content to merge. The existing local Git history is preserved. Changes have not been pushed or deployed.

The default configuration targets `https://kr0bi.github.io/blog/`. The workflow in `.github/workflows/deploy.yml` checks, builds, and deploys on pushes to `main` or `master`, and supports manual runs. When ready to publish:

1. In GitHub repository **Settings → Pages**, choose **GitHub Actions** as the source.
2. Commit the local changes and push your branch to `origin`.
3. The deployment workflow publishes the contents of `dist/`.

See the [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) for hosting setup.

For a custom domain or another static host, configure `site` and `base` in `astro.config.mjs`, or supply environment variables at build time:

```sh
SITE_URL=https://your-domain.example BASE_PATH=/ npm run build
```

`SITE_URL` is the origin; `BASE_PATH` is the path at which the site is mounted. Navigation, RSS, canonical URLs, and the sitemap use this configuration. Upload `dist/` to the configured location.
