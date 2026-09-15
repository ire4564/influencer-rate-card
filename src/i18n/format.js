// 언어별 숫자 · 금액 표기
export function createFormat(lang) {
  const locale = lang === 'en' ? 'en-US' : 'ko-KR'

  const num = (value) => Math.round(value).toLocaleString(locale)
  const pct = (value, digits = 2) => `${(value * 100).toFixed(digits)}%`
  const approx = (value, unit = 100) => (Math.round(value / unit) * unit).toLocaleString(locale)

  // 큰 수: 한국어는 만 단위, 영어는 K 단위
  const compact = (value) =>
    lang === 'en'
      ? `${(value / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })}K`
      : `${(value / 10000).toLocaleString('ko-KR', { maximumFractionDigits: 1 })}만`

  const won = (value) =>
    lang === 'en'
      ? `₩${Math.round(value).toLocaleString('en-US')}`
      : `${Math.round(value).toLocaleString('ko-KR')}원`

  const wonRange = (min, max) => (min === max ? won(min) : `${won(min)} ~ ${won(max)}`)

  return { lang, locale, num, pct, approx, compact, won, wonRange }
}
