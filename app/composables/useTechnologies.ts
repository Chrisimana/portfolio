import technologiesData from '~~/content/data/technologies.json'
import type { Technology } from '~~/types'
import { TECH_CATEGORIES } from '~~/shared/constants'

export function useTechnologies() {
  const all = technologiesData as Technology[]

  const technologies = all
    .filter(tech => tech.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  const groups = TECH_CATEGORIES
    .map(category => ({
      category,
      items: technologies.filter(tech => tech.category === category),
    }))
    .filter(group => group.items.length > 0)

  const bySlug = new Map(all.map(tech => [tech.slug, tech]))

  return { technologies, groups, bySlug }
}
