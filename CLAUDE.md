# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A React (Vite) app that renders course slide decks as an online presentation, one deck per lesson ("aula"). It's meant to run standalone on a VPS at `slides.dominio.com`, serving multiple courses over time (currently one: "Zumbido na Prática" / trilha "Tráfego pago").

## Commands

```bash
npm install
npm run dev       # dev server, http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve the dist/ build locally
```

No test suite or linter is configured. Node must be on PATH (`node -v` / `npm -v`) — if not found in a fresh shell on Windows, reload PATH from the registry rather than assuming Node isn't installed:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

## Architecture

**Routing (React Router, `src/App.jsx` + `src/components/DeckView.jsx`):** every slide has its own URL — `/:curso/:trilha`, `/:curso/:trilha/:aula`, `/:curso/:trilha/:aula/:slide`. `curso` and `trilha` map directly to keys in the content registry (see below); `aula` is a lesson slug like `aula1`; `slide` is a 1-based index within that lesson (omitted = slide 1).

**Each aula is a closed deck, not a continuous course.** `DeckView` resolves a "scope" from the URL via `src/lib/deck.js` (`resolveScope`): with no `aula`, the scope is just the trilha's cover slide; with an `aula`, the scope is that lesson's slides only. Keyboard (arrows/space), click zones, and the ‹ › buttons all navigate *within the current scope* — reaching the last slide of a lesson does not spill into the next lesson's slides. The progress bar and counter are relative to the current scope, not the whole course. This was a deliberate change from an earlier version that flattened the entire trilha into one continuous 66-slide deck; don't reintroduce cross-lesson auto-advance without being asked.

**Content model (`src/content/`):** one file per trilha at `src/content/courses/<curso-slug>/<trilha-slug>.js`, exporting `cover` and a `lessons` array. `src/content/registry.js` is the single place that wires curso/trilha slugs (the URL segments) to those files, plus `defaultPath` (where `/` redirects). Adding a new course/trilha means adding a content file + one registry entry — no changes to routing, navigation, or CSS needed.

Lessons are built with helpers from `src/lib/lessonBuilders.js` rather than written as raw slide arrays, mirroring the pattern from the source plan (`plano-slides-completo.md`):
- `nonTechLesson(numero, titulo, pontos)` → `divider → agenda → (point → agenda highlighting the next item) × N`. `pontos: [{ title, text }]`.
- `techLesson(numero, titulo, blocos)` → `divider → agenda → one tecnica slide per block`. `blocos: [{ title, steps: [...], shotBox?: false, note? }]`; a block can instead be `{ type: 'point', title, text }` for a non-technical aside inside an otherwise technical lesson (used in aula 9). `shotBox: false` drops the screenshot-placeholder box for a block that has no screen to show.
- Both helpers derive the lesson's URL slug as `aula${numero}` and its divider numbering/tag automatically — don't hand-roll these.

**Slide rendering (`src/components/`):** `Slide.jsx` dispatches on `slide.type` (`cover | divider | agenda | point | tecnica`) to the matching component, which just renders the shape produced by the builders above. All visual styling is global CSS in `src/index.css` (ported 1:1 from the original static prototype `curso-slides-v2.html`) — slides are laid out on a fixed 1920×1080 `#stage` that gets scaled to fit the viewport in `DeckView`'s `fitStage` effect. There's no per-component CSS.

## Origin / reference files

`curso-slides-v2.html` is the original static HTML prototype this app was built from (defines the visual design and the 5 slide types). `plano-slides-completo.md` is the content plan with the full copy for all 10 lessons of the "Tráfego pago" trilha — the source of truth if lesson content ever needs re-checking against the original spec. Both are kept as reference, not part of the build.

## Deploy

Static build (`dist/`) served by Nginx; example config at `deploy/nginx.conf.example`. Because routes are per-slide, Nginx **must** fall back to `index.html` for any path (`try_files $uri $uri/ /index.html;`), otherwise a direct link like `/zumbido-na-pratica/trafego/aula3/2` 404s on reload. See `README.md` for the full VPS deploy walkthrough (build → upload `dist/` → Nginx → DNS → optional Certbot).
