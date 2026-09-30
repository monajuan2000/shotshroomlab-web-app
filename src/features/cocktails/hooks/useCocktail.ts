import { useCallback } from 'react'
import { useAsync } from '../../../shared/hooks/useAsync.ts'
import { useLocale } from '../../../shared/i18n/hooks.ts'
import { cocktailRepository } from '../api/cocktailRepository.ts'

export function useCocktail(cocktailId: string) {
  const { locale } = useLocale()
  const loadCocktail = useCallback(() => cocktailRepository.getById(cocktailId, locale), [cocktailId, locale])
  // Keeps the page on screen while it reloads in another language.
  return useAsync(loadCocktail, { keepPreviousData: true })
}
