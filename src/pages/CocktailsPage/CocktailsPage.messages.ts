import { defineMessages } from '../../shared/i18n/index.ts'

export const cocktailsPageMessages = defineMessages({
  en: {
    documentTitle: 'Cocktails',
    eyebrow: 'Recipes',
    title: 'Cocktails',
    description:
      'Search by name or ingredient, and narrow the list by spirit, flavor, method or difficulty.',
    loading: 'Loading cocktails…',
    searchLabel: 'Search cocktails',
    searchPlaceholder: 'Search by name or ingredient',
    sortBy: 'Sort by',
    summary: (visible: number, total: number) => `Showing ${visible} of ${total} cocktails`,
    emptyTitle: 'No cocktails match your search',
    emptyDescription: 'Try a different word or remove some filters.',
    clearFilters: 'Clear all filters',
  },
  es: {
    documentTitle: 'Cócteles',
    eyebrow: 'Recetas',
    title: 'Cócteles',
    description:
      'Busca por nombre o ingrediente y filtra la lista por destilado, sabor, método o dificultad.',
    loading: 'Cargando cócteles…',
    searchLabel: 'Buscar cócteles',
    searchPlaceholder: 'Busca por nombre o ingrediente',
    sortBy: 'Ordenar por',
    summary: (visible: number, total: number) => `Mostrando ${visible} de ${total} cócteles`,
    emptyTitle: 'Ningún cóctel coincide con tu búsqueda',
    emptyDescription: 'Prueba con otra palabra o quita algunos filtros.',
    clearFilters: 'Limpiar todos los filtros',
  },
})
