<script setup lang="ts">

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const site = useSiteConfig()
const slug = computed(() => String(route.params.slug))

const { data } = await useAsyncData(
  () => `project:${slug.value}`,
  async () => {
    const [id, en] = await Promise.all([
      queryCollection('projectsId').path(`/id/projects/${slug.value}`).first(),
      queryCollection('projectsEn').path(`/en/projects/${slug.value}`).first(),
    ])
    return { id, en }
  },
  { watch: [slug] },
)

const idProject = computed(() => (data.value?.id?.published ? data.value.id : null))
const enProject = computed(() => (data.value?.en?.published ? data.value.en : null))

if (!idProject.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}
watch(idProject, (project) => {
  if (data.value && !project) {
    showError(createError({ statusCode: 404, statusMessage: 'Project not found' }))
  }
})

const isFallback = computed(() => locale.value === 'en' && !enProject.value)
const displayProject = computed(() =>
  locale.value === 'en' && enProject.value ? enProject.value : idProject.value,
)
const availableLocales = computed(() => (enProject.value ? ['id', 'en'] : ['id']))

usePageSeo({
  title: () => displayProject.value?.title,
  description: () => displayProject.value?.shortDescription,
  image: () => displayProject.value?.cover.src,
  imageAlt: () => displayProject.value?.cover.alt,
  type: 'article',
  availableLocales,
})

// Saat fallback, canonical menunjuk ke versi ID — jadi `url` & `inLanguage` node ikut memakai versi ID.
useJsonLd(() => {
  const project = displayProject.value
  const s = site.value
  if (!project || !s?.name) return []

  const effectiveLocale = isFallback.value ? 'id' : locale.value
  const base = (runtimeConfig.public.siteUrl || '').replace(/\/$/, '')
  const canonicalPath = isFallback.value
    ? `/id/projects/${slug.value}`
    : localePath(`/projects/${slug.value}`)
  const canonicalUrl = base ? base + canonicalPath : canonicalPath
  const authorUrl = base ? `${base}/${effectiveLocale}` : `/${effectiveLocale}`
  const language = effectiveLocale === 'en' ? 'en-US' : 'id-ID'

  return creativeWorkNode(project, canonicalUrl, base, s, language, authorUrl)
})
</script>

<template>
  <div v-if="displayProject">
    <ProjectDetail
      :project="displayProject"
      :fallback="isFallback"
    />
    <div class="mx-auto max-w-3xl px-6 pb-20">
      <RelatedProjects
        :category="displayProject.category"
        :current-slug="slug"
      />
    </div>
  </div>
</template>
