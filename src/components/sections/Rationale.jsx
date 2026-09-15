import { useCopy } from '../../i18n/index.jsx'

export default function Rationale() {
  const { copy } = useCopy()
  const t = copy.rationale

  return (
    <section className="rationale">
      <div className="container rationale__inner">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="rationale__title">{t.title}</h2>
          <p className="rationale__text">{t.text}</p>
        </div>
        <ol className="reasons">
          {t.reasons.map((reason, index) => (
            <li key={reason}>
              <span>{index + 1}</span>
              {reason}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
