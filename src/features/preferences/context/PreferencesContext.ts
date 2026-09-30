import { createContext } from 'react'
import type { UnitSystem } from '../../../shared/lib/units.ts'

export interface PreferencesContextValue {
  unitSystem: UnitSystem
  setUnitSystem: (unitSystem: UnitSystem) => void
}

export const PreferencesContext = createContext<PreferencesContextValue | null>(null)
