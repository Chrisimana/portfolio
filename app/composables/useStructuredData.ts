import type { MaybeRefOrGetter } from 'vue'
import type { ProjectItem, SiteConfig } from '~~/types'
import { withBase } from 'ufo'

type JsonLdNode = Record<string, unknown>

function abs(path: string, siteUrl: string): string {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return siteUrl ? withBase(path, siteUrl) : path
}

export function personNode(site: SiteConfig, homeUrl: string, locale: 'id' | 'en'): JsonLdNode {
  const sameAs = Object.values(site.social ?? {})
    .map(v => (typeof v === 'string' ? v.trim() : ''))
    .filter(Boolean)
  const roles = site.roles?.[locale] ?? []

  const node: JsonLdNode = {
    '@type': 'Person',
    'name': site.name,
    'url': homeUrl,
  }
  if (roles.length) node.jobTitle = roles
  if (sameAs.length) node.sameAs = sameAs
  if (site.email) node.email = `mailto:${site.email}`
  return node
}

export function webSiteNode(site: SiteConfig, homeUrl: string, language: string): JsonLdNode {
  return {
    '@type': 'WebSite',
    'name': site.name,
    'url': homeUrl,
    'inLanguage': language,
  }
}

export function creativeWorkNode(
  project: ProjectItem,
  canonicalUrl: string,
  siteUrl: string,
  site: SiteConfig,
  language: string,
  authorUrl: string,
): JsonLdNode {
  const node: JsonLdNode = {
    '@type': 'CreativeWork',
    'name': project.title,
    'description': project.shortDescription,
    'url': canonicalUrl,
    'inLanguage': language,
    'datePublished': project.publishedAt,
    'author': { '@type': 'Person', 'name': site.name, 'url': authorUrl },
  }
  const image = abs(project.cover?.src ?? '', siteUrl)
  if (image) node.image = image
  // technologies dirender sebagai badge di ProjectDetail
  if (project.technologies?.length) node.keywords = project.technologies.join(', ')
  return node
}

export function useJsonLd(nodes: MaybeRefOrGetter<JsonLdNode | JsonLdNode[]>): void {
  useHead(() => {
    const value = toValue(nodes)
    const list = Array.isArray(value) ? value : [value]
    if (!list.length) return {}

    const payload
      = list.length === 1
        ? { '@context': 'https://schema.org', ...list[0] }
        : { '@context': 'https://schema.org', '@graph': list }

    return {
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(payload).replace(/</g, '\\u003c'),
        },
      ],
    }
  })
}
