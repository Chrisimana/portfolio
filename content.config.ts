import { defineCollection, defineContentConfig } from '@nuxt/content'
import { projectSchema, siteSchema } from './shared/content-schema'
export default defineContentConfig({
  collections: {
    projectsId: defineCollection({ type: 'page', source: 'id/projects/**', schema: projectSchema }),
    projectsEn: defineCollection({ type: 'page', source: 'en/projects/**', schema: projectSchema }),
    site: defineCollection({ type: 'data', source: 'data/site.json', schema: siteSchema }),
  },
})
