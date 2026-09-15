import { useCopy } from '../../i18n/index.jsx'

// 모바일에서 견적 카드가 화면 밖에 있을 때 아래에 뜨는 합계 바
export default function FloatingTotal({ result, onOpen }) {
  const { copy, f } = useCopy()
  const t = copy.calculator.bar

  return (
    <div className="calc-bar" role="status">
      <div>
        <span className="calc-bar__label">{t.label}</span>
        <strong>{f.wonRange(result.min, result.max)}</strong>
      </div>
      <button type="button" className="btn btn--light btn--sm" onClick={onOpen}>
        {t.open}
      </button>
    </div>
  )
}
