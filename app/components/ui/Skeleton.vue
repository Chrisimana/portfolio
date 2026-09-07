<script setup lang="ts">
/**
 * Skeleton ringkas untuk pemuatan index pencarian, tanpa pergeseran
 * tata letak. Animasi CSS murni; `prefers-reduced-motion` dihormati oleh aturan
 * global di main.css.
 */
const { rounded = 'md' } = defineProps<{
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}>()

const radii = {
  sm: 'rounded-[var(--radius-sm)]',
  md: 'rounded-[var(--radius-md)]',
  lg: 'rounded-[var(--radius-lg)]',
  full: 'rounded-full',
}
</script>

<template>
  <span
    class="block animate-pulse bg-surface-2"
    :class="radii[rounded]"
    aria-hidden="true"
  />
</template>
