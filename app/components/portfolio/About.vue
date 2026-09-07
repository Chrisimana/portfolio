<script setup lang="ts">
const { t, locale } = useI18n()
const site = useSiteConfig()
const categories = useFilledCategories()

const bio = computed(() => site.value?.bio[locale.value as 'id' | 'en'] ?? '')

// "Fokus saat ini" hanya menyebut area pengembangan. Kategori DESIGN sudah
// diwakili project UI/UX tersendiri, jadi tidak diulang di sini.
const focusAreas = computed(() => categories.value.filter(category => category !== 'DESIGN'))
</script>

<template>
  <section class="scroll-mt-24 border-t border-border">
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <h2 class="text-h2 font-semibold text-fg">
        {{ t('about.heading') }}
      </h2>

      <p class="mt-6 leading-relaxed text-fg-muted">
        {{ bio }}
      </p>

      <template v-if="focusAreas.length">
        <p class="mt-8 font-medium text-fg">
          {{ t('about.focusedOn') }}
        </p>
        <ul class="mt-2 space-y-1 text-fg-muted">
          <li
            v-for="category in focusAreas"
            :key="category"
          >
            {{ t(`area.${category}`) }}
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>
