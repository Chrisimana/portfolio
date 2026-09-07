import { z } from 'zod'
import { LIMITS, PROJECT_CATEGORIES, PROJECT_STATUSES, TECH_CATEGORIES } from './constants.ts'

export * from './constants.ts'

/* ---------- Helper ---------- */

const trimmed = z.string().trim()
const bounded = (max: number) => trimmed.min(1).max(max)

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(v => (v === '' || v === null ? undefined : v), schema.optional())

const httpUrl = trimmed
  .url({ message: 'URL tidak valid' })
  .refine(u => /^https?:\/\//i.test(u), { message: 'hanya skema http/https diizinkan' })

const publicAssetPath = trimmed.regex(
  /^\/[\w\-./]+\.(?:webp|avif|png|jpe?g|svg)$/i,
  { message: 'harus path absolut di dalam /public, mis. /images/projects/slug/cover.webp' },
)

// YAML memparse `2026-03-14` menjadi Date. normalkan kembali ke string YYYY-MM-DD.
const isoDate = z.preprocess(
  v => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  trimmed.regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'format tanggal harus YYYY-MM-DD' }),
)

const altText = trimmed
  .min(1, { message: 'alt wajib diisi dan tidak boleh kosong' })
  .max(LIMITS.altTextMax, { message: `alt maksimal ${LIMITS.altTextMax} karakter` })

const imageObject = z.object({
  src: publicAssetPath,
  alt: altText,
})

/* ---------- Project ---------- */

export const projectSchema = z
  .object({
    title: bounded(LIMITS.titleMax),
    shortDescription: bounded(LIMITS.shortDescriptionMax),
    category: z.enum(PROJECT_CATEGORIES),
    status: z.enum(PROJECT_STATUSES),
    featured: z.boolean().default(false),
    featuredOrder: z.number().int().positive().optional(),
    publishedAt: isoDate,
    published: z.boolean(),
    cover: imageObject,
    technologies: z
      .array(trimmed.regex(/^[a-z0-9-]+$/, { message: 'slug teknologi harus huruf kecil' }))
      .min(1, { message: 'minimal satu teknologi' }),
    links: z
      .object({
        github: emptyToUndefined(httpUrl),
        demo: emptyToUndefined(httpUrl),
        docs: emptyToUndefined(httpUrl),
      })
      .partial()
      .optional(),
    gallery: z
      .array(imageObject)
      .max(LIMITS.galleryMax, { message: `gallery maksimal ${LIMITS.galleryMax} item` })
      .optional(),
    seo: z
      .object({
        title: emptyToUndefined(trimmed.max(LIMITS.titleMax)),
        description: emptyToUndefined(trimmed.max(LIMITS.shortDescriptionMax)),
      })
      .partial()
      .optional(),
    placeholder: z.boolean().optional(),
  })
  .refine(d => d.featured === false || typeof d.featuredOrder === 'number', {
    message: 'featuredOrder wajib bila featured: true',
    path: ['featuredOrder'],
  })
  .refine(d => d.featured === true || d.featuredOrder === undefined, {
    message: 'featuredOrder hanya boleh diisi bila featured: true',
    path: ['featuredOrder'],
  })

/* ---------- Technologies ---------- */

export const technologySchema = z.object({
  slug: trimmed.regex(/^[a-z0-9-]+$/, { message: 'slug harus huruf kecil, angka, tanda hubung' }),
  name: bounded(60),
  category: z.enum(TECH_CATEGORIES),
  icon: trimmed.default(''),
  url: httpUrl,
  sortOrder: z.number().int(),
  visible: z.boolean(),
})

/* ---------- Site ---------- */

const localizedString = z.object({ id: trimmed, en: trimmed })
const localizedStringList = z.object({
  id: z.array(trimmed).min(1),
  en: z.array(trimmed).min(1),
})

export const siteSchema = z.object({
  name: trimmed,
  roles: localizedStringList,
  headline: localizedString,
  bio: localizedString,
  email: z.union([z.literal(''), trimmed.email()]),
  social: z.object({
    github: trimmed.default(''),
    linkedin: trimmed.default(''),
    x: trimmed.default(''),
    instagram: trimmed.default(''),
    youtube: trimmed.default(''),
  }),
  // string kosong = CV belum tersedia (UI menampilkan "coming soon").
  cv: publicAssetPath.or(z.literal('/cv.pdf')).or(z.literal('')),
  seo: z.object({
    title: localizedString,
    description: localizedString,
    ogImage: trimmed,
  }),
})
