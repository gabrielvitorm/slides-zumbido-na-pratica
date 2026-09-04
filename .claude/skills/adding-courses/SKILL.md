---
name: adding-courses
description: Use when adding a new curso or trilha (a new course or track, not just a new aula within the existing one) to this slides project
---

# Adding Courses / Trilhas

## Overview

This project is built to host more than one course. A "curso" (e.g. `mini-curso-trafego`) can have multiple "trilhas" (e.g. `trafego`), and both slugs become URL segments: `/:curso/:trilha/:aula/:slide`. Adding one is two steps — a content file and one registry entry — with zero changes to routing, navigation, or CSS.

A curso can also be registered with no trilha yet (`trilhas: {}`) as a placeholder — see `zumbido-na-pratica` in `registry.js`. `Home.jsx` renders it disabled with an "em breve" badge instead of a link. Once you add its first trilha, it becomes clickable automatically — no change to `Home.jsx` needed.

## Steps

1. Create `src/content/courses/<curso-slug>/<trilha-slug>.js`, modeled on `src/content/courses/mini-curso-trafego/trafego.js`:
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
     'zumbido-na-pratica': { label: 'Zumbido na Prática', trilhas: {} },
     'mini-curso-trafego': { label: 'Mini Curso Tráfego', trilhas: { trafego } },
     '<curso-slug>': { label: '...', trilhas: { '<trilha-slug>': minhaTrilha } },
   }
   ```
   The object keys — not any field inside the trilha file — are what the URL matches, and what `Home.jsx` iterates to build the course cards. Keep them URL-safe (lowercase, hyphens).

## Verify

`npm run build`, then `npm run dev` and open `/` to confirm the new course card shows up (and links, since it now has a trilha), then `/<curso-slug>/<trilha-slug>` for the lesson menu and `/<curso-slug>/<trilha-slug>/aula1` for the first slide. An unregistered curso/trilha renders a "não encontrada" state (`NotFound.jsx`, used by both `TrilhaHome.jsx` and `DeckView.jsx`) rather than crashing — if you see that, the registry key doesn't match the URL you typed.
