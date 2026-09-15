import { profile } from '../data/profile.js'

// 선택 상태와 (언어에 맞게 번역된) 상품 정보를 받아 예상 광고비를 계산합니다.
// 비율 옵션(재게시·급행)은 선택한 상품 합계(기본 단가)에만 적용됩니다.
export function estimate({ quantities, retentionId, selectedExtras, pricing, quoteCopy }) {
  const products = pricing.productGroups.flatMap((group) => group.items)

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

  const retention = pricing.retentionOptions.find((r) => r.id === retentionId)
  if (hasContent && retention) {
    const label = quoteCopy.retentionLabel(retention.label)
    if (retention.fee === null) negotiable.push(label)
    else if (retention.fee > 0) {
      extraLines.push({ id: 'retention', label, min: retention.fee, max: retention.fee })
    }
  }

  for (const extra of pricing.extras) {
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

// DM·메일로 보낼 견적 내용
export function buildQuoteText(result, quoteCopy, f) {
  const rows = [
    quoteCopy.heading,
    '',
    quoteCopy.selected,
    ...result.productLines.map((l) => `- ${l.label}: ${f.wonRange(l.min, l.max)}`),
    ...result.extraLines.map((l) => `- ${l.label}: ${f.wonRange(l.min, l.max)}`),
  ]
  if (result.negotiable.length) {
    rows.push('', quoteCopy.negotiableHeading, ...result.negotiable.map((n) => `- ${n}`))
  }
  rows.push(
    '',
    quoteCopy.total(f.wonRange(result.min, result.max)),
    result.negotiable.length ? quoteCopy.negotiableNote : '',
    result.hasRangePrice ? quoteCopy.rangeNote : '',
    '',
    quoteCopy.campaignHeading,
    ...quoteCopy.campaignFields,
  )
  return rows.filter((row, i, arr) => row !== '' || arr[i - 1] !== '').join('\n')
}

// 견적 내용을 담아 메일 앱을 여는 링크
export function buildMailHref(quoteText, subject) {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(quoteText)}`
}
