import { describe, expect, it } from 'vitest'
import {
  filledCategories,
  normalizeSortMode,
  shouldRenderCategoryFilter,
  sortProjectEntries,
} from '~/utils/projectListing'

/** logika penyusunan daftar kategori dari konten. */
describe('filledCategories', () => {
  it('mengembalikan kategori dalam urutan kanonik, bukan urutan kemunculan', () => {
    // konten menyebut DATA lebih dulu, lalu WEB
    expect(filledCategories(['DATA', 'WEB', 'WEB'])).toEqual(['WEB', 'DATA'])
  })

  it('membuang duplikat', () => {
    expect(filledCategories(['WEB', 'WEB', 'WEB'])).toEqual(['WEB'])
  })

  it('mengabaikan nilai yang bukan kategori sah', () => {
    expect(filledCategories(['WEB', 'WEBSITE', 'nonsense'])).toEqual(['WEB'])
  })

  it('memunculkan kategori dormant (Mobile/ML-AI/Data) begitu ada project-nya', () => {
    expect(filledCategories(['MOBILE', 'WEB'])).toEqual(['WEB', 'MOBILE'])
  })

  it('daftar kosong → tanpa kategori', () => {
    expect(filledCategories([])).toEqual([])
  })
})

describe('shouldRenderCategoryFilter ( 0 / 1 / ≥2 kategori)', () => {
  it('0 kategori → tidak dirender', () => {
    expect(shouldRenderCategoryFilter([])).toBe(false)
  })

  it('1 kategori → tidak dirender (menyaring satu-satunya kategori tak berguna)', () => {
    expect(shouldRenderCategoryFilter(['WEB'])).toBe(false)
  })

  it('2 kategori → dirender', () => {
    expect(shouldRenderCategoryFilter(['WEB', 'MOBILE'])).toBe(true)
  })

  it('lebih dari 2 kategori → dirender', () => {
    expect(shouldRenderCategoryFilter(['WEB', 'MOBILE', 'DATA'])).toBe(true)
  })
})

/** sorting deterministik. */
describe('sortProjectEntries', () => {
  const entries = [
    { project: { publishedAt: '2024-05-01', title: 'Beta' } },
    { project: { publishedAt: '2026-01-15', title: 'Alfa' } },
    { project: { publishedAt: '2025-03-20', title: 'Gamma' } },
  ]

  it('newest → tanggal terbaru dulu', () => {
    expect(sortProjectEntries(entries, 'newest').map(e => e.project.title))
      .toEqual(['Alfa', 'Gamma', 'Beta'])
  })

  it('oldest → tanggal terlama dulu', () => {
    expect(sortProjectEntries(entries, 'oldest').map(e => e.project.title))
      .toEqual(['Beta', 'Gamma', 'Alfa'])
  })

  it('title → alfabetis A→Z', () => {
    expect(sortProjectEntries(entries, 'title').map(e => e.project.title))
      .toEqual(['Alfa', 'Beta', 'Gamma'])
  })

  it('tidak memutasi array input', () => {
    const input = [...entries]
    const snapshot = input.map(e => e.project.title)
    sortProjectEntries(input, 'title')
    expect(input.map(e => e.project.title)).toEqual(snapshot)
  })

  it('mode tak dikenal → jatuh ke newest', () => {
    expect(sortProjectEntries(entries, 'newest' as never).map(e => e.project.title))
      .toEqual(sortProjectEntries(entries, 'newest').map(e => e.project.title))
  })
})

describe('normalizeSortMode', () => {
  it('meneruskan mode sah', () => {
    expect(normalizeSortMode('oldest')).toBe('oldest')
    expect(normalizeSortMode('title')).toBe('title')
  })

  it('nilai tak sah / kosong / bukan string → newest', () => {
    expect(normalizeSortMode('acak')).toBe('newest')
    expect(normalizeSortMode(undefined)).toBe('newest')
    expect(normalizeSortMode(['oldest'])).toBe('newest')
  })
})
