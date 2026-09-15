import { useCopy } from '../../i18n/index.jsx'
import SectionHead from '../SectionHead.jsx'

export default function Audience() {
  const { copy } = useCopy()
  const t = copy.audience

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead index={1} eyebrow={t.eyebrow} title={t.title} desc={t.desc} />
        <ul className="target-grid">
          {t.targets.map((target) => (
            <li key={target.title} className="target">
              <h3 className="target__title">{target.title}</h3>
              <p className="target__desc">{target.desc}</p>
            </li>
          ))}
        </ul>
        <dl className="info-row">
          {t.info.map((item) => (
            <div key={item.label} className="info-row__item">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
