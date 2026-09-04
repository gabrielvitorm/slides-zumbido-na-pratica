import Cover from './Cover.jsx'
import Divider from './Divider.jsx'
import Agenda from './Agenda.jsx'
import Point from './Point.jsx'
import Tecnica from './Tecnica.jsx'

const TYPES = {
  cover: Cover,
  divider: Divider,
  agenda: Agenda,
  point: Point,
  tecnica: Tecnica,
}

export default function Slide({ slide, state }) {
  const Component = TYPES[slide.type]
  if (!Component) return null
  return (
    <section className={`slide ${slide.type} ${state}`.trim()}>
      <Component {...slide} />
    </section>
  )
}
