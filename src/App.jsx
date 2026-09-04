import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buildDeck } from './content/aulas.js'
import Slide from './components/Slide.jsx'

export default function App() {
  const slides = useMemo(() => buildDeck(), [])
  const total = slides.length
  const [idx, setIdx] = useState(0)
  const stageRef = useRef(null)

  const next = useCallback(() => {
    setIdx((i) => Math.min(i + 1, total - 1))
  }, [total])

  const prev = useCallback(() => {
    setIdx((i) => Math.max(i - 1, 0))
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  useEffect(() => {
    function fitStage() {
      const stage = stageRef.current
      if (!stage) return
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
      stage.style.transform = `scale(${scale})`
    }
    fitStage()
    window.addEventListener('resize', fitStage)
    return () => window.removeEventListener('resize', fitStage)
  }, [])

  return (
    <div id="viewport">
      <div id="stage" ref={stageRef}>
        <div className="gridlines" />
        <div id="progress" style={{ width: `${((idx + 1) / total) * 100}%` }} />
        <div id="deck">
          {slides.map((slide, i) => (
            <Slide
              key={i}
              slide={slide}
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
