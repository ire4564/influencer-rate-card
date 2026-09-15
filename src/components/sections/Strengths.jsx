import { insights as i, pct } from '../../lib/insights.js'
import SectionHead from '../SectionHead.jsx'

export default function Strengths() {
  const items = [
    {
      title: '팔로워 밖으로 넓어지는 도달',
      stat: `${i.reelsAboveTwiceFollowers} / ${i.reelCount}`,
      desc: `최근 ${i.reelCount}개 릴스 중 ${i.reelsAboveTwiceFollowers}개가 팔로워 수의 2배 이상 도달했습니다.`,
    },
    {
      title: '광고 표기 후에도 유지되는 반응',
      stat: pct(i.promoRate),
      desc: `홍보 콘텐츠 ${i.promoContentCount}건 평균 참여율로, 일반 콘텐츠와 비슷한 반응을 유지합니다.`,
    },
    {
      title: '구매 고려로 이어지는 저장',
      stat: pct(i.promoAverages.saveRate),
      desc: '홍보 콘텐츠 평균 저장률이며, 정보성이 높은 콘텐츠에서 상대적으로 높은 저장 반응이 나타났습니다.',
    },
    {
      title: '생활 공간 속 자연스러운 노출',
      stat: 'Real Home',
      desc: '실제 사용 장면을 담아 광고보다 일상에 가까운 톤으로 제품을 보여줍니다.',
    },
  ]

  return (
    <section className="section" id="strengths">
      <div className="container">
        <SectionHead index={3} eyebrow="Strengths" title="콘텐츠 강점" />
        <blockquote className="pull-quote">
          새로운 잠재고객에게 닿고, 광고 표기 후에도 저장 · 댓글 반응이 이어지는 콘텐츠를 만듭니다.
          <br />
          인테리어 · 생활용품 제품을 실제 생활 공간에서 소개하는 캠페인에 적합합니다.
        </blockquote>
        <ol className="strength-list">
          {items.map((s) => (
            <li key={s.title} className="strength">
              <span className="strength__stat">{s.stat}</span>
              <div>
                <h3 className="strength__title">{s.title}</h3>
                <p className="strength__desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
