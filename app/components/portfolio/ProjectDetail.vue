<script setup lang="ts">
import type { ProjectItem } from '~~/types'

const { project, fallback } = defineProps<{ project: ProjectItem, fallback: boolean }>()

const { t } = useI18n()
const { bySlug } = useTechnologies()

// Nama tampilan dari technologies.json; slug apa adanya bila tak dikenal.
const techNames = computed(() => project.technologies.map(slug => bySlug.get(slug)?.name ?? slug))

const statusVariant = computed(() => {
  switch (project.status) {
    case 'COMPLETED': return 'success' as const
    case 'IN_PROGRESS': return 'warning' as const
    default: return 'neutral' as const
  }
})

const links = computed(() => {
  const l = project.links
  if (!l) return []
  return [
    l.github ? { key: 'github', href: l.github, icon: 'github' as const, label: t('project.source') } : null,
    l.demo ? { key: 'demo', href: l.demo, icon: 'external-link' as const, label: t('project.demo') } : null,
    l.docs ? { key: 'docs', href: l.docs, icon: 'file-text' as const, label: t('project.docs') } : null,
  ].filter(item => item !== null)
})
</script>

<template>
  <article class="mx-auto max-w-3xl px-6 py-16 md:py-20">
    <p
      v-if="fallback"
      class="mb-8 flex items-start gap-2 border border-border bg-surface-2 px-4 py-3 text-sm text-fg-muted rounded-[var(--radius-md)]"
    >
      <Icon
        name="circle-alert"
        :size="16"
        class="mt-0.5 shrink-0"
      />
      {{ t('fallback.detailBanner') }}
    </p>

    <div class="flex flex-wrap items-center gap-2">
      <Badge variant="accent">
        {{ t(`category.${project.category}`) }}
      </Badge>
      <Badge
        :variant="statusVariant"
        dot
      >
        {{ t(`status.${project.status}`) }}
      </Badge>
    </div>

    <h1 class="mt-4 text-h1 font-semibold text-fg">
      {{ project.title }}
    </h1>
    <p class="mt-3 text-lg text-fg-muted">
      {{ project.shortDescription }}
    </p>

    <ul
      v-if="techNames.length"
      class="mt-5 flex flex-wrap gap-1.5"
    >
      <li
        v-for="name in techNames"
        :key="name"
      >
        <Badge :pill="false">
          {{ name }}
        </Badge>
      </li>
    </ul>

    <NuxtImg
      :src="project.cover.src"
      :alt="project.cover.alt"
      :width="1200"
      :height="675"
      sizes="xs:100vw md:768px"
      preload
      loading="eager"
      fetchpriority="high"
      class="mt-8 aspect-[16/9] w-full border border-border object-cover rounded-[var(--radius-lg)]"
    />

    <div class="content-body mt-10">
      <ContentRenderer :value="project" />
    </div>

    <section
      v-if="project.gallery?.length"
      class="mt-14"
    >
      <h2 class="text-h3 font-semibold text-fg">
        {{ t('project.gallery') }}
      </h2>
      <div class="mt-5 grid gap-4 sm:grid-cols-2">
        <NuxtImg
          v-for="(image, index) in project.gallery"
          :key="index"
          :src="image.src"
          :alt="image.alt"
          :width="768"
          :height="432"
          sizes="xs:100vw sm:50vw md:370px"
          loading="lazy"
          class="aspect-[16/9] w-full border border-border object-cover rounded-[var(--radius-md)]"
        />
      </div>
    </section>

    <section
      v-if="links.length"
      class="mt-14"
    >
      <h2 class="text-h3 font-semibold text-fg">
        {{ t('project.links') }}
      </h2>
      <div class="mt-5 flex flex-wrap gap-3">
        <Button
          v-for="link in links"
          :key="link.key"
          variant="secondary"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            :name="link.icon"
            :size="16"
          />
          {{ link.label }}
        </Button>
      </div>
    </section>
  </article>
</template>
