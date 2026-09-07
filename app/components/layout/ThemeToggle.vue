<script setup lang="ts">
// Ikon dibungkus <ClientOnly> agar prerender (yang tidak tahu tema pengunjung) tidak memicu hydration mismatch.
const { resolved, toggle } = useTheme()
const { t } = useI18n()

const label = computed(() =>
  resolved.value === 'dark' ? t('theme.toLight') : t('theme.toDark'),
)
</script>

<template>
  <button
    type="button"
    class="inline-flex size-10 items-center justify-center border border-border bg-surface text-fg-muted rounded-[var(--radius-md)] transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <ClientOnly>
      <Icon
        :name="resolved === 'dark' ? 'sun' : 'moon'"
        :size="18"
      />
      <template #fallback>
        <span class="size-[18px]" />
      </template>
    </ClientOnly>
  </button>
</template>
