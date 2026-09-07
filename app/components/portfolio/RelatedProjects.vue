<script setup lang="ts">
/**
 * Related projects: kategori sama, published, non-ARCHIVED, bukan
 * project ini, urut terbaru dulu, maksimal 3. Tidak acak. Section tidak
 * dirender bila tidak ada yang relevan.
 */
const { category, currentSlug } = defineProps<{ category: string, currentSlug: string }>()

const { t } = useI18n()
const related = useRelatedProjects(() => category, () => currentSlug)
</script>

<template>
  <section
    v-if="related.length"
    class="border-t border-border pt-14"
  >
    <h2 class="text-h3 font-semibold text-fg">
      {{ t('project.related') }}
    </h2>
    <div class="mt-6">
      <ProjectGrid :entries="related" />
    </div>
  </section>
</template>
