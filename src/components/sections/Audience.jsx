import { profile, targets } from '../../data/profile.js'
import SectionHead from '../SectionHead.jsx'

export default function Audience() {
  const info = [
    { label: '주요 카테고리', value: profile.categories.join(' · ') },
    { label: '주요 팔로워', value: profile.audience },
    {
      label: '평균 게시 빈도',
      value: `${profile.postingFrequency} (${profile.postingFormats})`,
    },
  ]
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead
          index={1}
          eyebrow="Audience"
          title="이런 분들이 보고 있어요"
          desc="웨딩 준비부터 신혼 집 꾸미기까지, 생활 공간에 관심이 많은 2030 타깃에게 닿습니다."
        />
        <ul className="target-grid">
          {targets.map((t) => (
            <li key={t.title} className="target">
              <h3 className="target__title">{t.title}</h3>
              <p className="target__desc">{t.desc}</p>
            </li>
          ))}
        </ul>
        <dl className="info-row">
          {info.map((item) => (
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
