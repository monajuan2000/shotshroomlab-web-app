import { useAsync } from '../../../shared/hooks/useAsync.ts'
import { cocktailRepository } from '../api/cocktailRepository.ts'

const loadAllCocktails = () => cocktailRepository.getAll()

export function useCocktails() {
  return useAsync(loadAllCocktails)
}
