export const PROJECT_CATEGORIES = ['WEB', 'MOBILE', 'ML_AI', 'DATA', 'DESIGN', 'OTHER'] as const
export const PROJECT_STATUSES = ['COMPLETED', 'IN_PROGRESS', 'ARCHIVED'] as const
export const TECH_CATEGORIES = ['Web', 'Mobile', 'ML / AI', 'Data', 'Tools'] as const
export const LOCALES = ['id', 'en'] as const

export const LIMITS = {
  titleMax: 120,
  slugMax: 80,
  shortDescriptionMax: 160,
  altTextMax: 160,
  featuredMax: 6,
  galleryMax: 12,
  relatedMax: 3,
  techVisibleMax: 30,
  projectsPerPage: 12,
  searchDebounceMs: 300,
} as const

/** Ditegakkan oleh `scripts/images-check.ts`. */
export const IMAGE_LIMITS = {
  maxBytes: 500 * 1024,
  maxLongEdgePx: 3000,
  formats: ['webp', 'avif'] as const,
  /** Logo tech di `public/images/tech/*.svg`. */
  svgMaxBytes: 20 * 1024,
  cardAspect: 16 / 9,
  /** Toleransi rasio, mengakomodasi pembulatan. */
  cardAspectTolerance: 0.02,
} as const
