import { defineMessages } from '../../shared/i18n/index.ts'

export const liquorsPageMessages = defineMessages({
  en: {
    documentTitle: 'Spirits',
    eyebrow: 'The back bar',
    title: 'Spirits',
    description: 'Get to know the bottles behind every cocktail: their origin, strength and flavor.',
    loading: 'Loading spirits…',
    searchLabel: 'Search spirits',
    searchPlaceholder: 'Search by name, origin or flavor',
    sortBy: 'Sort by',
    summary: (visible: number, total: number) => `Showing ${visible} of ${total} spirits`,
    emptyTitle: 'No spirits match your search',
    emptyDescription: 'Try a different word or remove some filters.',
    clearFilters: 'Clear all filters',
  },
  es: {
    documentTitle: 'Destilados',
    eyebrow: 'La barra',
    title: 'Destilados',
    description:
      'Conoce las botellas detrás de cada cóctel: su origen, su graduación y su sabor.',
    loading: 'Cargando destilados…',
    searchLabel: 'Buscar destilados',
    searchPlaceholder: 'Busca por nombre, origen o sabor',
    sortBy: 'Ordenar por',
    summary: (visible: number, total: number) => `Mostrando ${visible} de ${total} destilados`,
    emptyTitle: 'Ningún destilado coincide con tu búsqueda',
    emptyDescription: 'Prueba con otra palabra o quita algunos filtros.',
    clearFilters: 'Limpiar todos los filtros',
  },
})
