import { isOneOf } from '../lib/guards.ts'

/** Languages the views can be shown in. English is the source language of the code and data. */
export const LOCALES = ['en', 'es'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** Name of each language written in that language, as users expect to find it. */
export const LOCALE_NAMES: Readonly<Record<Locale, string>> = {
  en: 'English',
  es: 'Español',
}

/** A value written once per locale. */
export type Localized<T> = Readonly<Record<Locale, T>>

export const isLocale = (value: unknown): value is Locale => isOneOf(LOCALES, value)

/**
 * Declares the texts of a module. English sets the shape and every other
 * locale must provide exactly the same keys, so a missing translation fails
 * the type check instead of showing up blank in the UI.
 */
export function defineMessages<T>(messages: { en: T; es: NoInfer<T> }): Localized<T> {
  return messages
}
