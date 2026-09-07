<script setup lang="ts">
import { LIMITS } from '~~/shared/constants'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const site = useSiteConfig()
const entries = useProjectList()
const categories = useFilledCategories()
const { query: searchQuery, debounced: searchTerm, matchedSlugs, isSearching, status: searchStatus } = useProjectSearch()

function updateQuery(patch: Record<string, string | undefined>): void {
  const query: Record<string, string> = {}
  for (const [key, value] of Object.entries({ ...route.query, ...patch })) {
    if (typeof value === 'string' && value) query[key] = value
  }
  router.push({ path: route.path, query })
}

const activeCategory = computed({
  get: () => (typeof route.query.category === 'string' ? route.query.category : 'all'),
  set: value => updateQuery({ category: value === 'all' ? undefined : value, page: undefined }),
})

const sortMode = computed({
  get: () => normalizeSortMode(route.query.sort),
  set: value => updateQuery({ sort: value === 'newest' ? undefined : value, page: undefined }),
})

const currentPage = computed(() => {
  const raw = Number.parseInt(String(route.query.page ?? '1'), 10)
  return Number.isFinite(raw) && raw > 0 ? raw : 1
})

// Pencarian mempersempit dulu, lalu filter kategori, lalu sort, lalu page.
const searchScoped = computed(() =>
  matchedSlugs.value === null
    ? entries.value
    : entries.value.filter(entry => matchedSlugs.value!.has(entry.slug)),
)

const filtered = computed(() =>
  activeCategory.value === 'all'
    ? searchScoped.value
    : searchScoped.value.filter(entry => entry.project.category === activeCategory.value),
)

const sorted = computed(() => sortProjectEntries(filtered.value, sortMode.value))

const totalPages = computed(() => Math.max(1, Math.ceil(sorted.value.length / LIMITS.projectsPerPage)))

const paged = computed(() => {
  const start = (currentPage.value - 1) * LIMITS.projectsPerPage
  return sorted.value.slice(start, start + LIMITS.projectsPerPage)
})

// Index masih dimuat sementara ada kata kunci -> skeleton, jangan tampilkan daftar penuh yang keliru.
const showSkeleton = computed(() => isSearching.value && searchStatus.value === 'loading')

function pageTo(page: number) {
  const query = { ...route.query } as Record<string, string>
  if (page <= 1) delete query.page
  else query.page = String(page)
  return { path: route.path, query }
}

usePageSeo({
  title: () => t('projects.listTitle'),
  description: () => t('projects.metaDescription'),
  image: () => site.value?.seo.ogImage,
})

const paginationLinks = computed(() => {
  const list: { rel: string, href: string }[] = []
  if (currentPage.value > 1) {
    list.push({ rel: 'prev', href: router.resolve(pageTo(currentPage.value - 1)).href })
  }
  if (currentPage.value < totalPages.value) {
    list.push({ rel: 'next', href: router.resolve(pageTo(currentPage.value + 1)).href })
  }
  // unhead v2 salah mempersempit tipe `rel` untuk <link>; `prev`/`next` sah per spec HTML.
  return list as unknown as { rel: 'canonical', href: string }[]
})
useHead({ link: paginationLinks })
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-16 md:py-24">
    <h1 class="text-h2 font-semibold text-fg">
      {{ t('projects.listTitle') }}
    </h1>

    <p
      v-if="!entries.length"
      class="mt-8 text-fg-muted"
    >
      {{ t('projects.empty') }}
    </p>

    <template v-else>
      <div class="mt-8 space-y-4">
        <ProjectSearch
          v-model="searchQuery"
          :status="searchStatus"
        />

        <div class="flex flex-wrap items-center justify-between gap-4">
          <ProjectFilter
            v-model="activeCategory"
            :categories="categories"
          />

          <label class="flex items-center gap-2 text-sm text-fg-muted">
            <span>{{ t('projects.sortLabel') }}</span>
            <select
              v-model="sortMode"
              class="h-9 border border-border bg-surface px-2 text-fg rounded-[var(--radius-sm)]"
            >
              <option value="newest">{{ t('projects.sortNewest') }}</option>
              <option value="oldest">{{ t('projects.sortOldest') }}</option>
              <option value="title">{{ t('projects.sortTitle') }}</option>
            </select>
          </label>
        </div>
      </div>

      <ul
        v-if="showSkeleton"
        class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <li
          v-for="n in 6"
          :key="n"
          class="overflow-hidden border border-border rounded-[var(--radius-md)]"
        >
          <Skeleton
            class="aspect-[16/9] w-full"
            rounded="sm"
          />
          <div class="space-y-2 p-5">
            <Skeleton class="h-4 w-1/3" />
            <Skeleton class="h-4 w-2/3" />
            <Skeleton class="h-3 w-full" />
          </div>
        </li>
      </ul>

      <template v-else>
        <p
          v-if="!paged.length && isSearching"
          class="mt-10 text-fg-muted"
        >
          {{ t('projects.searchNoMatch', { query: searchTerm }) }}
        </p>
        <p
          v-else-if="!paged.length"
          class="mt-10 text-fg-muted"
        >
          {{ t('projects.noMatch') }}
        </p>

        <template v-else>
          <div class="mt-10">
            <!-- h1 daftar ini langsung menaungi kartu, jadi judul kartu = h2. -->
            <ProjectGrid
              :entries="paged"
              :heading-level="2"
              priority-first
            />
          </div>

          <div
            v-if="totalPages > 1"
            class="mt-12"
          >
            <Pagination
              :page="currentPage"
              :total="totalPages"
              :to="pageTo"
            />
          </div>
        </template>
      </template>
    </template>
  </div>
</template>
