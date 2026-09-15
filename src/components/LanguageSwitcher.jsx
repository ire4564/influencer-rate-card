import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, languageHref, useCopy } from '../i18n/index.jsx'

// 화면 오른쪽 위에 고정된 언어 선택 버튼
// 각 항목은 실제 링크라서 자바스크립트가 막혀도 이동합니다.
export default function LanguageSwitcher() {
  const { lang, copy } = useCopy()
  const [open, setOpen] = useState(false)
  // 배경이 어두운 구간(문의 · 푸터) 위에 오면 글씨를 밝게 바꿉니다.
  const [onDark, setOnDark] = useState(false)
  const rootRef = useRef(null)
  const current = LANGUAGES.find((language) => language.code === lang)

  useEffect(() => {
    const darkAreas = [...document.querySelectorAll('.section--dark, .footer')]
    if (darkAreas.length === 0) return

    function update() {
      const button = rootRef.current?.querySelector('.lang__button')
      if (!button) return
      const box = button.getBoundingClientRect()
      const middle = box.top + box.height / 2
      setOnDark(
        darkAreas.some((area) => {
          const rect = area.getBoundingClientRect()
          return rect.top <= middle && rect.bottom >= middle
        }),
      )
    }

    let frame = 0
    function onScroll() {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

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
    <div className={`lang${open ? ' is-open' : ''}${onDark ? ' is-on-dark' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="lang__button"
        aria-label={copy.nav.languageLabel}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
      >
        {current?.short}
        <svg viewBox="0 0 10 6" className="lang__arrow" aria-hidden="true">
          <path
            d="M1 1.5L5 5l4-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
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
