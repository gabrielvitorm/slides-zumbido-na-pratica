import { Link } from 'react-router-dom'

export default function NotFound({ message, to = '/', label = 'Voltar ao início' }) {
  return (
    <div className="not-found">
      <p>{message}</p>
      <Link to={to}>{label}</Link>
    </div>
  )
}
