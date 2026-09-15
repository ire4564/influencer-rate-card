export default function SectionHead({ index, eyebrow, title, desc }) {
  return (
    <div className="section-head">
      <p className="eyebrow">
        {index && <span className="section-head__index">{String(index).padStart(2, '0')}</span>}
        {eyebrow}
      </p>
      <h2 className="section-head__title">{title}</h2>
      {desc && <p className="section-head__desc">{desc}</p>}
    </div>
  )
}
