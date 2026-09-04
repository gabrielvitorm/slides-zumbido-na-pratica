// Conteúdo de todas as aulas do curso.
// Para adicionar/editar uma aula, mexa só neste arquivo — os componentes de slide
// (src/components/*) cuidam do layout automaticamente.

function divider(numRaw, title) {
  const num = String(numRaw).padStart(2, '0')
  return { type: 'divider', num, tag: `// aula ${numRaw}`, title }
}

function agendaSlide(items, active) {
  return { type: 'agenda', tag: '// nesta aula', items, active }
}

// Aula "não-técnica": divider -> agenda -> (point -> agenda destacando o próximo) x N
function nonTechLesson(numRaw, title, points) {
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
  return slides
}

// Aula "técnica": divider -> agenda -> 1 slide `tecnica` (ou `point`) por bloco
function techLesson(numRaw, title, blocks) {
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
  return slides
}

const cover = {
  type: 'cover',
  kicker: '// bônus do curso',
  title: 'Tráfego pago para profissionais de zumbido',
  sub: 'Um minicurso direto ao ponto para fonoaudiólogos, otorrinos, médicos e demais profissionais que tratam zumbido e querem sair do zero rodando sua primeira campanha.',
  node: { top: '10', bottom: 'aulas' },
}

const aula1 = nonTechLesson(1, 'O que é tráfego pago', [
  {
    title: 'O que é tráfego pago',
    text: 'É pagar para sua mensagem, post ou anúncio aparecer para quem você escolhe — em vez de depender só do algoritmo mostrar para quem já te segue.',
  },
  {
    title: 'Como funciona na prática',
    text: 'Você escolhe quem vê — localização, idade, interesses — e paga por esse alcance direcionado. É diferente de só postar e torcer para o algoritmo entregar para alguém interessado.',
  },
  {
    title: 'Onde isso se aplica na sua área',
    text: 'Pode ser para ganhar seguidor, gerar mensagem no WhatsApp ou vender direto. Aqui, o foco principal é gerar conversa para agendar consulta ou avaliação.',
  },
])

const aula2 = nonTechLesson(2, 'Orgânico x Pago', [
  {
    title: 'Papel do orgânico',
    text: 'Constrói confiança e autoridade com quem já te conhece — relacionamento de longo prazo.',
  },
  {
    title: 'Papel do pago',
    text: 'Alcança rápido quem ainda não te conhece — mas sem conteúdo bom por trás, a pessoa clica, olha o perfil fraco e não converte.',
  },
  {
    title: 'Por que os dois precisam andar juntos',
    text: 'Orgânico "esquenta" a audiência, pago acelera alcance. O post que já performou bem organicamente costuma ser o melhor material para virar anúncio depois.',
  },
])

const aula3 = nonTechLesson(3, 'Alinhando expectativas', [
  {
    title: 'Tráfego pago não é milagre',
    text: 'Ninguém liga um anúncio hoje e enche a agenda amanhã — o processo é de teste, ajuste e consistência.',
  },
  {
    title: 'Como o algoritmo aprende',
    text: 'O Meta precisa de um tempo mínimo (alguns dias) rodando para "aprender" quem converte melhor. Desligar ou mudar a campanha cedo demais reinicia esse aprendizado — é o erro nº 1 de quem está começando.',
  },
  {
    title: 'O que gera resultado de verdade',
    text: 'Manter o anúncio rodando, olhar a métrica com calma, ajustar aos poucos. A expectativa certa é: testar, aprender e melhorar toda semana.',
  },
])

const aula4 = techLesson(4, 'Criando a estrutura completa', [
  {
    title: 'Business Manager (BM)',
    steps: [
      'Acesse business.facebook.com.',
      'Clique em "Criar conta".',
      'Preencha o nome do negócio, seu nome e um e-mail profissional.',
      'Confirme o e-mail para ativar a conta.',
    ],
  },
  {
    title: 'Página do Facebook + Integrações',
    steps: [
      'Em "Configurações do negócio" → "Páginas".',
      'Adicione ou reivindique a página existente, ou crie uma nova (categoria "Serviço médico" ou equivalente).',
      'Em "Contas do Instagram", conecte o perfil profissional.',
      'Confirme o vínculo entre Instagram e Facebook (Configurações da página → Contas vinculadas).',
    ],
  },
  {
    title: 'Conta de Anúncios',
    steps: [
      '"Configurações do negócio" → "Contas" → "Contas de anúncios".',
      'Crie uma nova conta de anúncios.',
      'Defina nome, fuso horário e moeda (não muda depois).',
      'Vincule essa conta à página do Bloco 2.',
    ],
  },
  {
    title: 'Forma de Pagamento',
    steps: [
      '"Configurações de pagamento" na conta de anúncios.',
      'Adicione um cartão de crédito.',
      'Defina um limite de gasto, se quiser um teto de segurança.',
    ],
  },
  {
    title: 'Pixel',
    steps: [
      '"Origens de dados" → "Pixels" → "Criar novo pixel".',
      'Nomeie o pixel (ex: nome da clínica).',
      'Se já tiver site ou página de captação, o pixel vai nele. Se não tiver ainda, isso não trava o resto do curso.',
    ],
  },
])

