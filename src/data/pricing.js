// 광고 상품 · 조건 · 추가 비용
// 모든 금액은 부가세 포함 기준입니다.
// min과 max를 다르게 두면 범위 단가로 표시되고, 계산기도 범위로 계산합니다.

export const productGroups = [
  {
    id: 'reels',
    title: '릴스',
    summary: '15~30초 세로형 영상 · 촬영 · 편집 · 기본 자막 · 업로드 · 수정 1회 포함',
    leadTime: '제품 수령 후 약 7~14일',
    items: [
      {
        id: 'reels',
        name: '릴스',
        min: 150000,
        max: 150000,
        hasVideo: true,
      },
    ],
  },
  {
    id: 'feed',
    title: '피드',
    summary: '제품 설명 캡션 · 브랜드 태그 · 수정 1회 포함',
    leadTime: '제품 수령 후 약 5~7일',
    items: [
      {
        id: 'feed-image',
        name: '피드 이미지',
        min: 100000,
        max: 100000,
        desc: '기본 5장 · 최대 10장',
      },
    ],
  },
  {
    id: 'package',
    title: '패키지',
    summary: '동일 제품을 여러 형식으로 함께 제작',
    leadTime: '구성에 따라 약 5~14일',
    items: [
      {
        id: 'pkg-feed-reels',
        name: '피드 + 릴스 패키지',
        min: 250000,
        max: 250000,
        desc: '릴스 1건 + 피드 1건',
        hasVideo: true,
        featured: true,
      },
      {
        id: 'pkg-reels-story',
        name: '릴스 + 스토리 패키지',
        min: 200000,
        max: 200000,
        desc: '릴스 1건 + 스토리 1건',
        hasVideo: true,
      },
    ],
  },
  {
    id: 'story',
    title: '스토리',
    summary: '1~3장 · 24시간 노출 · 멘션 또는 링크 포함',
    leadTime: '일정 협의',
    items: [
      {
        id: 'story',
        name: '스토리',
        min: 50000,
        max: 50000,
      },
    ],
  },
]

export const products = productGroups.flatMap((group) => group.items)

export const retentionOptions = [
  { id: '6m', label: '6개월', fee: 0, note: '추가 비용 없음' },
  { id: '1y', label: '1년', fee: 30000, note: '+30,000원' },
  { id: 'over', label: '1년 이상', fee: null, note: '별도 협의' },
]

// type
// - percent: 기본 단가(선택한 상품 합계)의 min~max 비율
// - fixed: 고정 금액 (requiresVideo면 영상 상품 선택 시에만 가능)
// - negotiable: 금액 없이 별도 협의
export const extras = [
  {
    id: 'repost',
    name: '브랜드 공식 계정 재게시',
    type: 'percent',
    min: 0.1,
    max: 0.2,
    priceLabel: '기본 단가의 10~20%',
  },
  {
    id: 'rush',
    name: '급행 제작',
    type: 'percent',
    min: 0.2,
    max: 0.3,
    priceLabel: '기본 단가의 20~30%',
  },
  {
    id: 'rawVideo',
    name: '원본 영상 제공',
    type: 'fixed',
    price: 50000,
    requiresVideo: true,
    priceLabel: '50,000원',
  },
  {
    id: 'metaAds',
    name: '메타 광고 소재 활용 (1개월)',
    type: 'negotiable',
    priceLabel: '별도 협의',
  },
  {
    id: 'detailPage',
    name: '상세페이지 · 자사몰 활용',
    type: 'negotiable',
    priceLabel: '별도 협의',
  },
  {
    id: 'exclusivity',
    name: '경쟁사 광고 제한',
    type: 'negotiable',
    priceLabel: '기간에 따라 별도 협의',
  },
  {
    id: 'extraRevision',
    name: '수정 2회 초과',
    type: 'negotiable',
    priceLabel: '회당 추가 비용 · 협의',
  },
]

export const terms = [
  { label: '부가세', value: '모든 단가 부가세 포함' },
  {
    label: '제작 요소 추가',
    value:
      '대본 작성, 제품 비교 · 사용법 설명, 음성 · 자막 편집, 다수 장면 촬영 등 제작 범위가 늘어나는 경우 별도 비용 협의',
  },
  { label: '제작 범위', value: '콘텐츠 제작 및 @kimwood.zip 계정 업로드 · 2차 활용은 별도 논의' },
  { label: '수정 횟수', value: '기본 1회 포함' },
  { label: '콘텐츠 유지 기간', value: '6개월 추가 비용 없음 · 1년 +30,000원 · 1년 이상 협의' },
  { label: '업로드 일정', value: '제품 수령 후 피드 약 5~7일, 릴스 약 7~14일 제작 후 협의 일정에 업로드' },
  { label: '제품 제공 · 배송 · 촬영 비용', value: '캠페인별 협의' },
]
