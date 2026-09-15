import { useEffect, useRef, useState } from 'react'
import { products } from '../../data/pricing.js'
import { estimate } from '../../lib/estimate.js'
import SectionHead from '../SectionHead.jsx'
import CalculatorOptions from './CalculatorOptions.jsx'
import EstimateSummary from './EstimateSummary.jsx'
import FloatingTotal from './FloatingTotal.jsx'

const initialQuantities = Object.fromEntries(products.map((p) => [p.id, 0]))

export default function Calculator() {
  const [quantities, setQuantities] = useState(initialQuantities)
  const [retentionId, setRetentionId] = useState('6m')
  const [selectedExtras, setSelectedExtras] = useState(() => new Set())
  const [summaryVisible, setSummaryVisible] = useState(false)
  const [sectionVisible, setSectionVisible] = useState(false)
  const summaryRef = useRef(null)
  const sectionRef = useRef(null)

  const result = estimate({ quantities, retentionId, selectedExtras })

  // 계산기 구간에 있으면서 견적 카드가 화면 밖일 때만 하단 합계 바를 띄웁니다.
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === summaryRef.current) setSummaryVisible(entry.isIntersecting)
        if (entry.target === sectionRef.current) setSectionVisible(entry.isIntersecting)
      }
    })
    observer.observe(summaryRef.current)
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleQuantityChange = (id, value) => setQuantities((prev) => ({ ...prev, [id]: value }))

  const handleExtraToggle = (id) =>
    setSelectedExtras((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const reset = () => {
    setQuantities(initialQuantities)
    setRetentionId('6m')
    setSelectedExtras(new Set())
  }

  return (
    <section className="section section--calc" id="calculator" ref={sectionRef}>
      <div className="container">
        <SectionHead
          index={5}
          eyebrow="Estimate"
          title="광고비 계산기"
          desc="원하는 상품과 옵션을 선택하면 예상 집행 광고비가 바로 계산됩니다."
        />

        <div className="calc">
          <CalculatorOptions
            quantities={quantities}
            onQuantityChange={handleQuantityChange}
            retentionId={retentionId}
            onRetentionChange={setRetentionId}
            selectedExtras={selectedExtras}
            onExtraToggle={handleExtraToggle}
            hasVideo={result.hasVideo}
          />
          <EstimateSummary result={result} onReset={reset} summaryRef={summaryRef} />
        </div>
      </div>

      {result.hasContent && sectionVisible && !summaryVisible && (
        <FloatingTotal
          result={result}
          onOpen={() => summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        />
      )}
    </section>
  )
}
