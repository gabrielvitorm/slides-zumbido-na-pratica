export default function Divider({ num, tag, title }) {
  return (
    <div className="col">
      <div className="num">{num}</div>
      <div className="tag">{tag}</div>
      <h2>{title}</h2>
    </div>
  )
}
