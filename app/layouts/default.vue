<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main"
      class="sr-only z-[60] rounded-[var(--radius-md)] bg-surface px-4 py-2 text-sm font-medium text-fg shadow-[var(--shadow-lift)] outline outline-2 outline-ring focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
    >
      {{ t('a11y.skipToContent') }}
    </a>

    <Navbar />

    <main
      id="main"
      tabindex="-1"
      class="flex-1 focus:outline-none"
    >
      <slot />
    </main>

    <Footer />
    <BackToTop />
  </div>
</template>
