<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const site = useSiteConfig()
const featured = useFeaturedProjects()

const loc = computed(() => locale.value as 'id' | 'en')

usePageSeo({
  // seo.title diisi → judul lengkap apa adanya; kosong → titleTemplate global memakai nama pemilik saja.
  title: () => site.value?.seo.title[loc.value] || undefined,
  absoluteTitle: () => Boolean(site.value?.seo.title[loc.value]),
  description: () =>
    site.value?.seo.description[loc.value] || site.value?.headline[loc.value],
  image: () => site.value?.seo.ogImage,
})

const homeUrl = computed(() => {
  const base = (runtimeConfig.public.siteUrl || '').replace(/\/$/, '')
  const path = localePath('/')
  return base ? base + path : path
})

useJsonLd(() => {
  const s = site.value
  if (!s?.name) return []
  const language = loc.value === 'en' ? 'en-US' : 'id-ID'
  return [personNode(s, homeUrl.value, loc.value), webSiteNode(s, homeUrl.value, language)]
})
</script>

<template>
  <div>
    <Hero id="hero" />
    <About id="about" />
    <TechStack id="tech" />

    <section
      v-if="featured.length"
      id="featured"
      class="scroll-mt-24 border-t border-border"
    >
      <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <h2 class="text-h2 font-semibold text-fg">
          {{ t('featured.heading') }}
        </h2>
        <div class="mt-10">
          <ProjectGrid :entries="featured" />
        </div>
        <p class="mt-8">
          <Button
            :to="localePath('/projects')"
            variant="link"
          >
            {{ t('actions.viewAllProjects') }}
            <Icon
              name="arrow-right"
              :size="16"
            />
          </Button>
        </p>
      </div>
    </section>
  </div>
</template>
