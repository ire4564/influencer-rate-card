import { pricingBasis } from '../../data/profile.js'
import { insights as i, pct } from '../../lib/insights.js'

export default function Rationale() {
  const reasons = [
    `중앙 도달이 팔로워 수의 약 ${i.reachMedianMultiple.toFixed(1)}배입니다.`,
    `최근 ${i.reelCount}개 릴스 중 ${i.reelsAboveTwiceFollowers}개가 팔로워 수의 2배 이상 도달했습니다.`,
    `최근 90일 조회수의 ${pct(i.nonFollowerViewShare, 0)}가 비팔로워에게서 발생했습니다.`,
    `홍보 콘텐츠 ${i.promoContentCount}건 평균 참여율 ${pct(i.promoRate)}로, 일반 콘텐츠(${pct(i.organicSimpleRate)})와 비슷한 반응을 유지합니다.`,
    '성과만으로 단가를 일괄 인상하지 않고, 촬영 · 편집 범위와 제작 난이도에 따라 차등 적용합니다.',
    '계정 주제와 인테리어 · 생활용품 광고의 적합도가 높습니다.',
  ]

  return (
    <section className="rationale">
      <div className="container rationale__inner">
        <div>
          <p className="eyebrow">Pricing Basis</p>
          <h2 className="rationale__title">단가 산정 근거</h2>
          <p className="rationale__text">{pricingBasis}</p>
        </div>
        <ol className="reasons">
          {reasons.map((reason, idx) => (
            <li key={reason}>
              <span>{idx + 1}</span>
              {reason}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
