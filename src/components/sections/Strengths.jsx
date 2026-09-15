import { useCopy } from '../../i18n/index.jsx'
import SectionHead from '../SectionHead.jsx'

export default function Strengths() {
  const { copy } = useCopy()
  const t = copy.strengths

  return (
    <section className="section" id="strengths">
      <div className="container">
        <SectionHead index={3} eyebrow={t.eyebrow} title={t.title} />
        <blockquote className="pull-quote">{t.quote}</blockquote>
        <ol className="strength-list">
          {t.items.map((item) => (
            <li key={item.title} className="strength">
              <span className="strength__stat">{item.stat}</span>
              <div>
                <h3 className="strength__title">{item.title}</h3>
                <p className="strength__desc">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
