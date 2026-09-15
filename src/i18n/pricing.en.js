// 광고 상품 · 옵션의 영어 문구 (금액은 src/data/pricing.js 하나만 사용)
export const groupLabels = {
  reels: {
    title: 'Reels',
    summary: '15–30s vertical video · filming · editing · basic captions · upload · 1 revision included',
    leadTime: 'About 7–14 days after receiving the product',
  },
  feed: {
    title: 'Feed',
    summary: 'Product caption · brand tag · 1 revision included',
    leadTime: 'About 5–7 days after receiving the product',
  },
  package: {
    title: 'Packages',
    summary: 'The same product produced in multiple formats',
    leadTime: 'About 5–14 days depending on the format',
  },
  story: {
    title: 'Story',
    summary: '1–3 frames · live for 24 hours · mention or link included',
    leadTime: 'Schedule to be agreed',
  },
}

export const itemLabels = {
  reels: { name: 'Reels', desc: '' },
  'feed-image': { name: 'Feed image', desc: '5 photos standard · up to 10' },
  'pkg-feed-reels': { name: 'Feed + Reels package', desc: '1 Reels + 1 feed post', badge: 'Popular' },
  'pkg-reels-story': { name: 'Reels + Story package', desc: '1 Reels + 1 story' },
  story: { name: 'Story', desc: '' },
}

export const retentionLabels = {
  '6m': { label: '6 months', note: 'No extra cost' },
  '1y': { label: '1 year', note: '+₩30,000' },
  over: { label: 'Over 1 year', note: 'To be discussed' },
}

export const extraLabels = {
  repost: { name: 'Repost on the brand account', priceLabel: '10–20% of the base rate' },
  rush: { name: 'Rush production', priceLabel: '20–30% of the base rate' },
  rawVideo: { name: 'Raw video files', priceLabel: '₩50,000' },
  metaAds: { name: 'Meta ads creative use (1 month)', priceLabel: 'To be discussed' },
  detailPage: { name: 'Product page · online store use', priceLabel: 'To be discussed' },
  exclusivity: { name: 'Competitor exclusivity', priceLabel: 'Depends on the period' },
  extraRevision: { name: 'Revisions beyond 2', priceLabel: 'Per revision · to be discussed' },
}

export const terms = [
  { label: 'VAT', value: 'All rates include VAT' },
  {
    label: 'Extra production',
    value:
      'Scripting, product comparison or how-to explanations, voice-over and caption editing, or multi-scene shoots are quoted separately',
  },
  {
    label: 'Scope',
    value: 'Production and upload on @kimwood.zip · any further use is discussed separately',
  },
  { label: 'Revisions', value: '1 revision included' },
  {
    label: 'Content retention',
    value: '6 months at no extra cost · 1 year +₩30,000 · over 1 year to be discussed',
  },
  {
    label: 'Upload schedule',
    value: 'Uploaded on the agreed date after about 5–7 days (feed) or 7–14 days (Reels) of production',
  },
  { label: 'Product · shipping · shooting costs', value: 'Agreed per campaign' },
]
