import { useCopy } from '../i18n/index.jsx'

export default function HeroActions({ className = '' }) {
  const { copy } = useCopy()

  return (
    <div className={`hero__actions ${className}`.trim()}>
      <a className="btn btn--primary" href="#calculator">
        {copy.hero.actions.calculator}
      </a>
      <a className="btn btn--ghost" href="#contact">
        {copy.hero.actions.contact}
      </a>
    </div>
  )
}
