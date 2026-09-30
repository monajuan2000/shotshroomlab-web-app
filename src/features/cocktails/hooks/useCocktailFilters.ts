import { useUrlState } from '../../../shared/hooks/useUrlState.ts'
import { parseCocktailFilters, toCocktailSearchParams } from '../model/cocktailFilters.ts'

export function useCocktailFilters() {
  const { state, update, reset } = useUrlState(parseCocktailFilters, toCocktailSearchParams)
  return { filters: state, updateFilters: update, resetFilters: reset }
}
