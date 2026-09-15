import { extras, products, retentionOptions } from '../data/pricing.js'
import { profile } from '../data/profile.js'

export const formatWon = (value) => `${Math.round(value).toLocaleString('ko-KR')}원`

export const formatRange = (min, max) =>
  min === max ? formatWon(min) : `${formatWon(min)} ~ ${formatWon(max)}`

// 선택 상태를 받아 예상 광고비를 계산합니다.
// 비율 옵션(재게시·급행)은 선택한 상품 합계(기본 단가)에만 적용됩니다.
export function estimate({ quantities, retentionId, selectedExtras }) {
  const productLines = products
    .filter((p) => quantities[p.id] > 0)
    .map((p) => {
      const qty = quantities[p.id]
      return { id: p.id, label: `${p.name} × ${qty}`, min: p.min * qty, max: p.max * qty }
    })

  const base = {
    min: productLines.reduce((total, line) => total + line.min, 0),
    max: productLines.reduce((total, line) => total + line.max, 0),
  }
  const hasContent = base.max > 0
  const hasVideo = products.some((p) => p.hasVideo && quantities[p.id] > 0)
  const hasRangePrice = products.some((p) => quantities[p.id] > 0 && p.min !== p.max)

  const extraLines = []
  const negotiable = []

  const retention = retentionOptions.find((r) => r.id === retentionId)
  if (hasContent && retention) {
    if (retention.fee === null) negotiable.push(`콘텐츠 유지 기간 ${retention.label}`)
    else if (retention.fee > 0) {
      extraLines.push({
        id: 'retention',
        label: `콘텐츠 유지 기간 ${retention.label}`,
        min: retention.fee,
        max: retention.fee,
      })
    }
  }

  for (const extra of extras) {
    if (!selectedExtras.has(extra.id) || !hasContent) continue
    if (extra.type === 'negotiable') {
      negotiable.push(extra.name)
    } else if (extra.type === 'fixed') {
      if (extra.requiresVideo && !hasVideo) continue
      extraLines.push({ id: extra.id, label: extra.name, min: extra.price, max: extra.price })
    } else if (extra.type === 'percent') {
      extraLines.push({
        id: extra.id,
        label: `${extra.name} (${extra.min * 100}~${extra.max * 100}%)`,
        min: base.min * extra.min,
        max: base.max * extra.max,
      })
    }
  }

  const lines = [...productLines, ...extraLines]
  return {
    hasContent,
    hasVideo,
    hasRangePrice,
    base,
    productLines,
    extraLines,
    negotiable,
    min: lines.reduce((sum, l) => sum + l.min, 0),
    max: lines.reduce((sum, l) => sum + l.max, 0),
  }
}

export function buildQuoteText(result) {
  const rows = [
    `[@${profile.handle} 광고 견적 문의]`,
    '',
    '■ 선택 항목',
    ...result.productLines.map((l) => `- ${l.label}: ${formatRange(l.min, l.max)}`),
    ...result.extraLines.map((l) => `- ${l.label}: ${formatRange(l.min, l.max)}`),
  ]
  if (result.negotiable.length) {
    rows.push('', '■ 별도 협의 항목', ...result.negotiable.map((n) => `- ${n}`))
  }
  rows.push(
    '',
    `■ 예상 광고비 (부가세 포함): ${formatRange(result.min, result.max)}`,
    result.negotiable.length ? '  ※ 별도 협의 항목 비용은 제외된 금액입니다.' : '',
    result.hasRangePrice ? '  ※ 범위 단가는 촬영 난이도와 요청 범위에 따라 협의 후 확정됩니다.' : '',
    '',
    '■ 캠페인 정보',
    '- 브랜드명 / 담당자명: ',
    '- 제품명 / 제품 링크: ',
    '- 희망 업로드 일정: ',
    '- 캠페인 주요 내용 및 필수 요청사항: ',
    '- 제품 제공 및 배송 조건: ',
  )
  return rows.filter((row, i, arr) => row !== '' || arr[i - 1] !== '').join('\n')
}

// 견적 내용을 담아 메일 앱을 여는 링크
export function buildMailHref(quoteText) {
  const subject = encodeURIComponent(`[광고 문의] @${profile.handle} 캠페인 견적`)
  return `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(quoteText)}`
}
