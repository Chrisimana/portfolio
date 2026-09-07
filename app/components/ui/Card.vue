<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

/**
 * Sering cukup border saja; shadow sangat ringan.
 * Kartu interaktif: hover lift halus, ~200ms, CSS murni.
 */
const {
  to,
  href,
  interactive = false,
  padding = 'md',
} = defineProps<{
  to?: RouteLocationRaw
  href?: string
  interactive?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}>()

const NuxtLink = resolveComponent('NuxtLink')
const as = computed(() => (to ? NuxtLink : href ? 'a' : 'div'))
const lift = computed(() => interactive || Boolean(to || href))

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}
</script>

<template>
  <component
    :is="as"
    :to="to"
    :href="href"
    class="block border border-border bg-surface rounded-[var(--radius-md)]"
    :class="[
      paddings[padding],
      lift
        ? 'transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-fg-subtle/40 hover:shadow-[var(--shadow-lift)]'
        : '',
    ]"
  >
    <slot />
  </component>
</template>
