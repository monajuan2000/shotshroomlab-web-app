import { useCallback } from 'react'
import { useAsync } from '../../../shared/hooks/useAsync.ts'
import { useLocale } from '../../../shared/i18n/hooks.ts'
import { cocktailRepository } from '../api/cocktailRepository.ts'

export function useCocktails() {
  const { locale } = useLocale()
  const loadAllCocktails = useCallback(() => cocktailRepository.getAll(locale), [locale])
  // Keeps the list on screen while it reloads in another language.
  return useAsync(loadAllCocktails, { keepPreviousData: true })
}
