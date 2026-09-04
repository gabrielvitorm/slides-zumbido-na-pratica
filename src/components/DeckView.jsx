import { useEffect, useRef } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { courses } from '../content/registry.js'
import { resolveScope, scopePath } from '../lib/deck.js'
import Slide from './Slide.jsx'

export default function DeckView() {
  const { curso, trilha: trilhaSlug, aula, slide } = useParams()
  const navigate = useNavigate()
  const stageRef = useRef(null)

  const trilha = courses[curso]?.trilhas?.[trilhaSlug]
  const scope = resolveScope(trilha, aula)
  const base = aula ? `/${curso}/${trilhaSlug}/${aula}` : `/${curso}/${trilhaSlug}`

  const total = scope ? scope.slides.length : 0
  const rawIdx = slide ? parseInt(slide, 10) - 1 : 0
  const idx = scope && rawIdx >= 0 && rawIdx < total ? rawIdx : -1

  function goTo(i) {
    if (i < 0 || i >= total) return
    navigate(scopePath(base, i))
  }
  const next = () => goTo(idx + 1)
  const prev = () => goTo(idx - 1)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, total, base])

  useEffect(() => {
    function fitStage() {
      const stage = stageRef.current
      if (!stage) return
      const scaleValue = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
      stage.style.transform = `scale(${scaleValue})`
    }
    fitStage()
    window.addEventListener('resize', fitStage)
    return () => window.removeEventListener('resize', fitStage)
  }, [])

  if (!trilha) {
    return (
      <div className="not-found">
        <p>Curso ou trilha não encontrada.</p>
        <Link to="/">Voltar ao início</Link>
      </div>
    )
  }

  if (!scope) {
    return (
      <div className="not-found">
        <p>Aula não encontrada.</p>
        <Link to={`/${curso}/${trilhaSlug}`}>Voltar para a capa</Link>
      </div>
    )
  }

  if (idx === -1) {
    return <Navigate to={base} replace />
  }

  return (
    <div id="viewport">
      <div id="stage" ref={stageRef}>
        <div className="gridlines" />
        <div id="progress" style={{ width: `${((idx + 1) / total) * 100}%` }} />
        <div id="deck">
          {scope.slides.map((s, i) => (
            <Slide
              key={i}
              slide={s}
              state={i === idx ? 'active' : i < idx ? 'prev' : ''}
            />
          ))}
        </div>

        <div className="arrow-btn" id="btn-prev" onClick={prev}>‹</div>
        <div className="arrow-btn" id="btn-next" onClick={next}>›</div>
        <div className="navzone" id="zone-prev" onClick={prev} />
        <div className="navzone" id="zone-next" onClick={next} />
        <div id="counter">
          <b>{String(idx + 1).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}
        </div>
      </div>
    </div>
  )
}
