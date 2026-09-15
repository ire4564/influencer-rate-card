import { profile } from '../data/profile.js'
import { useCopy } from '../i18n/index.jsx'
import HeroActions from './HeroActions.jsx'
import HomeSlider from './HomeSlider.jsx'

// 개설일부터 오늘까지 일수 (개설 당일 = 1일째)
function daysSince(dateString) {
  const [y, m, d] = dateString.split('-').map(Number)
  const opened = new Date(y, m - 1, d)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.floor((today - opened) / 86_400_000) + 1
}

export default function Hero() {
  const { copy } = useCopy()
  const t = copy.hero
  const days = daysSince(profile.openedAt)
  const months = Math.floor(days / 30)

  return (
    <header className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__at">@</span>
            {profile.handle}
          </h1>
          <p className={`hero__lead${t.introFlowOnMobile ? ' hero__lead--flow' : ''}`}>
            {t.introLines.map((line) => (
              <span key={line} className="hero__lead-line">
                {line}
              </span>
            ))}
          </p>
          <p className="hero__sub">{t.introSub}</p>
          <HeroActions className="hero__actions--desktop" />
        </div>

        <aside className="hero__card" aria-label={t.cardLabel}>
          <div className="hero__arch">
            <HomeSlider />
            <div className="hero__arch-caption" aria-hidden="true">
              <span className="hero__arch-sub">{t.photoCaption}</span>
            </div>
          </div>
          <dl className="hero__stats">
            {t.stats.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <dt>{stat.label}</dt>
                <dd>
                  {stat.value}
                  {stat.unit && <small>{stat.unit}</small>}
                </dd>
              </div>
            ))}
          </dl>
          <p className="hero__meta">{t.meta({ days, months })}</p>
        </aside>

        <HeroActions className="hero__actions--mobile" />
      </div>
    </header>
  )
}
