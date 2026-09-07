import type { SearchableProject } from '~/utils/projectSearch'
import { LIMITS } from '~~/shared/constants'

type SearchEntry = SearchableProject

type SearchStatus = 'idle' | 'loading' | 'ready' | 'error'

export function useProjectSearch() {
  const { locale } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const index = shallowRef<SearchEntry[] | null>(null)
  const status = ref<SearchStatus>('idle')

  const query = ref(typeof route.query.q === 'string' ? route.query.q : '')
  const debounced = ref(query.value.trim())

  let timer: ReturnType<typeof setTimeout> | undefined
  watch(query, (value) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      debounced.value = value.trim()
      router.replace({
        query: {
          ...route.query,
          q: value.trim() || undefined,
          page: undefined,
        },
      })
    }, LIMITS.searchDebounceMs)
  })
  onScopeDispose(() => {
    if (timer) clearTimeout(timer)
  })

  async function load(): Promise<void> {
    status.value = 'loading'
    try {
      index.value = await $fetch<SearchEntry[]>(`/search-index/${locale.value}.json`)
      status.value = 'ready'
    }
    catch {
      index.value = null
      status.value = 'error'
    }
  }

  onMounted(load)
  watch(locale, () => {
    index.value = null
    load()
  })

  /** `null` bila tidak sedang mencari / index belum tersedia, daftar tetap dijelajahi penuh. */
  const matchedSlugs = computed(() => matchSearchQuery(index.value, debounced.value))

  const isSearching = computed(() => debounced.value.length > 0)

  return { query, debounced, matchedSlugs, isSearching, status }
}
