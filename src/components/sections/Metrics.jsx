import { useCopy } from '../../i18n/index.jsx'
import SectionHead from '../SectionHead.jsx'

function MetricCard({ label, value, unit, sub, tone }) {
  return (
    <div className={`metric${tone ? ` metric--${tone}` : ''}`}>
      <span className="metric__label">{label}</span>
      <span className="metric__value">
        {value}
        {unit && <small>{unit}</small>}
      </span>
      {sub && <span className="metric__sub">{sub}</span>}
    </div>
  )
}

export default function Metrics() {
  const { copy } = useCopy()
  const t = copy.metrics

  return (
    <section className="section section--tinted" id="metrics">
      <div className="container">
        <SectionHead index={2} eyebrow={t.eyebrow} title={t.title} desc={t.desc} />

        <p className="metric-summary">{t.summary}</p>

        <div className="metric-block">
          <h3 className="metric-block__title">
            {t.reelsLabel}
            {t.reelsNote && <span>{t.reelsNote}</span>}
          </h3>
          <div className="metric-grid">
            {t.reelCards.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>

        <div className="metric-block">
          <h3 className="metric-block__title">{t.accountLabel}</h3>
          <div className="metric-grid metric-grid--five">
            {t.accountCards.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>

        <div className="promo-block">
          <div className="promo-block__intro">
            <p className="eyebrow">{t.promo.eyebrow}</p>
            <h3>{t.promo.title}</h3>
            <p>{t.promo.body}</p>
          </div>

          <dl className="promo-block__compare">
            {t.promo.compare.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <dl className="promo-stats">
            {t.promo.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="footnotes">
          {t.footnotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
