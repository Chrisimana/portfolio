<script setup lang="ts">
// Input di-debounce di composable (useProjectSearch). Index gagal dimuat -> daftar tetap bisa dijelajahi.
const { status } = defineProps<{
  status: 'idle' | 'loading' | 'ready' | 'error'
}>()

const query = defineModel<string>({ default: '' })
const { t } = useI18n()
</script>

<template>
  <div class="w-full sm:max-w-xs">
    <Input
      id="project-search"
      v-model="query"
      :label="t('projects.searchLabel')"
      label-hidden
      icon="search"
      type="search"
      :placeholder="t('projects.searchPlaceholder')"
    />
    <p
      v-if="status === 'error'"
      role="status"
      class="mt-2 flex items-start gap-1.5 text-sm text-warning"
    >
      <Icon
        name="triangle-alert"
        :size="15"
        class="mt-0.5 shrink-0"
      />
      {{ t('projects.searchUnavailable') }}
    </p>
  </div>
</template>
