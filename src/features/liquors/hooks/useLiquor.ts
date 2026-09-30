import { useCallback } from 'react'
import { useAsync } from '../../../shared/hooks/useAsync.ts'
import { useLocale } from '../../../shared/i18n/hooks.ts'
import { liquorRepository } from '../api/liquorRepository.ts'

export function useLiquor(liquorId: string) {
  const { locale } = useLocale()
  const loadLiquor = useCallback(() => liquorRepository.getById(liquorId, locale), [liquorId, locale])
  // Keeps the page on screen while it reloads in another language.
  return useAsync(loadLiquor, { keepPreviousData: true })
}
