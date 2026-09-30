// Public API of the translation layer. Code, data keys and comments stay in
// English; only the text shown to the user is translated.
export { I18nProvider } from './I18nProvider.tsx'
export { useLocale, useMessages } from './hooks.ts'
export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_NAMES,
  defineMessages,
  isLocale,
  type Locale,
  type Localized,
} from './locales.ts'
