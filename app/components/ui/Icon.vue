<script setup lang="ts">
import { iconRegistry } from './iconRegistry'
import type { IconName } from './iconRegistry'

const { name, size = 20, strokeWidth = 2 } = defineProps<{
  name: IconName
  size?: number
  strokeWidth?: number
}>()

const component = computed(() => iconRegistry[name])
</script>

<template>
  <component
    :is="component"
    :size="size"
    :stroke-width="strokeWidth"
    :aria-hidden="true"
    focusable="false"
  />
</template>
