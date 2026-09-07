<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

/**
 * Accent hanya untuk CTA/link. `primary` (accent penuh) dipakai
 * untuk CTA saja. Transisi 150–300ms, CSS murni.
 * Focus state datang dari aturan global `:focus-visible` di main.css.
 */
type Variant = 'primary' | 'secondary' | 'ghost' | 'link'
type Size = 'sm' | 'md' | 'lg'

const {
  variant = 'secondary',
  size = 'md',
  type = 'button',
  to,
  href,
  disabled = false,
} = defineProps<{
  variant?: Variant
  size?: Size
  type?: 'button' | 'submit' | 'reset'
  to?: RouteLocationRaw
  href?: string
  disabled?: boolean
}>()

const NuxtLink = resolveComponent('NuxtLink')
const as = computed(() => (to ? NuxtLink : href ? 'a' : 'button'))
const isNativeButton = computed(() => as.value === 'button')

const base
  = 'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap '
    + 'transition-[color,background-color,border-color,box-shadow,transform] duration-150 '
    + 'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-contrast hover:bg-accent-hover rounded-[var(--radius-md)]',
  secondary: 'bg-surface text-fg border border-border hover:bg-surface-2 rounded-[var(--radius-md)]',
  ghost: 'bg-transparent text-fg-muted hover:bg-surface-2 hover:text-fg rounded-[var(--radius-md)]',
  link: 'bg-transparent text-accent hover:text-accent-hover underline underline-offset-4 decoration-1 rounded-xs',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

const classes = computed(() => [
  base,
  variants[variant],
  variant === 'link' ? '' : sizes[size],
])
</script>

<template>
  <component
    :is="as"
    :to="to"
    :href="href"
    :type="isNativeButton ? type : undefined"
    :disabled="isNativeButton ? disabled : undefined"
    :aria-disabled="!isNativeButton && disabled ? 'true' : undefined"
    :class="classes"
  >
    <slot />
  </component>
</template>
