import { useEffect, useMemo, type ReactNode } from 'react'
import { APP_CONFIG } from '../config/appConfig.ts'
import { usePersistentState } from '../hooks/usePersistentState.ts'
import { I18nContext, type I18nContextValue } from './I18nContext.ts'
import { DEFAULT_LOCALE, isLocale } from './locales.ts'

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = usePersistentState(APP_CONFIG.storageKeys.locale, DEFAULT_LOCALE, isLocale)

  // Screen readers, hyphenation and spell checking rely on the document language.
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale }), [locale, setLocale])

  return <I18nContext value={value}>{children}</I18nContext>
}
