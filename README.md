# Notes from Japan

A minimalist personal journal. 
Built with Astro, Markdown/MDX, local fonts, and plain CSS. The output is a static website with a small JavaScript photo carousel and no accounts, comments, social widgets, or analytics.

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
    date: 2026-09-18
    alt: 'Morning light falling across a narrow street in Kyoto'
    caption: 'Before the city wakes up.'
    location: Kyoto
  - src: '../../assets/photos/train-window.jpg'
    date: 2026-09-17
    alt: 'Fields seen through the window of a train'
    caption: 'Somewhere along the way.'
```

La homepage mostra una griglia delle 10 fotografie più recenti. Se ce ne sono più di 10, il pulsante “Mostra tutte le fotografie” apre la pagina Foto con la raccolta completa. Entrambe le raccolte sono ordinate dalla foto più recente alla più vecchia: aggiungi `date: 2026-09-18` a ogni elemento di `photos` per indicarne la data. Se `date` manca, viene usata la data `pubDate` della nota. A parità di data viene mantenuto l’ordine originale; puoi includere anche l’ora, per esempio `date: '2026-09-18T19:30:00+09:00'`.

Solo nei post con più foto viene mostrato il carosello, prima del testo e nell’ordine indicato in `photos`. Avanza ogni 5 secondi e ricomincia dalla prima foto quando arriva alla fine. Frecce e contatore sono centrati sotto le immagini; non ci sono pulsanti Pausa/Riprendi. Puoi anche scorrere con il dito o con la tastiera. L’avanzamento automatico rispetta la preferenza del dispositivo per i movimenti ridotti. Una sola foto viene mostrata centrata, senza carosello. Senza JavaScript è disponibile lo scorrimento orizzontale manuale. Cover images appear in the journal list and join the entry carousel without duplicates; add them to `photos` too if you want them in the archive. Images get responsive sizes, lazy loading (except the entry cover), and build-time optimization. Select a gallery image to open a larger optimized version using the browser’s native image viewer; use Back to return. Gallery images require alt text, and covers require `heroAlt`.

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
