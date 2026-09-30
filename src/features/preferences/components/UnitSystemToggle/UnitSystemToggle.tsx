import { SegmentedControl } from '../../../../shared/components/index.ts'
import { toOptions } from '../../../../shared/lib/options.ts'
import { UNIT_SYSTEM_LABELS, UNIT_SYSTEMS } from '../../../../shared/lib/units.ts'
import { usePreferences } from '../../hooks/usePreferences.ts'

const UNIT_OPTIONS = toOptions(UNIT_SYSTEMS, UNIT_SYSTEM_LABELS)

export function UnitSystemToggle() {
  const { unitSystem, setUnitSystem } = usePreferences()

  return (
    <SegmentedControl
      label="Measurement units"
      value={unitSystem}
      options={UNIT_OPTIONS}
      onChange={setUnitSystem}
    />
  )
}
