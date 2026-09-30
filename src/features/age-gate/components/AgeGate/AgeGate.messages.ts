import { defineMessages } from '../../../../shared/i18n/locales.ts'

export const ageGateMessages = defineMessages({
  en: {
    welcome: (appName: string) => `Welcome to ${appName}`,
    question: 'Are you of legal drinking age in your country?',
    confirm: 'Yes, I am',
    deny: 'No, I am not',
    note: 'Please enjoy responsibly.',
    deniedTitle: 'See you later',
    deniedDescription: (appName: string) =>
      `${appName} is only available to people of legal drinking age. Please come back when you are.`,
    goBack: 'Go back',
  },
  es: {
    welcome: (appName: string) => `Te damos la bienvenida a ${appName}`,
    question: '¿Tienes la edad legal para consumir alcohol en tu país?',
    confirm: 'Sí, la tengo',
    deny: 'No, no la tengo',
    note: 'Disfruta con responsabilidad.',
    deniedTitle: 'Nos vemos más adelante',
    deniedDescription: (appName: string) =>
      `${appName} solo está disponible para personas con la edad legal para consumir alcohol. Vuelve cuando la tengas.`,
    goBack: 'Volver',
  },
})
