import type { Collections } from '@nuxt/content'
import type { z } from 'zod'
import type { projectSchema, technologySchema } from '../shared/content-schema'

/** Locale i18n. Sumbernya `i18n.locales` di `nuxt.config.ts`. */
export type Locale = 'id' | 'en'

/** Frontmatter project sesuai skema. */
export type ProjectFrontmatter = z.infer<typeof projectSchema>

export type ProjectCategory = ProjectFrontmatter['category']
export type ProjectStatus = ProjectFrontmatter['status']
export type ProjectItem = Collections['projectsId']

/** Isi `content/data/site.json`. */
export type SiteConfig = Collections['site']

/** Satu entri `content/data/technologies.json`. */
export type Technology = z.infer<typeof technologySchema>
