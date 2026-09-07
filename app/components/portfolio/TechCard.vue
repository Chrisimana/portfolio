<script setup lang="ts">
import type { Technology } from '~~/types'

const { tech } = defineProps<{ tech: Technology }>()

// Ubin monogram bila entri technologies.json belum punya `icon`.
const initial = computed(() => tech.name.trim().charAt(0).toUpperCase() || '?')
</script>

<template>
  <a
    :href="tech.url"
    target="_blank"
    rel="noopener noreferrer"
    class="flex h-full flex-col items-center justify-center gap-3 border border-border bg-surface px-3 py-6 text-center rounded-[var(--radius-md)] transition-colors duration-150 hover:border-fg-subtle/40 hover:bg-surface-2"
  >
    <img
      v-if="tech.icon"
      :src="tech.icon"
      alt=""
      width="40"
      height="40"
      loading="lazy"
      decoding="async"
      class="h-10 w-10 shrink-0 object-contain"
    >
    <span
      v-else
      aria-hidden="true"
      class="flex h-10 w-10 shrink-0 items-center justify-center border border-border text-base font-semibold text-fg-muted rounded-[var(--radius-sm)]"
    >{{ initial }}</span>

    <span class="text-sm font-medium text-fg">{{ tech.name }}</span>
  </a>
</template>
