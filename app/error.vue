<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

const isNotFound = computed(() => error.statusCode === 404)

useHead(useLocaleHead({ lang: true, dir: true, seo: false }))
useHead({ title: () => (isNotFound.value ? t('notFound.title') : String(error.statusCode)) })
</script>

<template>
  <NuxtLayout>
    <div class="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center md:py-36">
      <p class="text-h1 font-semibold text-fg-subtle">
        {{ error.statusCode }}
      </p>
      <h1 class="mt-4 text-h3 font-semibold text-fg">
        {{ isNotFound ? t('notFound.title') : error.statusMessage }}
      </h1>
      <p
        v-if="isNotFound"
        class="mt-3 text-fg-muted"
      >
        {{ t('notFound.description') }}
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          variant="primary"
          :to="localePath('/')"
        >
          {{ t('notFound.toHome') }}
        </Button>
        <Button
          variant="secondary"
          :to="localePath('/projects')"
        >
          {{ t('notFound.toProjects') }}
        </Button>
      </div>
    </div>
  </NuxtLayout>
</template>
