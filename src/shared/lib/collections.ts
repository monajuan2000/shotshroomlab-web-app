/** Returns the items whose id is in `ids`, keeping the order of `ids` and skipping unknown ids. */
export function pickByIds<T extends { id: string }>(items: readonly T[], ids: readonly string[]): T[] {
  const byId = new Map(items.map((item) => [item.id, item]))
  return ids.flatMap((id) => byId.get(id) ?? [])
}

export function countBy<T, K>(items: readonly T[], getKey: (item: T) => K): Map<K, number> {
  const counts = new Map<K, number>()
  for (const item of items) {
    const key = getKey(item)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return counts
}
