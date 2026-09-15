import { formatRange } from '../../lib/estimate.js'

export const MAX_QTY = 10

// 상품 한 칸: 체크(선택/해제)와 수량 조절
export default function ProductStepper({ product, value: rawValue, onChange }) {
  // 상품 목록이 바뀌어 수량이 비어 있어도 0으로 다루도록 (NaN 방지)
  const value = Number.isFinite(rawValue) ? rawValue : 0
  const active = value > 0

  return (
    <div className={`calc-product${active ? ' is-active' : ''}`}>
      <button
        type="button"
        className="calc-product__main"
        aria-pressed={active}
        onClick={() => onChange(active ? 0 : 1)}
      >
        <span className="calc-check" aria-hidden="true" />
        <span className="calc-product__text">
          <span className="calc-product__name">{product.name}</span>
          <span className="calc-product__price">{formatRange(product.min, product.max)}</span>
        </span>
      </button>
      <div className="stepper" aria-label={`${product.name} 수량`}>
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value === 0}
          aria-label={`${product.name} 수량 줄이기`}
        >
          −
        </button>
        <output aria-live="polite">{value}</output>
        <button
          type="button"
          onClick={() => onChange(Math.min(MAX_QTY, value + 1))}
          disabled={value === MAX_QTY}
          aria-label={`${product.name} 수량 늘리기`}
        >
          +
        </button>
      </div>
    </div>
  )
}
