import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import matter from 'gray-matter'

function assertSiteUrl(): void {
  const siteUrl = process.env.NUXT_PUBLIC_SITE_URL?.trim()
  if (!siteUrl) {
    throw new Error(
      '\n[config] NUXT_PUBLIC_SITE_URL kosong.\n'
      + 'Variabel ini wajib untuk build produksi (canonical URL, sitemap, Open Graph).\n'
      + 'Set di environment Cloudflare Pages atau di file .env lokal.\n'
      + 'Lihat .env.example.\n',
    )
  }
}

function isPublishedFile(file: string): boolean {
  try {
    return matter(readFileSync(file, 'utf8')).data.published === true
  }
  catch {
    return false
  }
}

function publishedProjectRoutes(): string[] {
  const idDir = join(process.cwd(), 'content', 'id', 'projects')
  const enDir = join(process.cwd(), 'content', 'en', 'projects')
  if (!existsSync(idDir)) return []

  const routes: string[] = []
  for (const entry of readdirSync(idDir)) {
    if (!entry.endsWith('.md') || !isPublishedFile(join(idDir, entry))) continue
    const slug = entry.replace(/\.md$/, '')
    routes.push(`/id/projects/${slug}`)
    const enFile = join(enDir, entry)
    if (existsSync(enFile) && isPublishedFile(enFile)) routes.push(`/en/projects/${slug}`)
  }
  return routes
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',

    (_inlineOptions, nuxt) => {
      if (nuxt.options.image) {
        nuxt.options.image.provider = nuxt.options.dev ? 'ipx' : 'ipxStatic'
      }
    },
    '@nuxt/image',
    '@nuxtjs/i18n',

    (_inlineOptions, nuxt) => {
      if (!nuxt.options.dev && !nuxt.options._prepare && !nuxt.options.test) {
        nuxt.options.nitro.preset = 'cloudflare_pages'
      }
      nuxt.hook('build:before', () => {
        if (nuxt.options.dev || nuxt.options._prepare || nuxt.options.test) return
        assertSiteUrl()
      })
    },
  ],

  // Nama komponen tanpa prefiks path.
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  devtools: { enabled: true },

  app: {
    head: {
      // `lang` HTML dikelola @nuxtjs/i18n per route (useLocaleHead di app.vue).
      script: [
        {
          innerHTML:
            'try{var m=document.cookie.match(/(?:^|;\\s*)theme=(dark|light)\\b/),'
            + 't=m?m[1]:matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";'
            + 'document.documentElement.setAttribute("data-theme",t)}'
            + 'catch(e){document.documentElement.setAttribute("data-theme","light")}',
          tagPosition: 'head',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: { nativeSqlite: true },
  },

  runtimeConfig: {
    public: {
      siteUrl: '',
      analyticsToken: '',
    },
  },

  devServer: {
    host: '0.0.0.0',
  },

  features: {
    inlineStyles: true,
  },
  compatibilityDate: '2026-09-04',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/search-index/id.json',
        '/search-index/en.json',
        '/robots.txt',
        '/sitemap.xml',
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['lucide-vue-next'],
    },
  },

  typescript: {
    strict: true,
    tsConfig: {
      include: ['../tests/unit/**/*', '../tests/e2e/**/*', '../vitest.config.ts'],
    },
  },

  hooks: {
    'nitro:config': (nitroConfig) => {
      nitroConfig.prerender ||= {}
      nitroConfig.prerender.routes = [
        ...(nitroConfig.prerender.routes ?? []),
        ...publishedProjectRoutes(),
      ]
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  // dua bahasa, ID default, semua route berprefiks (/id, /en),
  i18n: {
    strategy: 'prefix',
    defaultLocale: 'id',
    locales: [
      { code: 'id', language: 'id-ID', name: 'Indonesia', file: 'id.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    // bukan cookie/deteksi browser, konsisten dengan situs prerender penuh.
    detectBrowserLanguage: false,
    // Dasar URL absolut untuk hreflang & canonical.
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
  },

  image: {
    quality: 72,
  },
})
