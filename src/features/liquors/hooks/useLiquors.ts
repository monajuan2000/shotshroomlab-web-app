import { useCallback } from 'react'
import { useAsync } from '../../../shared/hooks/useAsync.ts'
import { useLocale } from '../../../shared/i18n/hooks.ts'
import { liquorRepository } from '../api/liquorRepository.ts'

export function useLiquors() {
  const { locale } = useLocale()
  const loadAllLiquors = useCallback(() => liquorRepository.getAll(locale), [locale])
  // Keeps the list on screen while it reloads in another language.
  return useAsync(loadAllLiquors, { keepPreviousData: true })
}
