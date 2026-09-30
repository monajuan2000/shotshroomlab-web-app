import type { Locale } from '../../../../shared/i18n/index.ts'

/**
 * Written in the target language, not the current one: someone who cannot
 * read the current language still has to recognize the way out.
 */
export const SWITCH_TO_LABELS: Readonly<Record<Locale, string>> = {
  en: 'View in English',
  es: 'Ver en español',
}
