<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

// Berbasis URL (?page=N), bukan "load more" — setiap halaman dapat dibagikan dan diindeks.
const { page, total } = defineProps<{
  page: number
  total: number
  /** Membuat target route untuk nomor halaman tertentu. */
  to: (page: number) => RouteLocationRaw
}>()

const { t } = useI18n()

const pages = computed(() => Array.from({ length: total }, (_, i) => i + 1))
</script>

<template>
  <nav
    v-if="total > 1"
    :aria-label="t('pagination.label')"
    class="flex items-center justify-center gap-1"
  >
    <NuxtLink
      v-if="page > 1"
      :to="to(page - 1)"
      rel="prev"
      class="inline-flex h-9 items-center px-3 text-sm text-fg-muted rounded-[var(--radius-sm)] transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
    >
      {{ t('pagination.previous') }}
    </NuxtLink>

    <NuxtLink
      v-for="p in pages"
      :key="p"
      :to="to(p)"
      :aria-current="p === page ? 'page' : undefined"
      class="inline-flex size-9 items-center justify-center text-sm rounded-[var(--radius-sm)] transition-colors duration-150"
      :class="p === page
        ? 'bg-accent-soft font-medium text-accent'
        : 'text-fg-muted hover:bg-surface-2 hover:text-fg'"
    >
      {{ p }}
    </NuxtLink>

    <NuxtLink
      v-if="page < total"
      :to="to(page + 1)"
      rel="next"
      class="inline-flex h-9 items-center px-3 text-sm text-fg-muted rounded-[var(--radius-sm)] transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
    >
      {{ t('pagination.next') }}
    </NuxtLink>
  </nav>
</template>
