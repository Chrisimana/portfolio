<script setup lang="ts">
import type { ProjectItem } from '~~/types'

interface Entry {
  project: ProjectItem
  slug: string
  fallback?: boolean
}

const { entries, headingLevel = 3, priorityFirst = false } = defineProps<{
  entries: Entry[]
  /** Diteruskan ke ProjectCard — lihat catatan di sana. */
  headingLevel?: 2 | 3
  /** Grid dekat puncak halaman → kartu pertama memuat cover eager supaya LCP tidak di-lazy-load. */
  priorityFirst?: boolean
}>()

const gridClass = computed(() => {
  if (entries.length <= 1) return 'max-w-md'
  if (entries.length === 2) return 'sm:grid-cols-2'
  return 'sm:grid-cols-2 lg:grid-cols-3'
})
</script>

<template>
  <ul
    class="grid gap-6"
    :class="gridClass"
  >
    <li
      v-for="(entry, i) in entries"
      :key="entry.slug"
    >
      <ProjectCard
        :project="entry.project"
        :slug="entry.slug"
        :fallback="entry.fallback ?? false"
        :heading-level="headingLevel"
        :priority="priorityFirst && i === 0"
      />
    </li>
  </ul>
</template>
