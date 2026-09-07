import type { MaybeRefOrGetter } from 'vue'
import { withBase } from 'ufo'
import { LOCALES } from '~~/shared/constants'

interface PageSeoInput {
  title?: MaybeRefOrGetter<string | undefined>
  description?: MaybeRefOrGetter<string | undefined>
  image?: MaybeRefOrGetter<string | undefined>
  imageAlt?: MaybeRefOrGetter<string | undefined>
  type?: 'website' | 'article'

  absoluteTitle?: MaybeRefOrGetter<boolean | undefined>

  availableLocales?: MaybeRefOrGetter<readonly string[] | undefined>
}

export function usePageSeo(input: PageSeoInput = {}): void {
  const i18nHead = useLocaleHead({ lang: false, dir: false, seo: true })
  const { locale, locales } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  const runtimeConfig = useRuntimeConfig()
  const site = useSiteConfig()

  const baseUrl = (): string => runtimeConfig.public.siteUrl || ''
  const absolute = (path: string | undefined): string | undefined => {
    if (!path) return undefined
    if (/^https?:\/\//i.test(path)) return path
    return baseUrl() ? withBase(path, baseUrl()) : undefined
  }

  const defaultOgLocale = (): string => {
    const entry = locales.value.find(l => (typeof l === 'string' ? l : l.code) === LOCALES[0])
    const language = (typeof entry === 'string' ? undefined : entry?.language) ?? `${LOCALES[0]}-${LOCALES[0].toUpperCase()}`
    return language.replace(/-/g, '_')
  }

  const title = () => toValue(input.title)
  const description = () => toValue(input.description)
  const image = () => absolute(toValue(input.image))

  const titleSuffix = (): string | undefined => {
    const loc = locale.value as 'id' | 'en'
    return site.value?.seo.title[loc]?.trim() || site.value?.name?.trim()
  }
  const fullTitle = (): string | undefined => {
    const suffix = titleSuffix()
    const own = title()
    if (toValue(input.absoluteTitle)) return own || suffix || undefined
    if (own && suffix) return `${own}. ${suffix}`
    return own || suffix || undefined
  }

  // Homepage: judul sudah lengkap → matikan template global untuk halaman ini.
  useHead(() => (toValue(input.absoluteTitle) ? { titleTemplate: null } : {}))

  useHead(() => {
    const available = toValue(input.availableLocales)
    const links = i18nHead.value.link ?? []
    const meta = i18nHead.value.meta ?? []

    if (!available || available.length === 0) {
      return { link: links, meta }
    }

    const currentAvailable = available.includes(locale.value)
    if (currentAvailable) {
      // Locale aktif punya versi asli → hanya buang hreflang locale yang belum.
      return {
        link: links.filter((link) => {
          if (link.rel === 'canonical') return true
          const hreflang = String(link.hreflang ?? '')
          if (hreflang === 'x-default') return true
          return available.includes(hreflang.split('-')[0] ?? hreflang)
        }),
        meta,
      }
    }

    // Fallback, arahkan semua sinyal kanonik ke versi locale default.
    const fallbackCanonical = withBase(switchLocalePath(LOCALES[0]) || '/', baseUrl())

    const link = links
      .filter((l) => {
        if (l.rel === 'canonical') return true
        const hreflang = String(l.hreflang ?? '')
        if (hreflang === 'x-default') return true
        return available.includes(hreflang.split('-')[0] ?? hreflang)
      })
      .map(l => (l.rel === 'canonical' ? { ...l, href: fallbackCanonical } : l))

    const filteredMeta = meta.filter((m) => {
      const prop = String((m as { property?: string }).property ?? '')
      return prop !== 'og:url' && prop !== 'og:locale' && prop !== 'og:locale:alternate'
    })
    filteredMeta.push(
      { property: 'og:url', content: fallbackCanonical },
      { property: 'og:locale', content: defaultOgLocale() },
    )

    return { link, meta: filteredMeta }
  })

  useSeoMeta({
    title,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: () => input.type ?? 'website',
    ogImage: image,
    ogImageAlt: () => toValue(input.imageAlt),
    ogSiteName: () => site.value?.name || undefined,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: () => toValue(input.imageAlt),
  })
}
