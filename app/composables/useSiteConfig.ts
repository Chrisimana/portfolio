import type { IconName } from '~/components/ui/iconRegistry'

export function useSiteConfig() {
  const { data } = useAsyncData(
    'site-config',
    () => queryCollection('site').first(),
    {
      getCachedData: (key, nuxtApp) => {
        if (import.meta.server) return undefined
        return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key] ?? null
      },
    },
  )
  return data
}

/** Tautan sosial yang benar-benar terisi, field kosong tidak dirender. */
export function useSocialLinks() {
  const site = useSiteConfig()
  return computed(() => {
    const social = site.value?.social
    if (!social) return []
    const order = ['github', 'linkedin', 'x', 'instagram', 'youtube'] as const
    const icon = {
      github: 'github',
      linkedin: 'linkedin',
      x: 'external-link',
      instagram: 'instagram',
      youtube: 'youtube',
    } satisfies Record<(typeof order)[number], IconName>
    return order
      .filter(key => social[key]?.trim())
      .map(key => ({
        key,
        url: social[key],
        icon: icon[key],
        label: key === 'x' ? 'X' : key[0]!.toUpperCase() + key.slice(1),
      }))
  })
}
