export default function HeroActions({ className = '' }) {
  return (
    <div className={`hero__actions ${className}`.trim()}>
      <a className="btn btn--primary" href="#calculator">
        광고비 계산하기
      </a>
      <a className="btn btn--ghost" href="#contact">
        캠페인 문의
      </a>
    </div>
  )
}
