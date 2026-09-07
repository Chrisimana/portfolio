<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const site = useSiteConfig()

const drawerOpen = ref(false)
const activeHash = ref('')

const homePath = computed(() => localePath('/'))
const projectsPath = computed(() => localePath('/projects'))

interface NavItem {
  key: string
  to: RouteLocationRaw
  hash?: string
}

const navItems = computed<NavItem[]>(() => [
  { key: 'home', to: { path: homePath.value, hash: '#hero' }, hash: '#hero' },
  { key: 'about', to: { path: homePath.value, hash: '#about' }, hash: '#about' },
  { key: 'techStack', to: { path: homePath.value, hash: '#tech' }, hash: '#tech' },
  { key: 'projects', to: projectsPath.value },
])

const isHome = computed(() => route.path === homePath.value)

function isActive(item: NavItem): boolean {
  if (item.key === 'projects') return route.path.startsWith(projectsPath.value)
  return isHome.value && activeHash.value === item.hash
}

let sections: HTMLElement[] = []

function updateActiveHash(): void {
  const threshold = window.scrollY + 120
  let current = ''
  for (const section of sections) {
    if (section.offsetTop <= threshold) current = `#${section.id}`
  }

  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
  if (atBottom && sections.length) current = `#${sections[sections.length - 1]!.id}`
  activeHash.value = current
}

onMounted(() => {
  sections = ['hero', 'about', 'tech']
    .map(id => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null)

  if (sections.length) {
    updateActiveHash()
    window.addEventListener('scroll', updateActiveHash, { passive: true })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveHash)
})
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
      <NuxtLink
        :to="homePath"
        class="font-semibold tracking-tight text-fg"
      >
        {{ site?.name || 'Portfolio' }}
      </NuxtLink>

      <nav class="hidden items-center gap-6 md:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          class="text-sm transition-colors duration-150"
          :class="isActive(item) ? 'text-fg font-medium' : 'text-fg-muted hover:text-fg'"
          :aria-current="isActive(item) ? 'page' : undefined"
        >
          {{ t(`nav.${item.key}`) }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <LangSwitcher />
        <ThemeToggle />
        <Button
          v-if="site?.cv"
          variant="primary"
          size="sm"
          :href="site.cv"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('nav.openCv') }}
          <Icon
            name="external-link"
            :size="14"
          />
        </Button>
      </div>

      <button
        type="button"
        class="inline-flex size-10 items-center justify-center text-fg-muted rounded-[var(--radius-md)] hover:bg-surface-2 hover:text-fg md:hidden"
        :aria-label="t('nav.menu')"
        :aria-expanded="drawerOpen"
        @click="drawerOpen = true"
      >
        <Icon
          name="menu"
          :size="20"
        />
      </button>
    </div>

    <MobileDrawer
      v-model:open="drawerOpen"
      :items="navItems"
    />
  </header>
</template>
