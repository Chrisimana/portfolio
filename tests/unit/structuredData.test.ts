import { describe, expect, it } from 'vitest'
import type { ProjectItem, SiteConfig } from '~~/types'
import { creativeWorkNode, personNode, webSiteNode } from '~/composables/useStructuredData'

function makeSite(over: Partial<SiteConfig> = {}): SiteConfig {
  return {
    name: 'Rani Pramudya',
    roles: { id: ['Pengembang Web'], en: ['Web Developer'] },
    email: 'rani@contoh.dev',
    social: { github: 'https://github.com/rani', linkedin: '', x: '', instagram: '', youtube: '' },
    ...over,
  } as unknown as SiteConfig
}

function makeProject(over: Partial<ProjectItem> = {}): ProjectItem {
  return {
    title: 'Toko Hijau',
    shortDescription: 'Etalase produk ramah lingkungan.',
    publishedAt: '2026-02-01',
    technologies: ['nuxt', 'typescript'],
    cover: { src: '/images/projects/toko-hijau/cover.webp', alt: 'Tangkapan layar Toko Hijau' },
    ...over,
  } as unknown as ProjectItem
}

describe('personNode', () => {
  it('memuat nama, url, jobTitle, email, dan hanya sosial yang terisi', () => {
    const node = personNode(makeSite(), 'https://x.pages.dev/id', 'en')
    expect(node).toMatchObject({
      '@type': 'Person',
      'name': 'Rani Pramudya',
      'url': 'https://x.pages.dev/id',
      'jobTitle': ['Web Developer'],
      'email': 'mailto:rani@contoh.dev',
      'sameAs': ['https://github.com/rani'],
    })
  })

  it('memakai roles sesuai locale', () => {
    const node = personNode(makeSite(), 'https://x/id', 'id')
    expect(node).toMatchObject({ jobTitle: ['Pengembang Web'] })
  })

  it('tidak pernah mencantumkan knowsAbout / keahlian', () => {
    const node = personNode(makeSite(), 'https://x/id', 'en')
    expect(node).not.toHaveProperty('knowsAbout')
    expect(node).not.toHaveProperty('skills')
  })

  it('menghilangkan sameAs & email bila kosong', () => {
    const node = personNode(
      makeSite({ email: '', social: { github: '', linkedin: '', x: '', instagram: '', youtube: '' } as never }),
      'https://x/id',
      'en',
    )
    expect(node).not.toHaveProperty('sameAs')
    expect(node).not.toHaveProperty('email')
  })
})

describe('webSiteNode', () => {
  it('hanya name / url / inLanguage — tanpa SearchAction', () => {
    const node = webSiteNode(makeSite(), 'https://x/id', 'id-ID')
    expect(node).toEqual({
      '@type': 'WebSite',
      'name': 'Rani Pramudya',
      'url': 'https://x/id',
      'inLanguage': 'id-ID',
    })
  })
})

describe('creativeWorkNode', () => {
  const node = creativeWorkNode(
    makeProject(),
    'https://x.pages.dev/id/projects/toko-hijau',
    'https://x.pages.dev',
    makeSite(),
    'id-ID',
    'https://x.pages.dev/id',
  )

  it('memetakan field project ke schema.org', () => {
    expect(node).toMatchObject({
      '@type': 'CreativeWork',
      'name': 'Toko Hijau',
      'description': 'Etalase produk ramah lingkungan.',
      'url': 'https://x.pages.dev/id/projects/toko-hijau',
      'inLanguage': 'id-ID',
      'datePublished': '2026-02-01',
      'image': 'https://x.pages.dev/images/projects/toko-hijau/cover.webp',
      'author': { '@type': 'Person', 'name': 'Rani Pramudya', 'url': 'https://x.pages.dev/id' },
    })
  })

  it('keywords HANYA dari technologies yang dirender', () => {
    expect(node.keywords).toBe('nuxt, typescript')
  })

  it('tidak menambahkan about / mentions / area', () => {
    expect(node).not.toHaveProperty('about')
    expect(node).not.toHaveProperty('mentions')
  })

  it('tanpa cover → tanpa field image', () => {
    const n = creativeWorkNode(
      makeProject({ cover: undefined as never }),
      'https://x/id/projects/p', 'https://x', makeSite(), 'id-ID', 'https://x/id',
    )
    expect(n).not.toHaveProperty('image')
  })
})
