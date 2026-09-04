---
name: adding-courses
description: Use when adding a new curso or trilha (a new course or track, not just a new aula within the existing one) to this slides project
---

# Adding Courses / Trilhas

## Overview

This project is built to host more than one course. A "curso" (e.g. `zumbido-na-pratica`) can have multiple "trilhas" (e.g. `trafego`), and both slugs become URL segments: `/:curso/:trilha/:aula/:slide`. Adding one is two steps — a content file and one registry entry — with zero changes to routing, navigation, or CSS.

## Steps

1. Create `src/content/courses/<curso-slug>/<trilha-slug>.js`, modeled on `src/content/courses/zumbido-na-pratica/trafego.js`:
   ```js
   import { nonTechLesson, techLesson } from '../../../lib/lessonBuilders.js'

   export const cover = {
     type: 'cover',
     kicker: '// ...',
     title: '...',
     sub: '...',
     node: { top: '...', bottom: '...' },
   }

   export const lessons = [
     nonTechLesson(1, '...', [...]),
     // ...
   ]

   export default { label: '...', cover, lessons }
   ```
   Use `writing-lesson-content` and `adding-lessons` for the actual lesson content.

2. Register it in `src/content/registry.js`:
   ```js
   import minhaTrilha from './courses/<curso-slug>/<trilha-slug>.js'

   export const courses = {
     'zumbido-na-pratica': { label: '...', trilhas: { trafego, /* + new trilha if same curso */ } },
     '<curso-slug>': { label: '...', trilhas: { '<trilha-slug>': minhaTrilha } },
   }
   ```
   The object keys — not any field inside the trilha file — are what the URL matches. Keep them URL-safe (lowercase, hyphens).

3. Only change `defaultPath` (also in `registry.js`) if `/` should now redirect somewhere else — it's a deliberate choice, not something a new course should silently take over.

## Verify

`npm run build`, then `npm run dev` and open `/<curso-slug>/<trilha-slug>` to confirm the cover renders and `/<curso-slug>/<trilha-slug>/aula1` resolves. An unregistered curso/trilha renders the "Curso ou trilha não encontrada" state in `DeckView.jsx` rather than crashing — if you see that, the registry key doesn't match the URL you typed.
