import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'
import { z } from 'zod'
import { LIMITS, projectSchema, siteSchema, technologySchema } from '../shared/content-schema.ts'

const ROOT = process.cwd()
const CONTENT = join(ROOT, 'content')
const PUBLIC = join(ROOT, 'public')
const LOCALES = ['id', 'en'] as const
type Locale = (typeof LOCALES)[number]

const errors: string[] = []
const warnings: string[] = []
const fail = (msg: string): void => void errors.push(msg)
const warn = (msg: string): void => void warnings.push(msg)

function zodIssues(err: z.ZodError): string {
  return err.issues
    .map((i) => {
      const path = i.path.join('.') || '(root)'
      return `      - ${path}: ${i.message}`
    })
    .join('\n')
}

/* data files */

function listProjectFiles(locale: Locale): string[] {
  const dir = join(CONTENT, locale, 'projects')
  if (!existsSync(dir)) return []
  return readdirSync(dir).filter(f => f.endsWith('.md')).sort()
}

/* technologies.json */

const techPath = join(CONTENT, 'data', 'technologies.json')
const validTechSlugs = new Set<string>()

if (!existsSync(techPath)) {
  fail('content/data/technologies.json tidak ada.')
}
else {
  let raw: unknown
  try {
    raw = JSON.parse(readFileSync(techPath, 'utf8'))
  }
  catch (e) {
    fail(`content/data/technologies.json bukan JSON valid: ${(e as Error).message}`)
    raw = []
  }
  const arr = z.array(technologySchema).safeParse(raw)
  if (!arr.success) {
    fail(`content/data/technologies.json melanggar skema:\n${zodIssues(arr.error)}`)
  }
  else {
    const seen = new Set<string>()
    for (const tech of arr.data) {
      if (seen.has(tech.slug)) fail(`technologies.json: slug "${tech.slug}" duplikat (harus unik).`)
      seen.add(tech.slug)
      validTechSlugs.add(tech.slug)

      if (tech.icon) {
        if (!/^\/images\/tech\/[\w-]+\.(?:svg|webp)$/.test(tech.icon)) {
          fail(`technologies.json: "${tech.slug}" icon "${tech.icon}" harus path /images/tech/<slug>.(svg|webp).`)
        }
        else if (!existsSync(join(PUBLIC, tech.icon.replace(/^\//, '')))) {
          fail(`technologies.json: "${tech.slug}" icon "${tech.icon}" tidak ditemukan di public/. Jalankan scripts/generate-tech-icons.ts.`)
        }
      }
      else if (tech.visible) {
        warn(`technologies.json: "${tech.slug}" visible tanpa icon — TechCard memakai ubin monogram.`)
      }
    }
    const visibleCount = arr.data.filter(t => t.visible).length
    if (visibleCount > LIMITS.techVisibleMax) {
      warn(`technologies.json: ${visibleCount} teknologi visible, di atas batas tampil (${LIMITS.techVisibleMax}).`)
    }
  }
}

/* site.json */

const sitePath = join(CONTENT, 'data', 'site.json')
if (!existsSync(sitePath)) {
  fail('content/data/site.json tidak ada.')
}
else {
  let raw: unknown
  try {
    raw = JSON.parse(readFileSync(sitePath, 'utf8'))
  }
  catch (e) {
    fail(`content/data/site.json bukan JSON valid: ${(e as Error).message}`)
    raw = {}
  }
  const parsed = siteSchema.safeParse(raw)
  if (!parsed.success) {
    fail(`content/data/site.json melanggar skema:\n${zodIssues(parsed.error)}`)
  }
  else {
    const s = parsed.data
    const emptyFields: string[] = []
    if (!s.name) emptyFields.push('name')
    if (!s.roles.id.length || !s.roles.en.length) emptyFields.push('roles')
    if (!s.email) emptyFields.push('email')
    if (!s.headline.id || !s.headline.en) emptyFields.push('headline')
    if (!s.bio.id || !s.bio.en) emptyFields.push('bio')
    if (emptyFields.length) {
      warn(`site.json: field masih kosong — isi sebelum rilis: ${emptyFields.join(', ')}.`)
    }
  }
}

/* projects */

interface ProjectRecord {
  slug: string
  locale: Locale
  data: z.infer<typeof projectSchema>
}

const projects: ProjectRecord[] = []
const idSlugs = new Set<string>()
const enSlugs = new Set<string>()

for (const locale of LOCALES) {
  for (const file of listProjectFiles(locale)) {
    const slug = file.replace(/\.md$/, '')
    const rel = relative(ROOT, join(CONTENT, locale, 'projects', file))
    ;(locale === 'id' ? idSlugs : enSlugs).add(slug)

    if (slug.length > LIMITS.slugMax) {
      fail(`${rel}: slug ${slug.length} karakter, melebihi batas (${LIMITS.slugMax}).`)
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      fail(`${rel}: slug "${slug}" harus huruf kecil dengan tanda hubung (kebab-case).`)
    }

    let fm: Record<string, unknown>
    try {
      fm = matter(readFileSync(join(CONTENT, locale, 'projects', file), 'utf8')).data
    }
    catch (e) {
      fail(`${rel}: frontmatter gagal diparse: ${(e as Error).message}`)
      continue
    }

    const parsed = projectSchema.safeParse(fm)
    if (!parsed.success) {
      fail(`${rel}: frontmatter melanggar skema:\n${zodIssues(parsed.error)}`)
      continue
    }

    const data = parsed.data
    projects.push({ slug, locale, data })

    for (const t of data.technologies) {
      if (!validTechSlugs.has(t)) {
        fail(`${rel}: technologies "${t}" tidak ada di content/data/technologies.json.`)
      }
    }

    if (data.published) {
      const images = [data.cover, ...(data.gallery ?? [])]
      for (const img of images) {
        const abs = join(PUBLIC, img.src.replace(/^\//, ''))
        if (!existsSync(abs)) {
          fail(`${rel}: gambar "${img.src}" tidak ditemukan di public/.`)
        }
      }
    }

    if (data.placeholder) {
      warn(`${rel}: berkas contoh (placeholder: true) — ganti dengan project asli sebelum published: true.`)
    }
  }
}

/* lintas-file */

for (const slug of enSlugs) {
  if (!idSlugs.has(slug)) {
    fail(`content/en/projects/${slug}.md ada tetapi content/id/projects/${slug}.md tidak — ID wajib jadi dasar.`)
  }
}

const featuredOrders = new Map<number, string[]>()
for (const p of projects) {
  if (p.locale !== 'id' || !p.data.featured || p.data.featuredOrder === undefined) continue
  const list = featuredOrders.get(p.data.featuredOrder) ?? []
  list.push(p.slug)
  featuredOrders.set(p.data.featuredOrder, list)
}
for (const [order, slugs] of featuredOrders) {
  if (slugs.length > 1) {
    fail(`featuredOrder ${order} dipakai lebih dari satu project featured: ${slugs.join(', ')}.`)
  }
}
const featuredCount = projects.filter(p => p.locale === 'id' && p.data.featured).length
if (featuredCount > LIMITS.featuredMax) {
  warn(`${featuredCount} project featured, di atas batas tampil homepage (${LIMITS.featuredMax}).`)
}

/* laporan kelengkapan */

const report = [...idSlugs].sort().map((slug) => {
  const en = enSlugs.has(slug) ? 'EN ✓' : 'EN —'
  return `  ${slug.padEnd(28)} ID ✓  ${en}`
})

/* output */

console.log('\nKelengkapan terjemahan')
console.log('─'.repeat(50))
console.log(report.length ? report.join('\n') : '  (belum ada project)')

if (warnings.length) {
  console.log(`\nPeringatan (${warnings.length}) — tidak menggagalkan build:`)
  for (const w of warnings) console.log(`  ! ${w}`)
}

if (errors.length) {
  console.log(`\n✖ VALIDASI GAGAL — ${errors.length} pelanggaran:\n`)
  for (const e of errors) console.log(`  ✖ ${e}`)
  console.log('\nPerbaiki di atas. Build tidak boleh jalan dengan konten tidak valid.\n')
  process.exit(1)
}

console.log(`\n✔ Validasi lolos — ${projects.length} berkas project, ${validTechSlugs.size} teknologi.\n`)
