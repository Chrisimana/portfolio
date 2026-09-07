<script setup lang="ts">
import type { IconName } from './iconRegistry'

/**
 * Input teks generik. Dipakai antara lain oleh ProjectSearch.
 * Label wajib untuk aksesibilitas — visible atau sr-only.
 */
const {
  id,
  label,
  labelHidden = false,
  type = 'text',
  placeholder,
  icon,
  disabled = false,
} = defineProps<{
  id: string
  label: string
  labelHidden?: boolean
  type?: string
  placeholder?: string
  icon?: IconName
  disabled?: boolean
}>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <div>
    <label
      :for="id"
      :class="labelHidden ? 'sr-only' : 'mb-1.5 block text-sm font-medium text-fg-muted'"
    >
      {{ label }}
    </label>
    <div class="relative">
      <Icon
        v-if="icon"
        :name="icon"
        :size="18"
        class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-fg-subtle"
      />
      <input
        :id="id"
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        class="h-10 w-full border border-border bg-surface text-fg placeholder:text-fg-subtle rounded-[var(--radius-sm)] transition-colors duration-150 hover:border-fg-subtle/50 disabled:cursor-not-allowed disabled:opacity-50"
        :class="icon ? 'pr-3 pl-10' : 'px-3'"
      >
    </div>
  </div>
</template>
