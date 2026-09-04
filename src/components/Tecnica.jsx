export default function Tecnica({ tag, title, steps, shotBox = true, note }) {
  return (
    <div className={`grid${shotBox ? '' : ' single'}`}>
      <div>
        <div className="tag">{tag}</div>
        <h3>{title}</h3>
        <ol>
          {steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        {note && <p className="tecnica-note">{note}</p>}
      </div>
      {shotBox && (
        <div className="shot-box">
          <svg width="44" height="32" viewBox="0 0 34 24" fill="none" stroke="#8C9BC4" strokeWidth="1.4">
            <rect x="1" y="1" width="32" height="22" rx="3" />
            <circle cx="17" cy="12" r="5" />
          </svg>
          <span className="mono">espaço para print de tela</span>
        </div>
      )}
    </div>
  )
}
