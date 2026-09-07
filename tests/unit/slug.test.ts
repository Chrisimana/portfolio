import { describe, expect, it } from 'vitest'
import { slugFromPath } from '~~/shared/slug'

/** utilitas slug. */
describe('slugFromPath', () => {
  it('mengambil segmen terakhir path Nuxt Content', () => {
    expect(slugFromPath('/id/projects/portfolio-situs')).toBe('portfolio-situs')
    expect(slugFromPath('/en/projects/panel-cuaca')).toBe('panel-cuaca')
  })

  it('mengabaikan trailing slash', () => {
    expect(slugFromPath('/id/projects/toko-hijau/')).toBe('toko-hijau')
  })

  it('path/nilai kosong → string kosong', () => {
    expect(slugFromPath('')).toBe('')
    expect(slugFromPath(undefined)).toBe('')
    expect(slugFromPath(null)).toBe('')
  })
})
