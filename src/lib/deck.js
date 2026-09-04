// Resolve o "escopo" de slides navegáveis pra uma URL: cada aula é um deck
// fechado (não passa pra próxima aula sozinho); sem aula na URL, é só a capa.

export function resolveScope(trilha, aulaSlug) {
  if (!trilha) return null
  if (!aulaSlug) return { slides: [trilha.cover] }
  const lesson = trilha.lessons.find((l) => l.slug === aulaSlug)
  return lesson ? { slides: lesson.slides } : null
}

export function scopePath(base, index) {
  return index === 0 ? base : `${base}/${index + 1}`
}
