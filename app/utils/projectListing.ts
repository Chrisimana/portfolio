import type { ProjectCategory } from '~~/types'
import { PROJECT_CATEGORIES } from '~~/shared/constants'

export function filledCategories(present: Iterable<string>): ProjectCategory[] {
  const set = new Set(present)
  return PROJECT_CATEGORIES.filter(category => set.has(category))
}

/** Filter kategori HANYA dirender bila ≥ 2 kategori terisi — satu (atau nol) tak ada gunanya disaring. */
export function shouldRenderCategoryFilter(categories: readonly string[]): boolean {
  return categories.length >= 2
}

export const SORT_MODES = ['newest', 'oldest', 'title'] as const
export type SortMode = (typeof SORT_MODES)[number]

interface SortableEntry {
  project: { publishedAt: string, title: string }
}

/** Tidak pernah acak. Mengembalikan array baru; input tidak dimutasi. */
export function sortProjectEntries<T extends SortableEntry>(
  entries: readonly T[],
  mode: SortMode,
): T[] {
  const list = [...entries]
  switch (mode) {
    case 'oldest':
      return list.sort((a, b) => a.project.publishedAt.localeCompare(b.project.publishedAt))
    case 'title':
      return list.sort((a, b) => a.project.title.localeCompare(b.project.title))
    case 'newest':
    default:
      return list.sort((a, b) => b.project.publishedAt.localeCompare(a.project.publishedAt))
  }
}

export function normalizeSortMode(raw: unknown): SortMode {
  return typeof raw === 'string' && (SORT_MODES as readonly string[]).includes(raw)
    ? (raw as SortMode)
    : 'newest'
}
