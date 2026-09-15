import { formatRange } from '../../lib/estimate.js'

// 모바일에서 견적 카드가 화면 밖에 있을 때 아래에 뜨는 합계 바
export default function FloatingTotal({ result, onOpen }) {
  return (
    <div className="calc-bar" role="status">
      <div>
        <span className="calc-bar__label">예상 광고비</span>
        <strong>{formatRange(result.min, result.max)}</strong>
      </div>
      <button type="button" className="btn btn--light btn--sm" onClick={onOpen}>
        견적 보기
      </button>
    </div>
  )
}
