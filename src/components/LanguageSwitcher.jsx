import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, languageHref, useCopy } from '../i18n/index.jsx'

// 화면 오른쪽 위에 고정된 언어 선택 버튼
// 각 항목은 실제 링크라서 자바스크립트가 막혀도 이동합니다.
export default function LanguageSwitcher() {
  const { lang, copy } = useCopy()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const current = LANGUAGES.find((language) => language.code === lang)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className={`lang${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="lang__button"
        aria-label={copy.nav.languageLabel}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
      >
        {current?.short}
        <svg viewBox="0 0 10 14" className="lang__arrow" aria-hidden="true">
          <path
            d="M1.5 5.5L5 2l3.5 3.5M1.5 8.5L5 12l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className="lang__menu" role="menu">
          {LANGUAGES.map((language) => (
            <li key={language.code}>
              <a
                role="menuitem"
                href={languageHref(language.code)}
                className={`lang__item${language.code === lang ? ' is-current' : ''}`}
                aria-current={language.code === lang ? 'true' : undefined}
              >
                {language.short}
                <em>{language.name}</em>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
