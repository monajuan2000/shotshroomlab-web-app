import { defineMessages } from '../../i18n/locales.ts'

export const numberStepperMessages = defineMessages({
  en: {
    decrease: (label: string) => `Decrease ${label.toLowerCase()}`,
    increase: (label: string) => `Increase ${label.toLowerCase()}`,
  },
  es: {
    decrease: (label: string) => `Reducir ${label.toLowerCase()}`,
    increase: (label: string) => `Aumentar ${label.toLowerCase()}`,
  },
})
