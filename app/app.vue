<script setup lang="ts">
// SEO per halaman diset lewat usePageSeo().
const htmlAttrs = useLocaleHead({ lang: true, dir: true, seo: false })
useHead(htmlAttrs)

const site = useSiteConfig()
const { locale } = useI18n()
useHead(() => {
  const loc = locale.value as 'id' | 'en'
  const suffix = site.value?.seo.title[loc]?.trim() || site.value?.name?.trim()
  return {
    titleTemplate: (pageTitle?: string) => {
      if (!suffix) return pageTitle ?? ''
      return pageTitle ? `${pageTitle}. ${suffix}` : suffix
    },
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
