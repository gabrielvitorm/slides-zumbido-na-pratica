# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A React (Vite) app that renders course slide decks as an online presentation, one deck per lesson ("aula"). It's meant to run standalone on a VPS at `slides.dominio.com`, serving multiple courses (currently: "Zumbido na Prática", an empty placeholder course, and "Mini Curso Tráfego", which has content — the trilha "trafego").

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

**Routing (React Router, `src/App.jsx`):**
- `/` → `Home.jsx` — lists every course in the registry as a card. A course with no trilhas registered yet renders disabled with an "em breve" badge instead of a link (see "Zumbido na Prática" today).
- `/:curso/:trilha` → `TrilhaHome.jsx` — the course landing page: trilha's cover copy + a clickable menu of every lesson (`lessons.map`), linking into each aula. This is the hub for moving between aulas, since aulas no longer chain into each other (see below).
- `/:curso/:trilha/:aula` and `/:curso/:trilha/:aula/:slide` → `DeckView.jsx` — the actual slide presentation. `aula` is a lesson slug like `aula1`; `slide` is a 1-based index within that lesson (omitted = slide 1).
- Unknown paths redirect to `/`.

`curso` and `trilha` map directly to keys in the content registry (see below).

**Each aula is a closed deck, not a continuous course.** `DeckView` resolves a "scope" from the URL via `src/lib/deck.js` (`resolveScope`): the scope is always just the current lesson's slides. Keyboard (arrows/space), click zones, and the ‹ › buttons all navigate *within that lesson* — reaching its last slide does not spill into the next lesson. The progress bar and counter are relative to the current lesson, not the whole course. This was a deliberate change from an earlier version that flattened the entire trilha into one continuous 66-slide deck; don't reintroduce cross-lesson auto-advance without being asked. To move between aulas, go back to `/:curso/:trilha` (`TrilhaHome`).

**Content model (`src/content/`):** one file per trilha at `src/content/courses/<curso-slug>/<trilha-slug>.js`, exporting `cover` and a `lessons` array. `src/content/registry.js` is the single place that wires curso/trilha slugs (the URL segments) to those files. A course can be registered with `trilhas: {}` (no content yet) — `Home.jsx` handles that state, nothing else needs to. Adding a new course/trilha means adding a content file + one registry entry — no changes to routing, navigation, or CSS needed.

Lessons are built with helpers from `src/lib/lessonBuilders.js` rather than written as raw slide arrays, mirroring the pattern from the source plan (`plano-slides-completo.md`):
- `nonTechLesson(numero, titulo, pontos)` → `divider → agenda → (point → agenda highlighting the next item) × N`. `pontos: [{ title, text }]`.
- `techLesson(numero, titulo, blocos)` → `divider → agenda → one tecnica slide per block`. `blocos: [{ title, steps: [...], shotBox?: false, note? }]`; a block can instead be `{ type: 'point', title, text }` for a non-technical aside inside an otherwise technical lesson (used in aula 9). `shotBox: false` drops the screenshot-placeholder box for a block that has no screen to show.
- Both helpers derive the lesson's URL slug as `aula${numero}` and its divider numbering/tag automatically — don't hand-roll these.

**Slide rendering (`src/components/`):** `Slide.jsx` dispatches on `slide.type` (`cover | divider | agenda | point | tecnica`) to the matching component, which just renders the shape produced by the builders above. All visual styling is global CSS in `src/index.css` (ported 1:1 from the original static prototype `curso-slides-v2.html`) — slides are laid out on a fixed 1920×1080 `#stage` that gets scaled to fit the viewport in `DeckView`'s `fitStage` effect. There's no per-component CSS.

`Home.jsx` and `TrilhaHome.jsx` are ordinary scrollable pages, not slides — they don't use `#stage`/`fitStage` and aren't dispatched through `Slide.jsx`. They reuse the same color/font custom properties from `src/index.css` (`.home`, `.trilha-home` rule blocks) to stay visually consistent. `NotFound.jsx` is a small shared component used by both `DeckView` and `TrilhaHome` for the "curso/trilha/aula não encontrada" states.

## Origin / reference files

`curso-slides-v2.html` is the original static HTML prototype this app was built from (defines the visual design and the 5 slide types). `plano-slides-completo.md` is the content plan with the full copy for all 10 lessons of the "Tráfego pago" trilha — the source of truth if lesson content ever needs re-checking against the original spec. Both are kept as reference, not part of the build.

## Deploy

Static build (`dist/`) served by Nginx; example config at `deploy/nginx.conf.example`. Because routes are per-slide, Nginx **must** fall back to `index.html` for any path (`try_files $uri $uri/ /index.html;`), otherwise a direct link like `/mini-curso-trafego/trafego/aula3/2` 404s on reload. See `README.md` for the full VPS deploy walkthrough (build → upload `dist/` → Nginx → DNS → optional Certbot).
