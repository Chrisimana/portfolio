import { describe, expect, it } from 'vitest'
import { matchSearchQuery, type SearchableProject } from '~/utils/projectSearch'

/** logika pencarian. */
const index: SearchableProject[] = [
  {
    slug: 'toko-hijau',
    title: 'Toko Hijau',
    shortDescription: 'Etalase produk ramah lingkungan dengan checkout cepat.',
    category: 'WEB',
    technologies: ['nuxt', 'typescript', 'stripe'],
  },
  {
    slug: 'panel-cuaca',
    title: 'Panel Cuaca Kota',
    shortDescription: 'Dasbor prakiraan cuaca real-time.',
    category: 'WEB',
    technologies: ['vue', 'tailwind'],
  },
  {
    slug: 'arsip-foto',
    title: 'Arsip Foto',
    shortDescription: 'Galeri statis dengan pencarian metadata.',
    category: 'WEB',
    technologies: ['nuxt-content', 'typescript'],
  },
]

describe('matchSearchQuery', () => {
  it('cocok pada judul, tanpa memperhatikan huruf besar-kecil', () => {
    expect(matchSearchQuery(index, 'CUACA')).toEqual(new Set(['panel-cuaca']))
  })

  it('cocok pada deskripsi singkat', () => {
    expect(matchSearchQuery(index, 'metadata')).toEqual(new Set(['arsip-foto']))
  })

  it('cocok pada nama teknologi', () => {
    expect(matchSearchQuery(index, 'typescript')).toEqual(new Set(['toko-hijau', 'arsip-foto']))
  })

  it('pencocokan substring, bukan kata utuh', () => {
    expect(matchSearchQuery(index, 'hij')).toEqual(new Set(['toko-hijau']))
  })

  it('kueri tanpa hasil → set kosong (bukan null)', () => {
    const result = matchSearchQuery(index, 'blockchain')
    expect(result).toEqual(new Set())
    expect(result).not.toBeNull()
  })

  it('kueri kosong / hanya spasi → null (daftar penuh)', () => {
    expect(matchSearchQuery(index, '')).toBeNull()
    expect(matchSearchQuery(index, '   ')).toBeNull()
  })

  it('index null/undefined → null (index belum dimuat)', () => {
    expect(matchSearchQuery(null, 'cuaca')).toBeNull()
    expect(matchSearchQuery(undefined, 'cuaca')).toBeNull()
  })

  it('spasi di tepi kueri dipangkas', () => {
    expect(matchSearchQuery(index, '  cuaca  ')).toEqual(new Set(['panel-cuaca']))
  })

  it('tidak memakai library fuzzy — typo tidak cocok', () => {
    expect(matchSearchQuery(index, 'cuacaa')).toEqual(new Set())
  })
})
