// Resolve o "escopo" de slides navegáveis de uma aula: cada aula é um deck
// fechado (não passa pra próxima aula sozinho).

export function resolveScope(trilha, aulaSlug) {
  if (!trilha) return null
  const lesson = trilha.lessons.find((l) => l.slug === aulaSlug)
  return lesson ? { slides: lesson.slides } : null
}

export function scopePath(base, index) {
  return index === 0 ? base : `${base}/${index + 1}`
}
