---
name: writing-lesson-content
description: Use when drafting the actual copy — titles, points, steps — for a new or edited aula in this slides project, before wiring it into a lesson builder
---

# Writing Lesson Content

## Overview

The existing 10 aulas (`plano-slides-completo.md`, `src/content/courses/mini-curso-trafego/trafego.js`) share one voice: direct, practical, second person ("você"), written for fonoaudiólogos/otorrinos/médicos with no marketing background — not for marketers. Match this voice rather than writing generic course copy.

## Non-technical content (`pontos` for `nonTechLesson`)

Each point is one idea, self-contained but building on the previous one across the aula. Shape:
- `title`: a short noun phrase (3-6 words), same string reused as the agenda item — it must make sense standalone in a list.
- `text`: 1-3 sentences, ~150-300 characters. Explain the *why*, not just the *what*. Prefer a concrete contrast or consequence over an abstract definition — e.g. not "campaigns need time to optimize" but "o Meta precisa de alguns dias pra aprender quem converte melhor; trocar valor todo dia reinicia esse aprendizado."
- Points in one aula should read as a mini-argument (setup → mechanism → payoff), not three unrelated facts.

## Technical content (`blocos` for `techLesson`)

Each block covers one screen/section of a real workflow (Business Manager, Gerenciador de Anúncios, WhatsApp Business, etc.).
- `title`: names the screen or the action (e.g. "Conta de Anúncios", "Público").
- `steps`: imperative, one concrete action per line — "Acesse business.facebook.com.", "Escolha o objetivo: Mensagens." Start with the verb. Keep each step short enough to read at a glance on a 1920×1080 slide (roughly one line).
- Use a `note` for a caveat that doesn't belong as a numbered step (e.g. "essa segmentação é mais limitada que no Gerenciador de Anúncios").
- Only mark a block's shot-box `shotBox: false` when there's genuinely no new screen (see `adding-lessons`).

## Turning raw material into this shape

Given a transcript, outline, or the instructor's rough notes:
1. Split by screen/decision, not by sentence — each block/point should map to one screen (technical) or one idea (non-technical).
2. Cut filler and hedging; keep the concrete instruction or the concrete consequence.
3. Reuse terminology already established in earlier aulas (e.g. "custo por resultado", "aprendizado do algoritmo") instead of introducing synonyms — the course builds a shared vocabulary across aulas.
4. Check `plano-slides-completo.md` for whether this content was already planned — if so, match its intent even if you improve the wording (the shipped copy in `trafego.js` sometimes already improves on the plan's wording; treat `trafego.js` as the more current source when they diverge).
