<script setup lang="ts">
import type { Locale } from '~~/types'

// Tautan asli (bukan tombol JS) ke path locale saat ini, switchLocalePath mempertahankan halaman, termasuk slug project.
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <nav
    :aria-label="t('langSwitcher.label')"
    class="flex items-center gap-2 text-sm"
  >
    <template
      v-for="(loc, i) in locales"
      :key="loc.code"
    >
      <span
        v-if="i > 0"
        aria-hidden="true"
        class="text-fg-subtle"
      >|</span>
      <NuxtLink
        :to="switchLocalePath(loc.code as Locale)"
        :hreflang="loc.code"
        :lang="loc.code"
        :aria-current="loc.code === locale ? 'true' : undefined"
        class="rounded-xs px-0.5 transition-colors duration-150"
        :class="loc.code === locale
          ? 'font-medium text-fg'
          : 'text-fg-subtle hover:text-fg-muted'"
      >
        {{ loc.code.toUpperCase() }}
      </NuxtLink>
    </template>
  </nav>
</template>
