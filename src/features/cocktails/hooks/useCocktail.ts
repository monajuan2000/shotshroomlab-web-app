import { useCallback } from 'react'
import { useAsync } from '../../../shared/hooks/useAsync.ts'
import { cocktailRepository } from '../api/cocktailRepository.ts'

export function useCocktail(cocktailId: string) {
  const loadCocktail = useCallback(() => cocktailRepository.getById(cocktailId), [cocktailId])
  return useAsync(loadCocktail)
}
