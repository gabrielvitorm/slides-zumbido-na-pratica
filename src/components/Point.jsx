export default function Point({ tag, title, text }) {
  return (
    <div className="col">
      <div className="tag">{tag}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}
