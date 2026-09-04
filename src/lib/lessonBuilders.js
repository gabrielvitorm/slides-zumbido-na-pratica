// Helpers para montar aulas a partir de dados simples.
// Usados por qualquer curso/trilha em src/content/courses/*.

function divider(numRaw, title) {
  const num = String(numRaw).padStart(2, '0')
  return { type: 'divider', num, tag: `// aula ${numRaw}`, title }
}

function agendaSlide(items, active) {
  return { type: 'agenda', tag: '// nesta aula', items, active }
}

// Aula "não-técnica": divider -> agenda -> (point -> agenda destacando o próximo) x N
export function nonTechLesson(numRaw, title, points) {
  const items = points.map((p) => p.title)
  const slides = [divider(numRaw, title), agendaSlide(items, -1)]
  points.forEach((p, i) => {
    slides.push({
      type: 'point',
      tag: `// ponto ${i + 1} de ${points.length}`,
      title: p.title,
      text: p.text,
    })
    if (i < points.length - 1) slides.push(agendaSlide(items, i + 1))
  })
  return { slug: `aula${numRaw}`, num: numRaw, title, slides }
}

// Aula "técnica": divider -> agenda -> 1 slide `tecnica` (ou `point`) por bloco
export function techLesson(numRaw, title, blocks) {
  const items = blocks.map((b) => b.title)
  const slides = [divider(numRaw, title), agendaSlide(items, -1)]
  blocks.forEach((b, i) => {
    const tag = `// bloco ${i + 1}`
    if (b.type === 'point') {
      slides.push({ type: 'point', tag, title: b.title, text: b.text })
    } else {
      slides.push({
        type: 'tecnica',
        tag,
        title: b.title,
        steps: b.steps,
        shotBox: b.shotBox !== false,
        note: b.note,
      })
    }
  })
  return { slug: `aula${numRaw}`, num: numRaw, title, slides }
}
