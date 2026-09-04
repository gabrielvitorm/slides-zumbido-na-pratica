---
name: adding-lessons
description: Use when adding a new aula (lesson) to an existing trilha in this slides project, or reordering/restructuring an aula's slide sequence
---

# Adding Lessons

## Overview

An aula is never hand-written as a raw slide array. It's built by calling `nonTechLesson` or `techLesson` from `src/lib/lessonBuilders.js`, which generates the `divider → agenda → ...` sequence, the URL slug (`aula${numero}`), and the divider numbering automatically. Hand-rolling the slide array breaks the counter/tag numbering conventions.

## Which builder

- **`nonTechLesson(numero, titulo, pontos)`** — a lesson that's a talk/explanation, no UI to walk through. Produces `divider → agenda → (point → agenda highlighting next) × N`. `pontos: [{ title, text }]`, 3 items is the established norm (not a hard limit).
- **`techLesson(numero, titulo, blocos)`** — a lesson that walks through steps in some tool/UI. Produces `divider → agenda → one slide per block`. `blocos: [{ title, steps: [...], shotBox?: false, note? }]`.
  - Each block becomes one `tecnica` slide (see slide-type-variations skill for the exact shape).
  - `shotBox: false` — use only when the block has no new screen to show (e.g. it just restates a value already shown in a previous block's screenshot).
  - `note` — a caveat/observação rendered under the steps (e.g. "essa versão é mais limitada que a outra").
  - A block can instead be `{ type: 'point', title, text }` — no `steps` — for a non-technical aside inside an otherwise technical lesson (see aula 9's CRM block for the reference case). Use sparingly: it's for a block that's pure talk, not a shortcut around writing real steps.

For lesson content voice/length, use the `writing-lesson-content` skill before filling in `pontos`/`blocos`.

## Where it goes

Add the built lesson to the `lessons` array in the trilha file, e.g. `src/content/courses/zumbido-na-pratica/trafego.js`:

```js
export const lessons = [
  nonTechLesson(1, 'O que é tráfego pago', [ ... ]),
  // ...
  techLesson(11, 'Nome da aula nova', [ ... ]),
]
```

Nothing else needs to change — no routing, no registry, no components. The lesson's slug, URL, divider tag/number, and agenda are all derived from the `numero` and the array position you call the builder with.

## Sanity-check the slide count

- `nonTechLesson` with N points → `2N + 1` slides (matches the pattern in `plano-slides-completo.md`).
- `techLesson` with B blocks → `B + 2` slides.

If the count you expect doesn't match, you likely mismatched the builder to the content (e.g. used `nonTechLesson` for something that actually has UI steps).

## Verify

Run `npm run build` after adding a lesson — a malformed block/point object throws at build time (missing `title`, `steps` vs `text` mismatch, etc.) rather than failing silently.
