<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

// Fokus terperangkap selama terbuka dan dikembalikan ke tombol pembuka saat ditutup; body dikunci dari scroll.
interface DrawerItem {
  key: string
  to: RouteLocationRaw
}

const { items } = defineProps<{ items: DrawerItem[] }>()
const open = defineModel<boolean>('open', { required: true })

const { t } = useI18n()
const site = useSiteConfig()

const panel = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

function close(): void {
  open.value = false
}

function focusable(): HTMLElement[] {
  if (!panel.value) return []
  return [
    ...panel.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ].filter(el => el.offsetParent !== null)
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    close()
    return
  }
  if (event.key !== 'Tab') return

  const els = focusable()
  if (!els.length) return
  const first = els[0]!
  const last = els[els.length - 1]!

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  }
  else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(open, async (isOpen) => {
  if (isOpen) {
    lastFocused = document.activeElement as HTMLElement | null
    document.documentElement.style.overflow = 'hidden'
    await nextTick()
    focusable()[0]?.focus()
  }
  else {
    document.documentElement.style.overflow = ''
    lastFocused?.focus()
  }
})

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 md:hidden"
      >
        <div
          class="absolute inset-0 bg-background/70"
          @click="close"
        />

        <div
          ref="panel"
          role="dialog"
          aria-modal="true"
          class="absolute inset-y-0 right-0 flex w-72 max-w-[85vw] flex-col border-l border-border bg-surface p-6 shadow-[var(--shadow-lift)]"
          @keydown="onKeydown"
        >
          <div class="flex justify-end">
            <button
              type="button"
              :aria-label="t('nav.closeMenu')"
              class="inline-flex size-10 items-center justify-center border border-border text-fg-muted rounded-[var(--radius-md)] hover:bg-surface-2 hover:text-fg"
              @click="close"
            >
              <Icon
                name="x"
                :size="18"
              />
            </button>
          </div>

          <nav class="mt-4 flex flex-col gap-1">
            <NuxtLink
              v-for="item in items"
              :key="item.key"
              :to="item.to"
              class="flex min-h-11 items-center px-3 py-2 text-fg-muted rounded-[var(--radius-sm)] transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
              @click="close"
            >
              {{ t(`nav.${item.key}`) }}
            </NuxtLink>
            <a
              v-if="site?.cv"
              :href="site.cv"
              target="_blank"
              rel="noopener noreferrer"
              class="flex min-h-11 items-center gap-1.5 px-3 py-2 text-fg-muted rounded-[var(--radius-sm)] transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
              @click="close"
            >
              {{ t('nav.openCv') }}
              <Icon
                name="external-link"
                :size="14"
              />
            </a>
            <span
              v-else
              class="flex min-h-11 items-center px-3 py-2 text-sm text-fg-subtle"
            >
              {{ t('actions.cvComingSoon') }}
            </span>
          </nav>

          <div class="mt-auto flex items-center justify-between border-t border-border pt-4">
            <LangSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
