import { defineMessages } from '../../shared/i18n/index.ts'

export const liquorDetailPageMessages = defineMessages({
  en: {
    documentTitle: 'Spirit',
    allSpirits: 'All spirits',
    loadingSpirit: 'Loading spirit…',
    loadingCocktails: 'Loading cocktails…',
    howToEnjoy: 'How to enjoy it',
    cocktailsWith: (name: string) => `Cocktails with ${name}`,
    notFoundTitle: 'Spirit not found',
    notFoundDescription: 'This spirit does not exist or may have been removed.',
    browseSpirits: 'Browse spirits',
    facts: { category: 'Category', strength: 'Strength', origin: 'Origin' },
  },
  es: {
    documentTitle: 'Destilado',
    allSpirits: 'Todos los destilados',
    loadingSpirit: 'Cargando destilado…',
    loadingCocktails: 'Cargando cócteles…',
    howToEnjoy: 'Cómo disfrutarlo',
    cocktailsWith: (name: string) => `Cócteles con ${name}`,
    notFoundTitle: 'Destilado no encontrado',
    notFoundDescription: 'Este destilado no existe o puede haber sido eliminado.',
    browseSpirits: 'Explorar destilados',
    facts: { category: 'Categoría', strength: 'Graduación', origin: 'Origen' },
  },
})
