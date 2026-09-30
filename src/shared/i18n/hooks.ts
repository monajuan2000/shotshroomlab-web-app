import { useContext } from 'react'
import { I18nContext, type I18nContextValue } from './I18nContext.ts'
import type { Localized } from './locales.ts'

export function useLocale(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useLocale must be used inside <I18nProvider>.')
  return context
}

/** Picks the texts of the current locale from a `defineMessages` catalog. */
export function useMessages<T>(messages: Localized<T>): T {
  return messages[useLocale().locale]
}
