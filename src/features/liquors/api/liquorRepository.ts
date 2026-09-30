import { LIQUORS } from '../data/liquors.ts'
import type { Liquor } from '../model/liquor.ts'

/**
 * Data access contract for liquors. The UI only depends on this interface, so
 * the local catalog can be replaced by a remote API without touching components.
 */
export interface LiquorRepository {
  getAll(): Promise<readonly Liquor[]>
  getById(id: string): Promise<Liquor | undefined>
}

export function createInMemoryLiquorRepository(source: readonly Liquor[]): LiquorRepository {
  return {
    getAll: async () => source,
    getById: async (id) => source.find((liquor) => liquor.id === id),
  }
}

export const liquorRepository: LiquorRepository = createInMemoryLiquorRepository(LIQUORS)
