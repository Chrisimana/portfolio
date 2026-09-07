
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

const MAP: Record<string, string> = {
  'nuxt': 'nuxt',
  'vue': 'vuedotjs',
  'typescript': 'typescript',
  'tailwind': 'tailwindcss',
  'react': 'react',
  'pinia': 'pinia',
  'leaflet': 'leaflet',
  'chart-js': 'chartdotjs',
  'three-js': 'threedotjs',
  'gsap': 'greensock',
  'vitest': 'vitest',
  'git': 'git',
  'cloudflare-pages': 'cloudflarepages',
  'vite': 'vite',
  'html': 'html5',
  'css': 'css',
  'javascript': 'javascript',
  'nodejs': 'nodedotjs',
  'vercel': 'vercel',
  'github': 'github',
  'react-router': 'reactrouter',
  'figma': 'figma',
}

const FORCE_NEUTRAL = new Set(['vercel', 'three-js', 'github'])
const NEUTRAL = '8C93A1'

const OUT = join(process.cwd(), 'public', 'images', 'tech')
mkdirSync(OUT, { recursive: true })

function luminance(hex: string): number {
  const n = Number.parseInt(hex.replace('#', ''), 16)
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * c[0]! + 0.7152 * c[1]! + 0.0722 * c[2]!
}

const results: string[] = []

for (const [slug, si] of Object.entries(MAP)) {
  const base = await fetch(`https://cdn.simpleicons.org/${si}`)
  if (!base.ok) {
    console.warn(`  ! ${slug}: Simple Icons "${si}" -> HTTP ${base.status}, dilewati`)
    continue
  }
  let svg = await base.text()
  const hex = svg.match(/fill="(#[0-9a-fA-F]{6})"/)?.[1] ?? '#000000'
  const lum = luminance(hex)

  if (FORCE_NEUTRAL.has(slug) || lum < 0.05 || lum > 0.85) {
    svg = svg.replace(/fill="#[0-9a-fA-F]{6}"/, `fill="#${NEUTRAL}"`)
  }

  writeFileSync(join(OUT, `${slug}.svg`), `${svg.trim()}\n`)
  results.push(`  ✔ ${slug}.svg  (${si})`)
}

console.log(`\ngenerate-tech-icons -> public/images/tech/`)
console.log('─'.repeat(50))
console.log(results.join('\n'))
console.log(`\n${results.length} logo ditulis. Sisanya berkas tangan (lihat header) atau ubin monogram di TechCard.\n`)
