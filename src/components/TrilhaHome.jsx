import { Link, useParams } from 'react-router-dom'
import { courses } from '../content/registry.js'
import NotFound from './NotFound.jsx'

export default function TrilhaHome() {
  const { curso, trilha: trilhaSlug } = useParams()
  const cursoData = courses[curso]
  const trilha = cursoData?.trilhas?.[trilhaSlug]

  if (!trilha) {
    return <NotFound message="Curso ou trilha não encontrada." />
  }

  return (
    <div className="trilha-home">
      <div className="trilha-home-header">
        <div className="kicker">{trilha.cover.kicker}</div>
        <h1>{trilha.cover.title}</h1>
        <p className="sub">{trilha.cover.sub}</p>
      </div>

      <ol className="trilha-home-list">
        {trilha.lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link to={`/${curso}/${trilhaSlug}/${lesson.slug}`}>
              <span className="mono">{String(lesson.num).padStart(2, '0')}</span>
              <span>{lesson.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
