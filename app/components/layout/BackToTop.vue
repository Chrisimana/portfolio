<script setup lang="ts">
const { t } = useI18n()
const visible = ref(false)

function onScroll(): void {
  visible.value = window.scrollY > window.innerHeight
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition
    enter-active-class="transition duration-200"
    enter-from-class="translate-y-2 opacity-0"
    leave-active-class="transition duration-200"
    leave-to-class="translate-y-2 opacity-0"
  >
    <button
      v-if="visible"
      type="button"
      :aria-label="t('actions.backToTop')"
      class="fixed right-5 bottom-5 z-30 inline-flex size-11 items-center justify-center border border-border bg-surface text-fg-muted rounded-full shadow-[var(--shadow-soft)] transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
      @click="scrollToPageTop"
    >
      <Icon
        name="arrow-up"
        :size="18"
      />
    </button>
  </Transition>
</template>
