<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const site = useSiteConfig()

const headline = computed(() => site.value?.headline[locale.value as 'id' | 'en'] ?? '')
const roles = computed(() => site.value?.roles[locale.value as 'id' | 'en'] ?? [])
</script>

<template>
  <section class="relative scroll-mt-24 overflow-hidden">
    <!-- Visual pendukung: pola grid tipis yang memudar, tidak mengganggu teks. -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_75%)]"
      :style="{
        backgroundImage:
          'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
      }"
    />

    <div class="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div class="flex flex-col-reverse items-center gap-12 md:flex-row md:justify-between">
        <div class="md:max-w-2xl">
          <p class="text-fg-muted">
            {{ t('hero.greeting') }}
          </p>
          <h1 class="mt-3 text-hero font-semibold text-fg">
            {{ site?.name }}
          </h1>

          <ul
            v-if="roles.length"
            class="mt-5 flex flex-wrap gap-2"
          >
            <li
              v-for="(role, i) in roles"
              :key="role"
            >
              <Badge :variant="i === 0 ? 'accent' : 'outline'">
                {{ role }}
              </Badge>
            </li>
          </ul>

          <p class="mt-5 max-w-xl text-h3 leading-snug text-fg-muted">
            {{ headline }}
          </p>

          <div class="mt-10 flex flex-wrap gap-3">
            <Button
              variant="primary"
              :to="localePath('/projects')"
            >
              {{ t('actions.viewProjects') }}
              <Icon
                name="arrow-right"
                :size="16"
              />
            </Button>
            <Button
              v-if="site?.cv"
              variant="secondary"
              :href="site.cv"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('actions.downloadCv') }}
              <Icon
                name="external-link"
                :size="16"
              />
            </Button>
          </div>
        </div>

        <img
          :src="'/images/site/profil.webp'"
          :alt="site?.name ?? ''"
          width="320"
          height="320"
          fetchpriority="high"
          class="size-56 shrink-0 border border-border object-cover rounded-full shadow-[var(--shadow-lift)] md:size-72 lg:size-80"
        >
      </div>
    </div>
  </section>
</template>
