import { extras, productGroups, retentionOptions } from '../../data/pricing.js'
import ProductStepper from './ProductStepper.jsx'

function Group({ step, title, hint, children }) {
  return (
    <fieldset className="calc-group">
      <legend className="calc-group__title">
        <span className="calc-group__label">
          <span>{step}</span>
          {title}
        </span>
        {hint && <small className="calc-group__hint">{hint}</small>}
      </legend>
      {children}
    </fieldset>
  )
}

// 상품 · 유지 기간 · 추가 옵션 선택 영역
export default function CalculatorOptions({
  quantities,
  onQuantityChange,
  retentionId,
  onRetentionChange,
  selectedExtras,
  onExtraToggle,
  hasVideo,
}) {
  return (
    <div className="calc__options">
      <Group step={1} title="광고 상품 선택" hint="여러 상품을 함께 선택하거나 수량을 조절할 수 있어요.">
        <div className="calc-product-groups">
          {productGroups.map((group) => (
            <div key={group.id} className="calc-product-group">
              <p className="calc-product-group__title">{group.title}</p>
              <div className="calc-products">
                {group.items.map((product) => (
                  <ProductStepper
                    key={product.id}
                    product={product}
                    value={quantities[product.id]}
                    onChange={(value) => onQuantityChange(product.id, value)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Group>

      <Group step={2} title="콘텐츠 유지 기간">
        <div className="segmented" role="radiogroup">
          {retentionOptions.map((option) => (
            <label
              key={option.id}
              className={`segmented__item${retentionId === option.id ? ' is-active' : ''}`}
            >
              <input
                type="radio"
                name="retention"
                value={option.id}
                checked={retentionId === option.id}
                onChange={() => onRetentionChange(option.id)}
              />
              <span className="segmented__label">{option.label}</span>
              <span className="segmented__note">{option.note}</span>
            </label>
          ))}
        </div>
      </Group>

      <Group step={3} title="추가 옵션">
        <div className="calc-extras">
          {extras.map((extra) => {
            // 영상 상품을 고르지 않으면 원본 영상 제공 같은 옵션은 선택할 수 없습니다.
            const disabled = extra.requiresVideo && !hasVideo
            const checked = selectedExtras.has(extra.id) && !disabled
            return (
              <label
                key={extra.id}
                className={`calc-extra${checked ? ' is-active' : ''}${disabled ? ' is-disabled' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => onExtraToggle(extra.id)}
                />
                <span className="calc-check" aria-hidden="true" />
                <span className="calc-extra__name">
                  {extra.name}
                  {disabled && <em>릴스 또는 피드 + 릴스 패키지 선택 시 가능</em>}
                </span>
                <span className={`calc-extra__price${extra.type === 'negotiable' ? ' is-muted' : ''}`}>
                  {extra.priceLabel}
                </span>
              </label>
            )
          })}
        </div>
      </Group>
    </div>
  )
}
