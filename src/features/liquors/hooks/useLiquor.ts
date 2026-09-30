import { useCallback } from 'react'
import { useAsync } from '../../../shared/hooks/useAsync.ts'
import { liquorRepository } from '../api/liquorRepository.ts'

export function useLiquor(liquorId: string) {
  const loadLiquor = useCallback(() => liquorRepository.getById(liquorId), [liquorId])
  return useAsync(loadLiquor)
}
