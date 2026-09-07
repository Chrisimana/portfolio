import type { ProjectItem } from '~~/types'
import { LIMITS } from '~~/shared/constants'
import { slugFromPath } from '~~/shared/slug'

function collectionForLocale(locale: string) {
  return locale === 'en' ? ('projectsEn' as const) : ('projectsId' as const)
}

function slugOf(item: { path?: string, stem?: string }): string {
  return slugFromPath(item.path ?? item.stem)
}

export interface ProjectEntry {
  project: ProjectItem
  slug: string
  /** true bila kita di `/en` tapi hanya versi ID yang ada. */
  fallback: boolean
}

/** ARCHIVED dikecualikan dari daftar, tapi halaman detailnya tetap hidup. */
export function useProjectList() {
  const { locale } = useI18n()

  const { data } = useAsyncData('project-index', async () => {
    const [idRows, enRows] = await Promise.all([
      queryCollection('projectsId').where('published', '=', true).all(),
      queryCollection('projectsEn').where('published', '=', true).all(),
    ])
    return { idRows, enRows }
  })

  return computed<ProjectEntry[]>(() => {
    const idRows = data.value?.idRows ?? []
    const enRows = data.value?.enRows ?? []
    const enBySlug = new Map(enRows.map(row => [slugOf(row), row]))

    return idRows
      .filter(row => row.status !== 'ARCHIVED')
      .map((idRow): ProjectEntry => {
        const slug = slugOf(idRow)
        const en = enBySlug.get(slug)
        if (locale.value === 'en') {
          return en
            ? { project: en, slug, fallback: false }
            : { project: idRow, slug, fallback: true }
        }
        return { project: idRow, slug, fallback: false }
      })
  })
}

export function useFilledCategories() {
  const list = useProjectList()
  return computed(() => filledCategories(list.value.map(entry => entry.project.category)))
}

export function useFeaturedProjects() {
  const { locale } = useI18n()

  const { data } = useAsyncData(
    'featured-projects',
    () =>
      queryCollection(collectionForLocale(locale.value))
        .where('published', '=', true)
        .where('featured', '=', true)
        .order('featuredOrder', 'ASC')
        .limit(LIMITS.featuredMax)
        .all(),
    { watch: [locale] },
  )

  return computed(() =>
    (data.value ?? []).map(project => ({ project, slug: slugOf(project) })),
  )
}

/** Mengembalikan versi ID dan versi locale supaya halaman bisa memutuskan fallback. */
export function useProjectDetail(slug: MaybeRefOrGetter<string>) {
  const key = computed(() => `project-detail-${toValue(slug)}`)

  const { data } = useAsyncData(
    key.value,
    async () => {
      const s = toValue(slug)
      const [id, en] = await Promise.all([
        queryCollection('projectsId').path(`/id/projects/${s}`).first(),
        queryCollection('projectsEn').path(`/en/projects/${s}`).first(),
      ])
      return { id, en }
    },
    { watch: [key] },
  )

  return data
}

export function useRelatedProjects(
  category: MaybeRefOrGetter<string>,
  excludeSlug: MaybeRefOrGetter<string>,
) {
  const { locale } = useI18n()
  const key = computed(() => `related-${toValue(category)}-${toValue(excludeSlug)}-${locale.value}`)

  const { data } = useAsyncData(
    key.value,
    () =>
      queryCollection(collectionForLocale(locale.value))
        .where('published', '=', true)
        .where('category', '=', toValue(category))
        .order('publishedAt', 'DESC')
        .all(),
    { watch: [key] },
  )

  return computed(() =>
    (data.value ?? [])
      .filter(project => project.status !== 'ARCHIVED' && slugOf(project) !== toValue(excludeSlug))
      .slice(0, LIMITS.relatedMax)
      .map(project => ({ project, slug: slugOf(project) })),
  )
}
