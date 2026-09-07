export type ThemeChoice = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 400 // ~13 bulan

function systemTheme(): ResolvedTheme {
  if (!import.meta.client) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const cookie = useCookie<ResolvedTheme | undefined>('theme', {
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    path: '/',
  })

  const choice = computed<ThemeChoice>(() => cookie.value ?? 'system')
  const resolved = useState<ResolvedTheme>('theme:resolved', () => cookie.value ?? 'light')

  function applyToDom(theme: ResolvedTheme): void {
    if (import.meta.client) document.documentElement.setAttribute('data-theme', theme)
  }

  function set(next: ThemeChoice): void {
    if (next === 'system') {
      cookie.value = undefined
      resolved.value = systemTheme()
    }
    else {
      cookie.value = next
      resolved.value = next
    }
    applyToDom(resolved.value)
  }

  function toggle(): void {
    set(resolved.value === 'dark' ? 'light' : 'dark')
  }

  onMounted(() => {
    const current = document.documentElement.getAttribute('data-theme')
    resolved.value = current === 'dark' || current === 'light' ? current : systemTheme()

    // Ikuti perubahan preferensi sistem selama belum ada pilihan manual.
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (): void => {
      if (!cookie.value) {
        resolved.value = mq.matches ? 'dark' : 'light'
        applyToDom(resolved.value)
      }
    }
    mq.addEventListener('change', onChange)
    onScopeDispose(() => mq.removeEventListener('change', onChange))
  })

  return { choice, resolved, set, toggle }
}
