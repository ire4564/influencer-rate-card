import { useCopy } from '../../i18n/index.jsx'
import SectionHead from '../SectionHead.jsx'

export default function Process() {
  const { copy } = useCopy()
  const t = copy.process

  return (
    <section className="section" id="process">
      <div className="container">
        <SectionHead index={6} eyebrow={t.eyebrow} title={t.title} desc={t.desc} />
        <dl className="lead-times">
          {t.leadTimes.map((lead) => (
            <div key={lead.label} className="lead-times__item">
              <dt>{lead.label}</dt>
              <dd>{lead.value}</dd>
            </div>
          ))}
        </dl>
        <ol className="steps">
          {t.steps.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step__num">{t.stepLabel(index + 1)}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__desc">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
