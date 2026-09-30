import { createContext } from 'react'
import type { Locale } from './locales.ts'

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const I18nContext = createContext<I18nContextValue | null>(null)
