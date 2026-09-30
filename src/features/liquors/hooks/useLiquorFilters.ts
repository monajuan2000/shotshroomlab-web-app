import { useUrlState } from '../../../shared/hooks/useUrlState.ts'
import { parseLiquorFilters, toLiquorSearchParams } from '../model/liquorFilters.ts'

export function useLiquorFilters() {
  const { state, update, reset } = useUrlState(parseLiquorFilters, toLiquorSearchParams)
  return { filters: state, updateFilters: update, resetFilters: reset }
}
