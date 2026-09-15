import { useState } from 'react'
import { useCopy } from '../../i18n/index.jsx'
import { buildMailHref, buildQuoteText } from '../../lib/estimate.js'

// 오른쪽(모바일에서는 아래)에 붙는 예상 견적 카드
export default function EstimateSummary({ result, onReset, summaryRef }) {
  const { copy, f } = useCopy()
  const t = copy.calculator.summary
  const [copied, setCopied] = useState(false)
  const quoteText = buildQuoteText(result, copy.quote, f)

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quoteText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드를 쓸 수 없는 브라우저에서는 직접 복사할 수 있게 보여줍니다.
      window.prompt(t.copyFallback, quoteText)
    }
  }

  return (
    <aside className="calc__summary" ref={summaryRef} aria-live="polite">
      <div className="summary">
        <div className="summary__head">
          <h3>{t.title}</h3>
          <button type="button" className="summary__reset" onClick={onReset}>
            {t.reset}
          </button>
        </div>

        {result.hasContent ? (
          <>
            <ul className="summary__lines">
              {[...result.productLines, ...result.extraLines].map((line) => (
                <li key={line.id}>
                  <span>{line.label}</span>
                  <span>{f.wonRange(line.min, line.max)}</span>
                </li>
              ))}
              {result.negotiable.map((label) => (
                <li key={label} className="is-muted">
                  <span>{label}</span>
                  <span>{t.negotiable}</span>
                </li>
              ))}
            </ul>

            <div className="summary__total">
              <span className="summary__total-label">{t.totalLabel}</span>
              <strong className="summary__total-value">
                {result.min === result.max ? (
                  f.won(result.min)
                ) : (
                  <>
                    {f.won(result.min)}
                    <small> ~ {f.won(result.max)}</small>
                  </>
                )}
              </strong>
              {result.negotiable.length > 0 && (
                <p className="summary__note">{t.negotiableNote(result.negotiable.length)}</p>
              )}
              {result.hasRangePrice && <p className="summary__note">{t.rangeNote}</p>}
            </div>

            <div className="summary__actions">
              <a
                className="btn btn--primary btn--block"
                href={buildMailHref(quoteText, copy.quote.mailSubject)}
              >
                {t.mail}
              </a>
              <button type="button" className="btn btn--ghost btn--block" onClick={copyQuote}>
                {copied ? t.copied : t.copy}
              </button>
            </div>
          </>
        ) : (
          <div className="summary__empty">
            {t.emptyLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}

        <p className="summary__disclaimer">{t.disclaimer}</p>
      </div>
    </aside>
  )
}
