<script setup lang="ts">
const props = defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <NuxtImg
    :src="props.src"
    :alt="props.alt ?? ''"
    :width="props.width"
    :height="props.height"
    sizes="xs:100vw md:672px"
    loading="lazy"
    class="w-full border border-border object-cover rounded-[var(--radius-md)]"
  />
</template>
