import { defineMessages } from '../../../../shared/i18n/locales.ts'
import { pluralize } from '../../../../shared/lib/text.ts'

export const baseSpiritTilesMessages = defineMessages({
  en: { cocktailCount: (total: number) => `${total} ${pluralize(total, 'cocktail')}` },
  es: { cocktailCount: (total: number) => `${total} ${pluralize(total, 'cóctel', 'cócteles')}` },
})
