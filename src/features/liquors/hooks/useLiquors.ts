import { useAsync } from '../../../shared/hooks/useAsync.ts'
import { liquorRepository } from '../api/liquorRepository.ts'

const loadAllLiquors = () => liquorRepository.getAll()

export function useLiquors() {
  return useAsync(loadAllLiquors)
}
