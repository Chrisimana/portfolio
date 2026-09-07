<script setup lang="ts">
const { t } = useI18n()
const site = useSiteConfig()
const socials = useSocialLinks()

// Situs statis, tak pernah re-render setelah build — jadi tahun ini beku ke tahun prerender.
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border">
    <div class="mx-auto max-w-7xl px-6 py-12">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="text-sm text-fg-muted">
          <p>{{ t('footer.copyright', { year, name: site?.name ?? '' }) }}</p>
        </div>

        <ul class="flex flex-wrap items-center gap-1 text-fg-muted">
          <li v-if="site?.cv">
            <a
              :href="site.cv"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
              :aria-label="t('nav.openCv')"
              :title="t('nav.openCv')"
            >
              <Icon
                name="file-text"
                :size="18"
              />
            </a>
          </li>
          <li
            v-for="social in socials"
            :key="social.key"
          >
            <a
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
              :aria-label="social.label"
              :title="social.label"
            >
              <Icon
                :name="social.icon"
                :size="18"
              />
            </a>
          </li>
          <li v-if="site?.email">
            <a
              :href="`mailto:${site.email}`"
              class="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
              :aria-label="t('contact.emailLabel')"
              :title="t('contact.emailLabel')"
            >
              <Icon
                name="mail"
                :size="18"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="mt-10 flex justify-center">
        <button
          type="button"
          class="inline-flex min-h-11 items-center gap-1 px-2 text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
          @click="scrollToPageTop"
        >
          {{ t('actions.backToTop') }}
          <Icon
            name="arrow-up"
            :size="14"
          />
        </button>
      </div>
    </div>
  </footer>
</template>
