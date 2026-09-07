import { queryCollection } from '@nuxt/content/server'
import type { H3Event } from 'h3'
import { slugFromPath } from '~~/shared/slug'

export interface SearchIndexEntry {
  slug: string
  title: string
  shortDescription: string
  category: string
  technologies: string[]
}

export async function buildSearchIndex(
  event: H3Event,
  locale: 'id' | 'en',
): Promise<SearchIndexEntry[]> {
  const idRows = await queryCollection(event, 'projectsId')
    .where('published', '=', true)
    .select('path', 'title', 'shortDescription', 'category', 'technologies', 'status')
    .all()

  const enBySlug = new Map<string, { title: string, shortDescription: string }>()
  if (locale === 'en') {
    const enRows = await queryCollection(event, 'projectsEn')
      .where('published', '=', true)
      .select('path', 'title', 'shortDescription')
      .all()
    for (const row of enRows) {
      enBySlug.set(slugFromPath(row.path), {
        title: row.title,
        shortDescription: row.shortDescription,
      })
    }
  }

  return idRows
    .filter(row => row.status !== 'ARCHIVED')
    .map((row) => {
      const slug = slugFromPath(row.path)
      const en = enBySlug.get(slug)
      return {
        slug,
        title: en?.title ?? row.title,
        shortDescription: en?.shortDescription ?? row.shortDescription,
        category: row.category,
        technologies: row.technologies,
      }
    })
}
