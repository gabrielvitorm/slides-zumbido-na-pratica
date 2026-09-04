// Registro central de cursos e trilhas.
// Para adicionar um curso/trilha novo:
//   1. crie src/content/courses/<curso-slug>/<trilha-slug>.js (veja trafego.js como modelo)
//   2. importe e registre abaixo — a chave usada em `trilhas` vira o segmento da URL
//      (ex: /zumbido-na-pratica/trafego/...)

import trafego from './courses/zumbido-na-pratica/trafego.js'

export const courses = {
  'zumbido-na-pratica': {
    label: 'Zumbido na Prática',
    trilhas: {
      trafego,
    },
  },
}

export const defaultPath = '/zumbido-na-pratica/trafego'
