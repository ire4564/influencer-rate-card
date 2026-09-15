import { useState } from 'react'
import { buildMailHref, buildQuoteText, formatRange, formatWon } from '../../lib/estimate.js'

// 오른쪽(모바일에서는 아래)에 붙는 예상 견적 카드
export default function EstimateSummary({ result, onReset, summaryRef }) {
  const [copied, setCopied] = useState(false)
  const quoteText = buildQuoteText(result)

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quoteText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드를 쓸 수 없는 브라우저에서는 직접 복사할 수 있게 보여줍니다.
      window.prompt('아래 견적 내용을 복사해주세요.', quoteText)
    }
  }

  return (
    <aside className="calc__summary" ref={summaryRef} aria-live="polite">
      <div className="summary">
        <div className="summary__head">
          <h3>예상 견적</h3>
          <button type="button" className="summary__reset" onClick={onReset}>
            초기화
          </button>
        </div>

        {result.hasContent ? (
          <>
            <ul className="summary__lines">
              {[...result.productLines, ...result.extraLines].map((line) => (
                <li key={line.id}>
                  <span>{line.label}</span>
                  <span>{formatRange(line.min, line.max)}</span>
                </li>
              ))}
              {result.negotiable.map((label) => (
                <li key={label} className="is-muted">
                  <span>{label}</span>
                  <span>별도 협의</span>
                </li>
              ))}
            </ul>

            <div className="summary__total">
              <span className="summary__total-label">예상 광고비 · 부가세 포함</span>
              <strong className="summary__total-value">
                {result.min === result.max ? (
                  formatWon(result.min)
                ) : (
                  <>
                    {formatWon(result.min)}
                    <small> ~ {formatWon(result.max)}</small>
                  </>
                )}
              </strong>
              {result.negotiable.length > 0 && (
                <p className="summary__note">
                  별도 협의 항목 {result.negotiable.length}건의 비용은 제외된 금액입니다.
                </p>
              )}
              {result.hasRangePrice && (
                <p className="summary__note">
                  범위 단가는 촬영 난이도와 요청 범위에 따라 협의 후 확정됩니다.
                </p>
              )}
            </div>

            <div className="summary__actions">
              <a className="btn btn--primary btn--block" href={buildMailHref(quoteText)}>
                이 견적으로 이메일 문의
              </a>
              <button type="button" className="btn btn--ghost btn--block" onClick={copyQuote}>
                {copied ? '복사했어요 ✓' : '견적 내용 복사 (DM용)'}
              </button>
            </div>
          </>
        ) : (
          <div className="summary__empty">
            <p>광고 상품을 선택하면</p>
            <p>예상 광고비가 여기에 표시됩니다.</p>
          </div>
        )}

        <p className="summary__disclaimer">
          계산 결과는 참고용 예상 금액이며, 캠페인 범위와 일정에 따라 최종 견적이 달라질 수 있습니다.
        </p>
      </div>
    </aside>
  )
}
