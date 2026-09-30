import { useMemo, type ReactNode } from 'react'
import { APP_CONFIG } from '../../../shared/config/appConfig.ts'
import { usePersistentState } from '../../../shared/hooks/usePersistentState.ts'
import { isOneOf } from '../../../shared/lib/guards.ts'
import { UNIT_SYSTEMS, type UnitSystem } from '../../../shared/lib/units.ts'
import { PreferencesContext, type PreferencesContextValue } from './PreferencesContext.ts'

const DEFAULT_UNIT_SYSTEM: UnitSystem = 'ml'

const isUnitSystem = (value: unknown): value is UnitSystem => isOneOf(UNIT_SYSTEMS, value)

interface PreferencesProviderProps {
  children: ReactNode
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [unitSystem, setUnitSystem] = usePersistentState(
    APP_CONFIG.storageKeys.unitSystem,
    DEFAULT_UNIT_SYSTEM,
    isUnitSystem,
  )

  const value = useMemo<PreferencesContextValue>(
    () => ({ unitSystem, setUnitSystem }),
    [unitSystem, setUnitSystem],
  )

  return <PreferencesContext value={value}>{children}</PreferencesContext>
}
