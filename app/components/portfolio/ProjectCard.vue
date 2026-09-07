<script setup lang="ts">
import type { ProjectItem } from '~~/types'

/** Kartu = tautan ke halaman detail (pola stretched link); GitHub/Demo tetap bisa diklik terpisah. */
const { project, slug, fallback = false, headingLevel = 3, priority = false } = defineProps<{
  project: ProjectItem
  slug: string
  fallback?: boolean
  /** Kontekstual agar hierarki tak melompat: `/projects` (h1 daftar) → 2; di bawah section h2 → 3. */
  headingLevel?: 2 | 3
  /** Kartu pertama daftar `/projects` — cover dimuat eager + preload, bukan LCP yang di-lazy-load. */
  priority?: boolean
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const imgFailed = ref(false)

const coverLoading = computed(() =>
  priority
    ? { loading: 'eager' as const, fetchpriority: 'high' as const, preload: true }
    : { loading: 'lazy' as const },
)

const statusVariant = computed(() => {
  switch (project.status) {
    case 'COMPLETED': return 'success' as const
    case 'IN_PROGRESS': return 'warning' as const
    default: return 'neutral' as const
  }
})
</script>

<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden border border-border bg-surface rounded-[var(--radius-md)] transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-fg-subtle/40 hover:shadow-[var(--shadow-lift)]"
  >
    <div class="relative aspect-[16/9] overflow-hidden bg-surface-2">
      <NuxtImg
        v-if="!imgFailed"
        :src="project.cover.src"
        :alt="project.cover.alt"
        :width="640"
        :height="360"
        sizes="xs:100vw sm:50vw lg:400px"
        v-bind="coverLoading"
        class="size-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
        @error="imgFailed = true"
      />
      <div
        v-else
        class="grid size-full place-items-center text-fg-subtle"
      >
        <Icon
          name="image-off"
          :size="24"
        />
      </div>

      <span
        v-if="fallback"
        class="absolute top-2 right-2 border border-border bg-surface/90 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-fg-muted rounded-[var(--radius-sm)]"
        :title="t('fallback.cardBadgeLabel')"
      >
        {{ t('fallback.cardBadge') }}
      </span>
    </div>

    <div class="flex flex-1 flex-col p-5">
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

      <component
        :is="`h${headingLevel}`"
        class="mt-3 text-base font-semibold text-fg"
      >
        {{ project.title }}
      </component>
      <p class="mt-1 line-clamp-2 text-sm text-fg-muted">
        {{ project.shortDescription }}
      </p>

      <ul class="mt-3 flex flex-wrap gap-1.5">
        <li
          v-for="tech in project.technologies.slice(0, 4)"
          :key="tech"
        >
          <Badge :pill="false">
            {{ tech }}
          </Badge>
        </li>
      </ul>

      <div class="mt-auto pt-4">
        <NuxtLink
          :to="localePath(`/projects/${slug}`)"
          class="inline-flex items-center gap-1 text-sm font-medium text-accent after:absolute after:inset-0"
        >
          {{ t('project.viewProject') }}
          <Icon
            name="arrow-right"
            :size="14"
            class="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </NuxtLink>

        <div
          v-if="project.links?.github || project.links?.demo"
          class="relative z-10 mt-3 flex flex-wrap gap-4 text-sm text-fg-muted"
        >
          <a
            v-if="project.links?.github"
            :href="project.links.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 hover:text-fg"
          >
            <Icon
              name="github"
              :size="14"
            />
            {{ t('project.source') }}
          </a>
          <a
            v-if="project.links?.demo"
            :href="project.links.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 hover:text-fg"
          >
            <Icon
              name="external-link"
              :size="14"
            />
            {{ t('project.demo') }}
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
