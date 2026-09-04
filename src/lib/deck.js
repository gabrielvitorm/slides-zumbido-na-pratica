// Achata uma trilha (capa + aulas) numa lista linear de "paradas" navegáveis,
// e converte entre posição na lista e URL (/:curso/:trilha/:aula/:slide).

export function flattenTrilha(trilha) {
  const stops = [{ kind: 'cover', slide: trilha.cover }]
  trilha.lessons.forEach((lesson) => {
    lesson.slides.forEach((slide, i) => {
      stops.push({ kind: 'lesson', slide, lessonSlug: lesson.slug, slideNum: i + 1 })
    })
  })
  return stops
}

export function stopPath(base, stop) {
  if (stop.kind === 'cover') return base
  return stop.slideNum === 1
    ? `${base}/${stop.lessonSlug}`
    : `${base}/${stop.lessonSlug}/${stop.slideNum}`
}

// aula ausente -> capa (índice 0). slide ausente -> primeiro slide da aula.
export function findStopIndex(stops, aula, slideParam) {
  if (!aula) return 0
  const slideNum = slideParam ? parseInt(slideParam, 10) : 1
  return stops.findIndex((s) => s.kind === 'lesson' && s.lessonSlug === aula && s.slideNum === slideNum)
}
