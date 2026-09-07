<script setup lang="ts">
// Status tidak boleh hanya mengandalkan warna — pakai `dot` atau sertakan ikon/teks yang jelas.
type Variant = 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'outline'

const {
  variant = 'neutral',
  pill = true,
  dot = false,
} = defineProps<{
  variant?: Variant
  pill?: boolean
  dot?: boolean
}>()

const variants: Record<Variant, string> = {
  neutral: 'bg-surface-2 text-fg-muted',
  accent: 'bg-accent-soft text-accent',
  success: 'bg-surface-2 text-success',
  warning: 'bg-surface-2 text-warning',
  error: 'bg-surface-2 text-error',
  outline: 'border border-border text-fg-muted',
}

const dotColor: Record<Variant, string> = {
  neutral: 'bg-fg-subtle',
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  outline: 'bg-fg-subtle',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium"
    :class="[variants[variant], pill ? 'rounded-full' : 'rounded-[var(--radius-sm)]']"
  >
    <span
      v-if="dot"
      class="size-1.5 rounded-full"
      :class="dotColor[variant]"
    />
    <slot />
  </span>
</template>
