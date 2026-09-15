// Instagram 인사이트 원본 데이터
// 출처: 「kimwood.zip 협찬 단가 산정용 인사이트 (최근 10개 릴스 + 계정 전체).xlsx」
// 새 인사이트를 받으면 이 파일의 숫자만 바꾸면 지표 · 근거 문구가 자동으로 다시 계산됩니다.

export const insightsMeta = {
  collectedAt: '2026-09-14',
  reelsLabel: '최근 10개 릴스',
  accountLabel: '계정 전체 · 최근 90일',
}

// 최근 10개 릴스 (1 = 최신)
// reach: 조회한 계정 수 · views: 조회수 · visits: 프로필 방문 · promo: 홍보(광고 표기) 콘텐츠
export const recentReels = [
  { no: 1, reach: 62000, views: 68000, likes: 331, comments: 5, saves: 414, shares: 1319, visits: 19 },
  { no: 2, reach: 564, views: 919, likes: 8, comments: 5, saves: 2, shares: 3, visits: 0 },
  { no: 3, reach: 542, views: 766, likes: 12, comments: 1, saves: 0, shares: 1, visits: 0 },
  { no: 4, reach: 4491, views: 5461, likes: 74, comments: 9, saves: 49, shares: 42, visits: 8 },
  { no: 5, reach: 12000, views: 13000, likes: 58, comments: 44, saves: 148, shares: 60, visits: 20 },
  { no: 6, reach: 500, views: 661, likes: 12, comments: 8, saves: 0, shares: 0, visits: 0 },
  { no: 7, reach: 406, views: 666, likes: 12, comments: 7, saves: 0, shares: 0, visits: 0 },
  { no: 8, reach: 630, views: 768, likes: 10, comments: 7, saves: 1, shares: 1, visits: 1 },
  { no: 9, reach: 14000, views: 16000, likes: 51, comments: 82, saves: 119, shares: 88, visits: 36 },
  {
    no: 10,
    reach: 4806,
    views: 6304,
    likes: 55,
    comments: 11,
    saves: 72,
    shares: 34,
    visits: 2,
    promo: true,
  },
]

// 계정 전체 (최근 90일)
export const accountInsights = {
  followers: 875,
  views: 261000,
  nonFollowerViewShare: 0.93,
  reachedAccounts: 186000,
  interactions: 10000,
  nonFollowerInteractionShare: 0.673,
  profileVisits: 3122,
  linkTaps: 194,
}

// 홍보(광고 표기) 콘텐츠 5건
// 각 콘텐츠 비율의 단순 평균을 사용합니다. (도달이 큰 콘텐츠 1건에 끌려가지 않도록)
// engagementRate = 공유율 + 좋아요율 + 저장률 + 댓글률 (리포스트 제외)
// 공개 페이지 번들에 포함되므로 브랜드명은 넣지 않고 참여율만 기록합니다.
export const promoContents = [
  { engagementRate: 0.052 },
  { engagementRate: 0.025 },
  { engagementRate: 0.03 },
  { engagementRate: 0.043 },
  { engagementRate: 0.025 },
]

export const promoAverages = {
  views: 1917,
  reach: 1409,
  likeRate: 0.0192,
  saveRate: 0.006,
  commentRate: 0.007,
  shareRate: 0.0028,
  repostRate: 0.0008,
  watchSeconds: 6.28,
}
