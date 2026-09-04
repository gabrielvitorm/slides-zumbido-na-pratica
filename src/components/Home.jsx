import { Link } from 'react-router-dom'
import { courses } from '../content/registry.js'

export default function Home() {
  const entries = Object.entries(courses)

  return (
    <div className="home">
      <div className="home-header">
        <div className="kicker">// cursos</div>
        <h1>Zumbido na Prática</h1>
      </div>

      <div className="home-grid">
        {entries.map(([cursoSlug, curso]) => {
          const trilhaSlugs = Object.keys(curso.trilhas)
          const available = trilhaSlugs.length > 0

          const card = (
            <>
              <h2>{curso.label}</h2>
              {available ? (
                <span className="home-card-cta">Ver aulas →</span>
              ) : (
                <span className="home-card-badge">em breve</span>
              )}
            </>
          )

          return available ? (
            <Link
              key={cursoSlug}
              to={`/${cursoSlug}/${trilhaSlugs[0]}`}
              className="home-card"
            >
              {card}
            </Link>
          ) : (
            <div key={cursoSlug} className="home-card home-card-disabled">
              {card}
            </div>
          )
        })}
      </div>
    </div>
  )
}
