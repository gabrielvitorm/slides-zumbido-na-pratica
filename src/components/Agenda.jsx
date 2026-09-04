export default function Agenda({ tag, items, active }) {
  return (
    <div className="col">
      <div className="tag">{tag}</div>
      <ol>
        {items.map((item, i) => (
          <li key={i} className={i === active ? 'current' : ''}>
            {item}
          </li>
        ))}
      </ol>
    </div>
  )
}
