<script setup lang="ts">
/**
 * < 2 kategori terisi → tidak merender apa pun. `categories` DIHITUNG dari
 * isi `content/` oleh pemanggil, bukan dari enum — saat kategori kedua
 * ditambahkan, filter muncul otomatis tanpa perubahan kode.
 */
const { categories } = defineProps<{ categories: readonly string[] }>()
const active = defineModel<string>({ default: 'all' })

const { t } = useI18n()

const chipClass = (isActive: boolean) =>
  isActive
    ? 'bg-accent-soft text-accent border-accent/30'
    : 'bg-surface text-fg-muted border-border hover:text-fg hover:border-fg-subtle/40'
</script>

<template>
  <div
    v-if="shouldRenderCategoryFilter(categories)"
    role="group"
    :aria-label="t('projects.filterLabel')"
    class="flex flex-wrap gap-2"
  >
    <button
      type="button"
      class="inline-flex min-h-9 items-center border px-3.5 text-sm font-medium rounded-full transition-colors duration-150"
      :class="chipClass(active === 'all')"
      :aria-pressed="active === 'all'"
      @click="active = 'all'"
    >
      {{ t('projects.filterAll') }}
    </button>
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      class="inline-flex min-h-9 items-center border px-3.5 text-sm font-medium rounded-full transition-colors duration-150"
      :class="chipClass(active === category)"
      :aria-pressed="active === category"
      @click="active = category"
    >
      {{ t(`category.${category}`) }}
    </button>
  </div>
</template>
