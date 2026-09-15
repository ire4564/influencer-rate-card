import { LANGUAGES, languageHref, useCopy } from '../i18n/index.jsx'

// 메뉴 오른쪽 끝의 언어 선택 드롭다운 (선택하면 해당 언어 사이트로 이동)
export default function LanguageSwitcher() {
  const { lang, copy } = useCopy()

  return (
    <div className="lang">
      <select
        className="lang__select"
        aria-label={copy.nav.languageLabel}
        value={lang}
        onChange={(event) => {
          window.location.href = languageHref(event.target.value)
        }}
      >
        {LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <span className="lang__value" aria-hidden="true">
        {LANGUAGES.find((language) => language.code === lang)?.name}
        <svg viewBox="0 0 10 6" className="lang__arrow" aria-hidden="true">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    </div>
  )
}
