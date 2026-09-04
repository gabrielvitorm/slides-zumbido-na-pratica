export default function Cover({ kicker, title, sub, node }) {
  return (
    <>
      <div className="col">
        <div className="kicker">{kicker}</div>
        <h1>{title}</h1>
        <p className="sub">{sub}</p>
      </div>
      <div className="node">
        <span>
          {node.top}
          <br />
          {node.bottom}
        </span>
      </div>
    </>
  )
}
