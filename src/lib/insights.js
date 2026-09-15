import { accountInsights as account, promoAverages, promoContents, recentReels } from '../data/insights.js'

const sum = (list, pick) => list.reduce((total, item) => total + pick(item), 0)

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

// 반응 = 좋아요 + 댓글 + 저장 + 공유
const interactionsOf = (r) => r.likes + r.comments + r.saves + r.shares

// 비율은 콘텐츠 합산 기준 (전체 반응 ÷ 전체 도달)
const engagementRate = (list) => sum(list, interactionsOf) / sum(list, (r) => r.reach)

// 콘텐츠별 참여율의 단순 평균 (콘텐츠 1건당 평균 성과)
const simpleEngagementRate = (list) => sum(list, (r) => interactionsOf(r) / r.reach) / list.length

function computePromo(organicSimpleRate) {
  const rates = promoContents.map((c) => c.engagementRate)
  const promoRate = sum(rates, (r) => r) / rates.length
  return {
    promoContents,
    promoContentCount: promoContents.length,
    promoRate,
    promoRateMin: Math.min(...rates),
    promoRateMax: Math.max(...rates),
    promoAverages,
    organicSimpleRate,
    promoGapPoint: promoRate - organicSimpleRate,
  }
}

function computeInsights() {
  const reels = recentReels
  const totalReach = sum(reels, (r) => r.reach)
  const twiceFollowers = account.followers * 2

  const promo = reels.filter((r) => r.promo)
  const organic = reels.filter((r) => !r.promo)
  const organicRate = engagementRate(organic)

  const reachMean = totalReach / reels.length
  const reachMedian = median(reels.map((r) => r.reach))

  return {
    reelCount: reels.length,
    promoCount: promo.length,
    followers: account.followers,

    reachMean,
    reachMedian,
    reachMax: Math.max(...reels.map((r) => r.reach)),
    reachMeanMultiple: reachMean / account.followers,
    reachMedianMultiple: reachMedian / account.followers,
    reelsAboveTwiceFollowers: reels.filter((r) => r.reach >= twiceFollowers).length,

    viewsMean: sum(reels, (r) => r.views) / reels.length,
    viewsMedian: median(reels.map((r) => r.views)),
    viewsMax: Math.max(...reels.map((r) => r.views)),

    interactions: sum(reels, interactionsOf),
    engagementRate: engagementRate(reels),
    saveRate: sum(reels, (r) => r.saves) / totalReach,
    saveRateMax: Math.max(...reels.map((r) => r.saves / r.reach)),
    shareRate: sum(reels, (r) => r.shares) / totalReach,
    shareRateMax: Math.max(...reels.map((r) => r.shares / r.reach)),
    commentRate: sum(reels, (r) => r.comments) / totalReach,
    commentMax: Math.max(...reels.map((r) => r.comments)),

    organicRate,
    organicCount: organic.length,

    // 홍보 콘텐츠는 단순 평균이므로, 일반 콘텐츠도 같은 방식(단순 평균)으로 비교합니다.
    ...computePromo(simpleEngagementRate(organic)),

    accountViews: account.views,
    reachedAccounts: account.reachedAccounts,
    accountInteractions: account.interactions,
    nonFollowerViewShare: account.nonFollowerViewShare,
    nonFollowerInteractionShare: account.nonFollowerInteractionShare,
    profileVisits: account.profileVisits,
    profileVisitRate: account.profileVisits / account.reachedAccounts,
    linkTaps: account.linkTaps,
    linkPerVisitRate: account.linkTaps / account.profileVisits,
    linkPerReachRate: account.linkTaps / account.reachedAccounts,
  }
}

export const insights = computeInsights()

export const pct = (value, digits = 2) => `${(value * 100).toFixed(digits)}%`
export const num = (value) => Math.round(value).toLocaleString('ko-KR')
export const approx = (value, unit = 100) => (Math.round(value / unit) * unit).toLocaleString('ko-KR')
export const man = (value) => `${(value / 10000).toLocaleString('ko-KR', { maximumFractionDigits: 1 })}만`
