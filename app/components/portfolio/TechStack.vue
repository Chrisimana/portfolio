<script setup lang="ts">
import { LIMITS } from '~~/shared/constants'

// Hanya satu kategori terisi -> tidak render tab, grid langsung. Tidak ada kategori -> section tidak dirender.
const { t } = useI18n()
const { groups } = useTechnologies()

const showTabs = computed(() => groups.length >= 2)
const tabs = computed(() => groups.map(g => ({ id: g.category, label: g.category })))

const active = ref(groups[0]?.category ?? '')

function cap<T>(items: readonly T[]): T[] {
  return items.slice(0, LIMITS.techVisibleMax)
}
</script>

<template>
  <section
    v-if="groups.length"
    class="scroll-mt-24 border-t border-border"
  >
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <h2 class="text-h2 font-semibold text-fg">
        {{ t('techStack.heading') }}
      </h2>

      <Tabs
        v-if="showTabs"
        v-model="active"
        :tabs="tabs"
        class="mt-8"
      >
        <template
          v-for="group in groups"
          :key="group.category"
          #[group.category]
        >
          <ul class="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            <li
              v-for="tech in cap(group.items)"
              :key="tech.slug"
            >
              <TechCard :tech="tech" />
            </li>
          </ul>
        </template>
      </Tabs>

      <ul
        v-else
        class="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6"
      >
        <li
          v-for="tech in cap(groups[0]?.items ?? [])"
          :key="tech.slug"
        >
          <TechCard :tech="tech" />
        </li>
      </ul>
    </div>
  </section>
</template>
