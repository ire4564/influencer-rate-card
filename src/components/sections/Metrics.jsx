import { insightsMeta } from '../../data/insights.js'
import { approx, insights as i, man, num, pct } from '../../lib/insights.js'
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
  const [y, m, d] = insightsMeta.collectedAt.split('-')

  const reelMetrics = [
    {
      label: '평균 도달',
      value: `약 ${approx(i.reachMean)}`,
      unit: '명',
      sub: `팔로워 수의 약 ${i.reachMeanMultiple.toFixed(1)}배`,
      tone: 'strong',
    },
    {
      label: '중앙 도달',
      value: `약 ${approx(i.reachMedian)}`,
      unit: '명',
      sub: `팔로워 수의 약 ${i.reachMedianMultiple.toFixed(1)}배 · 보수적 기대치`,
      tone: 'strong',
    },
    {
      label: '평균 조회수',
      value: num(i.viewsMean),
      unit: '회',
      sub: `중앙 ${num(i.viewsMedian)}회 · 최고 ${num(i.viewsMax)}회`,
    },
    {
      label: '평균 참여율',
      value: pct(i.engagementRate),
      sub: `도달 대비 좋아요 · 댓글 · 저장 · 공유 ${num(i.interactions)}건`,
    },
    {
      label: '공유율',
      value: pct(i.shareRate),
      sub: `최고 ${pct(i.shareRateMax)}`,
    },
    {
      label: '저장률',
      value: pct(i.saveRate),
      sub: `최고 ${pct(i.saveRateMax)}`,
    },
  ]

  const accountMetrics = [
    { label: '팔로워', value: num(i.followers), unit: '명' },
    {
      label: '비팔로워 조회 비중',
      value: pct(i.nonFollowerViewShare, 0),
      sub: `전체 조회수 ${man(i.accountViews)}회`,
      tone: 'strong',
    },
    {
      label: '비팔로워 반응 비중',
      value: pct(i.nonFollowerInteractionShare, 1),
      sub: `전체 반응 ${man(i.accountInteractions)}건`,
    },
    {
      label: '프로필 방문률',
      value: pct(i.profileVisitRate),
      sub: `도달 ${man(i.reachedAccounts)}명 중 ${num(i.profileVisits)}회 방문`,
    },
    {
      label: '링크 클릭률',
      value: pct(i.linkPerVisitRate),
      sub: `프로필 방문 대비 · ${num(i.linkTaps)}회 클릭`,
    },
  ]

  return (
    <section className="section section--tinted" id="metrics">
      <div className="container">
        <SectionHead
          index={2}
          eyebrow="Performance"
          title="핵심 계정 지표"
          desc={`Instagram 인사이트 기준 · ${y}.${m}.${d} 수집`}
        />

        <p className="metric-summary">
          최근 {i.reelCount}개 릴스 기준 평균 도달 약 {approx(i.reachMean)}명, 중앙 도달 약{' '}
          {approx(i.reachMedian)}명을 기록했습니다. 최근 90일 계정 전체 조회수의{' '}
          <strong>{pct(i.nonFollowerViewShare, 0)}가 비팔로워</strong>에게서 발생해 신규 잠재고객 도달력이
          확인됩니다.
        </p>

        <div className="metric-block">
          <h3 className="metric-block__title">
            {insightsMeta.reelsLabel}
            {i.promoCount > 0 && <span>홍보 콘텐츠 {i.promoCount}개 포함</span>}
          </h3>
          <div className="metric-grid">
            {reelMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>

        <div className="metric-block">
          <h3 className="metric-block__title">{insightsMeta.accountLabel}</h3>
          <div className="metric-grid metric-grid--five">
            {accountMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>

        <div className="promo-block">
          <div className="promo-block__intro">
            <p className="eyebrow">Sponsored Content</p>
            <h3>광고 표기 콘텐츠에서도 비슷한 반응이 유지돼요</h3>
            <p>
              최근 홍보 콘텐츠 {i.promoContentCount}건의 평균 참여율은 <strong>{pct(i.promoRate)}</strong>로,
              일반 콘텐츠 평균 {pct(i.organicSimpleRate)}와 유사한 수준을 유지하고 있습니다. 콘텐츠별 참여율은{' '}
              {pct(i.promoRateMin, 1)}~{pct(i.promoRateMax, 1)} 범위로 나타났으며, 정보성과 제품 활용도가 높은
              콘텐츠에서 저장 · 댓글 반응이 상대적으로 높았습니다.
            </p>
          </div>

          <dl className="promo-block__compare">
            <div>
              <dt>홍보 콘텐츠 {i.promoContentCount}건 평균</dt>
              <dd>{pct(i.promoRate)}</dd>
            </div>
            <div>
              <dt>일반 콘텐츠 {i.organicCount}건 평균</dt>
              <dd>{pct(i.organicSimpleRate)}</dd>
            </div>
          </dl>

          <dl className="promo-stats">
            {[
              {
                label: '평균 조회수',
                value: `${num(i.promoAverages.views)}회`,
              },
              {
                label: '평균 조회한 사람',
                value: `${num(i.promoAverages.reach)}명`,
              },
              { label: '좋아요율', value: pct(i.promoAverages.likeRate) },
              { label: '댓글률', value: pct(i.promoAverages.commentRate) },
              { label: '저장률', value: pct(i.promoAverages.saveRate) },
              { label: '공유율', value: pct(i.promoAverages.shareRate) },
              {
                label: '평균 시청시간',
                value: `${i.promoAverages.watchSeconds}초`,
              },
            ].map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="footnotes">
          <li>
            평균 도달에는 {num(i.reachMax)}명에게 도달한 바이럴 콘텐츠가 포함되어 있어, 일반적인 기대치는
            중앙값을 기준으로 보수적으로 산정합니다.
          </li>
          <li>
            참여율 · 저장률 · 공유율은 최근 {i.reelCount}개 릴스의 전체 반응을 전체 도달로 나눈 값입니다.
          </li>
          <li>콘텐츠별 링크 클릭 데이터는 제공되지 않아 링크 클릭률은 계정 전체 기준입니다.</li>
          <li>
            홍보 콘텐츠 지표는 {i.promoContentCount}건 각 비율의 단순 평균이며, 일반 콘텐츠 평균도 최근 릴스
            중 홍보 콘텐츠를 제외한 {i.organicCount}건의 단순 평균으로 같은 방식으로 비교했습니다.
          </li>
        </ul>
      </div>
    </section>
  )
}
