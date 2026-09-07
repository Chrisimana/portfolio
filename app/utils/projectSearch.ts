export interface SearchableProject {
  slug: string
  title: string
  shortDescription: string
  category: string
  technologies: string[]
}

/** `null` bila kueri kosong ATAU index belum ada — pemanggil menampilkan daftar penuh. */
export function matchSearchQuery(
  entries: readonly SearchableProject[] | null | undefined,
  rawQuery: string,
): Set<string> | null {
  const q = rawQuery.trim().toLowerCase()
  if (!q || !entries) return null

  const matched = entries.filter(entry =>
    entry.title.toLowerCase().includes(q)
    || entry.shortDescription.toLowerCase().includes(q)
    || entry.technologies.some(tech => tech.toLowerCase().includes(q)),
  )
  return new Set(matched.map(entry => entry.slug))
}