const aula5 = techLesson(5, 'Primeira campanha: Impulsionar', [
  {
    title: 'Escolher o post',
    steps: [
      'Abra o Instagram ou o Meta Business Suite.',
      'Escolha um post com boa performance orgânica.',
      'Veja as estatísticas do post para confirmar o desempenho.',
    ],
  },
  {
    title: 'Objetivo e público',
    steps: [
      'Toque em "Impulsionar publicação".',
      'Escolha o objetivo: Mensagens (recomendado) ou Visitas ao perfil.',
      'Defina o público: localização (raio da clínica) e faixa etária.',
    ],
  },
  {
    title: 'Orçamento e publicar',
    steps: [
      'Defina orçamento diário e duração (sugestão: 3-4 dias sem mexer).',
      'Revise as configurações.',
      'Publique.',
    ],
    note: 'A segmentação aqui é mais limitada que no Gerenciador de Anúncios — é a versão simplificada, serve bem para começar.',
  },
])

const aula6 = techLesson(6, 'Primeira campanha de Mensagens (WhatsApp)', [
  {
    title: 'Criar e nomear',
    steps: [
      'Gerenciador de Anúncios → "Criar".',
      'Escolha o objetivo "Mensagens".',
      'Nomeie a campanha (ex: "Captação_Mensagens_[mês/ano]").',
    ],
  },
  {
    title: 'Público',
    steps: [
      'Escolha o destino da conversa: WhatsApp.',
      'Defina localização e idade.',
      'Adicione interesses ligados à especialidade (ex: "zumbido", "saúde auditiva").',
    ],
  },
  {
    title: 'Orçamento',
    steps: [
      'Defina o orçamento diário.',
      'Lembrete: valor sustentável por 3-4 dias sem mexer (ver Aula 7).',
    ],
    shotBox: false,
  },
  {
    title: 'Criativo e anúncio',
    steps: [
      'Selecione o criativo (reaproveite um post que já performou bem).',
      'Escreva o texto com CTA claro (ex: "Manda um oi e agende sua avaliação").',
    ],
  },
  {
    title: 'Publicar',
    steps: [
      'Revise tudo.',
      'Publique.',
      'Não mexa em nada por pelo menos 2-3 dias — deixa o algoritmo aprender.',
    ],
  },
])

const aula7 = nonTechLesson(7, 'Orçamento', [
  {
    title: 'Não existe valor mágico',
    text: 'Depende da sua região, especialidade e do que você consegue sustentar por alguns dias sem desespero.',
  },
  {
    title: 'Regra do tempo mínimo',
    text: 'Defina um valor que consiga manter rodando por 3-4 dias sem mexer, mesmo que o resultado das primeiras horas pareça ruim. Trocar o valor todo dia reinicia o aprendizado.',
  },
  {
    title: 'Ciclos de teste',
    text: 'Rode um valor fixo por uma semana, avalie, só depois decida aumentar ou trocar algo. Comece com poucas campanhas ativas ao mesmo tempo.',
  },
])

const aula8 = techLesson(8, 'Métricas e organização da BM', [
  {
    title: 'Quais métricas importam',
    steps: [
      'Ignore alcance e cliques como métrica principal.',
      'Foque em custo por mensagem iniciada (custo por resultado).',
    ],
  },
  {
    title: 'Configurar colunas',
    steps: [
      'No Gerenciador de Anúncios, personalize as colunas visíveis.',
      'Deixe o custo por resultado em destaque.',
      'Aguarde no mínimo 3-4 dias de dado antes de concluir algo.',
    ],
  },
  {
    title: 'Nomenclatura de campanha',
    steps: [
      'Use o padrão: objetivo + público + data.',
      'Exemplo: "Mensagens_Zumbido_Regiao_Jan25".',
    ],
  },
  {
    title: 'Organização e histórico',
    steps: [
      'Pause ou duplique campanhas de forma organizada.',
      'Consulte o histórico para comparar performance ao longo do tempo.',
    ],
  },
])

const aula9 = techLesson(9, 'WhatsApp Business + importância do CRM', [
  {
    title: 'Perfil comercial',
    steps: [
      'Abra o WhatsApp Business.',
      'Configure nome, categoria, endereço e horário de atendimento.',
    ],
  },
  {
    title: 'Automações e etiquetas',
    steps: [
      'Configure a mensagem de saudação automática.',
      'Configure respostas rápidas (valores, endereço, convênios).',
      'Use as etiquetas nativas: "Novo lead", "Agendado", "Não respondeu".',
    ],
  },
  {
    type: 'point',
    title: 'Por que ter um CRM',
    text: 'WhatsApp sozinho não mostra o histórico completo de conversão. Um CRM — mesmo simples, tipo planilha organizada — mostra quantos leads entraram, responderam, agendaram e faltaram. Isso conecta com a Aula 8: sem isso, você sabe o custo por mensagem, mas não o custo por paciente.',
  },
])

const aula10 = nonTechLesson(10, 'Considerações finais', [
  {
    title: 'Recapitulando',
    text: 'Conceito → estrutura → impulsionar → campanha de mensagens → orçamento → métrica → organização → WhatsApp + CRM.',
  },
  {
    title: 'O que gera resultado',
    text: 'Consistência, não sorte na primeira semana.',
  },
  {
    title: 'Próximos passos',
    text: 'Colocar em prática nos próximos dias. Depois do básico, o próximo nível é escalar o que funciona, testar públicos e criativos novos.',
  },
])

export function buildDeck() {
  return [
    cover,
    ...aula1,
    ...aula2,
    ...aula3,
    ...aula4,
    ...aula5,
    ...aula6,
    ...aula7,
    ...aula8,
    ...aula9,
    ...aula10,
  ]
}
