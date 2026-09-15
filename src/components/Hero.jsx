import { Fragment } from 'react'
import { profile } from '../data/profile.js'
import { approx, insights, num, pct } from '../lib/insights.js'
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
  const days = daysSince(profile.openedAt)
  const months = Math.floor(days / 30)
  const [y, m, d] = profile.openedAt.split('-')

  const stats = [
    { label: '팔로워', value: num(insights.followers), unit: '명' },
    { label: '비팔로워 조회', value: pct(insights.nonFollowerViewShare, 0), unit: '' },
    { label: '릴스 평균 도달', value: approx(insights.reachMean), unit: '명' },
    { label: '릴스 중앙 도달', value: approx(insights.reachMedian), unit: '명' },
  ]

  return (
    <header className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__at">@</span>
            {profile.handle}
          </h1>
          <p className="hero__lead">
            {profile.introLines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>
          <p className="hero__sub">{profile.introSub}</p>
          <HeroActions className="hero__actions--desktop" />
        </div>

        <aside className="hero__card" aria-label="계정 기본 정보">
          <div className="hero__arch">
            <HomeSlider />
            <div className="hero__arch-caption" aria-hidden="true">
              <span className="hero__arch-sub">wood · home café · newlywed</span>
            </div>
          </div>
          <dl className="hero__stats">
            {stats.map((s) => (
              <div key={s.label} className="hero__stat">
                <dt>{s.label}</dt>
                <dd>
                  {s.value}
                  {s.unit && <small>{s.unit}</small>}
                </dd>
              </div>
            ))}
          </dl>
          <p className="hero__meta">
            {y}.{m}.{d} 개설 · 운영 {days}일째(약 {months}개월) · 게시물 {profile.posts}개 ·{' '}
            {profile.postingFrequency}
          </p>
        </aside>

        <HeroActions className="hero__actions--mobile" />
      </div>
    </header>
  )
}
