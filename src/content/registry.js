// Registro central de cursos e trilhas.
// Para adicionar um curso/trilha novo:
//   1. crie src/content/courses/<curso-slug>/<trilha-slug>.js (veja mini-curso-trafego/trafego.js como modelo)
//   2. importe e registre abaixo — a chave do curso e a chave da trilha viram os
//      dois primeiros segmentos da URL (ex: /mini-curso-trafego/trafego/...)
//
// Um curso pode começar com `trilhas: {}` (sem conteúdo ainda) — a home mostra
// esse curso com um selo "em breve" e sem link, até que uma trilha seja registrada.

import trafego from './courses/mini-curso-trafego/trafego.js'

export const courses = {
  'zumbido-na-pratica': {
    label: 'Zumbido na Prática',
    trilhas: {},
  },
  'mini-curso-trafego': {
    label: 'Mini Curso Tráfego',
    trilhas: {
      trafego,
    },
  },
}
