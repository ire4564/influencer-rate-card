import { processSteps, productionLeadTime } from '../../data/profile.js'
import SectionHead from '../SectionHead.jsx'

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <SectionHead
          index={6}
          eyebrow="Process"
          title="진행 절차"
          desc="일반적으로 제품 수령 후 아래 기간의 제작 기간이 필요합니다."
        />
        <dl className="lead-times">
          {productionLeadTime.map((l) => (
            <div key={l.label} className="lead-times__item">
              <dt>{l.label}</dt>
              <dd>{l.value}</dd>
            </div>
          ))}
        </dl>
        <ol className="steps">
          {processSteps.map((s, idx) => (
            <li key={s.title} className="step">
              <span className="step__num">STEP {idx + 1}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__desc">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
