import { defineMessages } from '../../../../shared/i18n/locales.ts'

export const favoriteButtonMessages = defineMessages({
  en: {
    save: 'Save',
    saved: 'Saved',
    saveItem: (itemName: string) => `Save ${itemName} to favorites`,
    removeItem: (itemName: string) => `Remove ${itemName} from favorites`,
  },
  es: {
    save: 'Guardar',
    saved: 'Guardado',
    saveItem: (itemName: string) => `Guardar ${itemName} en favoritos`,
    removeItem: (itemName: string) => `Quitar ${itemName} de favoritos`,
  },
})
