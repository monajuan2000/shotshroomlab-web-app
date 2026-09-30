import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../lib/storage.ts'

/** useState that survives reloads by mirroring its value into localStorage. */
export function usePersistentState<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => readStorage(key, fallback, isValid))

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  return [value, setValue] as const
}
