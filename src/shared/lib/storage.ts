/**
 * Safe wrappers around localStorage. Storage can be unavailable (private
 * mode, blocked cookies, quota) or hold data written by an older version of
 * the app, so every read is validated and every failure falls back quietly.
 */
export function readStorage<T>(key: string, fallback: T, isValid: (value: unknown) => value is T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback

    const parsed: unknown = JSON.parse(raw)
    return isValid(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage is unavailable; the value stays in memory for this session.
  }
}
