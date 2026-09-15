import { createContext, useContext, useMemo } from 'react'
import {
  extras as koExtras,
  productGroups as koGroups,
  retentionOptions as koRetention,
} from '../data/pricing.js'
import { insights } from '../lib/insights.js'
import { profile } from '../data/profile.js'
import { createFormat } from './format.js'
import { createKoCopy } from './copy.ko.jsx'
import { createEnCopy } from './copy.en.jsx'
import { extraLabels, groupLabels, itemLabels, retentionLabels } from './pricing.en.js'

export const LANGUAGES = [
  { code: 'ko', name: '한국어', short: 'KR', path: '' },
  { code: 'en', name: 'English', short: 'EN', path: 'en/' },
]

// 금액은 src/data/pricing.js 하나만 쓰고, 영어일 때 이름과 설명만 바꿔 끼웁니다.
function localizePricing(lang) {
  if (lang !== 'en') {
    return { productGroups: koGroups, retentionOptions: koRetention, extras: koExtras }
  }
  return {
    productGroups: koGroups.map((group) => ({
      ...group,
      ...groupLabels[group.id],
      items: group.items.map((item) => ({ ...item, ...itemLabels[item.id] })),
    })),
    retentionOptions: koRetention.map((option) => ({ ...option, ...retentionLabels[option.id] })),
    extras: koExtras.map((extra) => ({ ...extra, ...extraLabels[extra.id] })),
  }
}

// 배포 경로(.../influencer-rate-card/en/)에서 현재 언어를 읽습니다.
export function detectLanguage(pathname = window.location.pathname) {
  return pathname.replace(/\/+$/, '').endsWith('/en') ? 'en' : 'ko'
}

export function languageHref(code) {
  const base = import.meta.env.BASE_URL
  const target = LANGUAGES.find((l) => l.code === code)
  return `${base}${target?.path ?? ''}`
}

const LanguageContext = createContext(null)

export function LanguageProvider({ lang, children }) {
  const value = useMemo(() => {
    const f = createFormat(lang)
    const pricing = localizePricing(lang)
    const [y, m, d] = profile.openedAt.split('-')
    const args = { i: insights, f, account: { y, m, d }, pricing }
    const copy = lang === 'en' ? createEnCopy(args) : createKoCopy(args)
    return { lang, f, pricing, copy }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('LanguageProvider 안에서만 사용할 수 있습니다.')
  return value
}

// 자주 쓰는 형태: const { copy, f } = useCopy()
export const useCopy = useLanguage
