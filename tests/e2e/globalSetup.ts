import { execFile } from 'node:child_process'
import { mkdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { createServer, type Server } from 'node:http'
import { extname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import type { TestProject } from 'vitest/node'
import { BASE_URL, E2E_PORT, SITE_URL } from './config'

const run = promisify(execFile)
const root = fileURLToPath(new URL('../..', import.meta.url))
const PORT = E2E_PORT

const paths = {
  idProjects: join(root, 'content/id/projects'),
  enProjects: join(root, 'content/en/projects'),
  imagesProjects: join(root, 'public/images/projects'),
}

interface Fixture {
  slug: string
  category: 'WEB' | 'MOBILE'
  status: 'COMPLETED' | 'IN_PROGRESS'
  featuredOrder?: number
  publishedAt: string
  tech: string[]
  id: { title: string, short: string }
  en: { title: string, short: string } | null
}

const FIXTURES: Fixture[] = [
  {
    slug: 'toko-hijau',
    category: 'WEB',
    status: 'COMPLETED',
    featuredOrder: 1,
    publishedAt: '2026-01-15',
    tech: ['nuxt', 'typescript', 'tailwind'],
    id: { title: 'Toko Hijau', short: 'Etalase produk ramah lingkungan dengan checkout cepat.' },
    en: { title: 'Green Store', short: 'An eco-friendly product storefront with fast checkout.' },
  },
  {
    slug: 'panel-cuaca',
    category: 'WEB',
    status: 'IN_PROGRESS',
    featuredOrder: 2,
    publishedAt: '2025-06-01',
    tech: ['vue', 'typescript'],
    id: { title: 'Panel Cuaca Kota', short: 'Dasbor prakiraan cuaca kota secara real-time.' },
    en: { title: 'City Weather Panel', short: 'A real-time city weather forecast dashboard.' },
  },
  {
    slug: 'arsip-foto',
    category: 'WEB',
    status: 'COMPLETED',
    publishedAt: '2024-11-20',
    tech: ['nuxt-content', 'typescript'],
    id: { title: 'Arsip Foto', short: 'Galeri foto statis dengan pencarian metadata di browser.' },
    en: null,
  },
  {
    slug: 'aplikasi-lapangan',
    category: 'MOBILE',
    status: 'COMPLETED',
    publishedAt: '2025-02-10',
    tech: ['typescript'],
    id: { title: 'Aplikasi Survei Lapangan', short: 'Pencatatan data survei lapangan yang bekerja luring.' },
    en: { title: 'Field Survey App', short: 'Offline-first field survey data capture.' },
  },
]

function frontmatter(f: Fixture, loc: 'id' | 'en'): string {
  const t = loc === 'en' && f.en ? f.en : f.id
  const lines = [
    '---',
    `title: "${t.title}"`,
    `shortDescription: "${t.short}"`,
    `category: ${f.category}`,
    `status: ${f.status}`,
  ]
  if (f.featuredOrder !== undefined) {
    lines.push('featured: true', `featuredOrder: ${f.featuredOrder}`)
  }
  lines.push(
    `publishedAt: ${f.publishedAt}`,
    'published: true',
    'cover:',
    `  src: /images/projects/${f.slug}/cover.webp`,
    `  alt: "Tangkapan layar ${t.title}"`,
    `technologies: [${f.tech.join(', ')}]`,
    '---',
    '',
    '## Overview',
    '',
    `${t.title} — ${t.short}`,
    '',
    '## Proses',
    '',
    'Paragraf singkat tentang bagaimana project ini dikerjakan.',
    '',
  )
  return lines.join('\n')
}

async function makeCover(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true })
  // sharp tersedia lewat @nuxt/image (ipx).
  const sharp = (await import('sharp')).default
  const w = 1200
  const h = 675
  const buf = Buffer.alloc(w * h * 3)
  for (let i = 0; i < buf.length; i += 3) {
    buf[i] = (i / h) % 255
    buf[i + 1] = 120
    buf[i + 2] = 170
  }
  await sharp(buf, { raw: { width: w, height: h, channels: 3 } })
    .webp({ quality: 70 })
    .toFile(join(dir, 'cover.webp'))
}

let server: Server | undefined
let stashed = false

async function stashOriginal(): Promise<void> {
  for (const p of [paths.idProjects, paths.enProjects]) {
    if (existsSync(p)) await rename(p, `${p}.e2ebak`)
    await mkdir(p, { recursive: true })
  }
  if (existsSync(paths.imagesProjects)) {
    await rename(paths.imagesProjects, `${paths.imagesProjects}.e2ebak`)
  }
  stashed = true
}

async function restoreOriginal(): Promise<void> {
  if (!stashed) return
  for (const p of [paths.idProjects, paths.enProjects]) {
    await rm(p, { recursive: true, force: true })
    if (existsSync(`${p}.e2ebak`)) await rename(`${p}.e2ebak`, p)
  }
  await rm(paths.imagesProjects, { recursive: true, force: true })
  if (existsSync(`${paths.imagesProjects}.e2ebak`)) {
    await rename(`${paths.imagesProjects}.e2ebak`, paths.imagesProjects)
  }
}

async function writeFixtures(): Promise<void> {
  await mkdir(paths.imagesProjects, { recursive: true })
  for (const f of FIXTURES) {
    await writeFile(join(paths.idProjects, `${f.slug}.md`), frontmatter(f, 'id'))
    if (f.en) await writeFile(join(paths.enProjects, `${f.slug}.md`), frontmatter(f, 'en'))
    await makeCover(join(paths.imagesProjects, f.slug))
  }
}

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
}

async function resolveFile(dir: string, urlPath: string): Promise<{ file: string, status: number }> {
  const rel = decodeURIComponent(urlPath.split('?')[0]!)
  let file = join(dir, rel)
  try {
    const s = await stat(file)
    if (s.isDirectory()) file = join(file, 'index.html')
    return { file, status: 200 }
  }
  catch {
    if (existsSync(`${file}.html`)) return { file: `${file}.html`, status: 200 }
    // SPA fallback Nuxt untuk rute yang tak diprerender.
    if (!extname(file)) return { file: join(dir, '200.html'), status: 200 }
    return { file: join(dir, '404.html'), status: 404 }
  }
}

function startServer(dir: string): Promise<void> {
  server = createServer(async (req, res) => {
    try {
      const { file, status } = await resolveFile(dir, req.url ?? '/')
      res.statusCode = status
      res.setHeader('content-type', CONTENT_TYPES[extname(file)] ?? 'application/octet-stream')
      res.end(await readFile(file))
    }
    catch (e) {
      res.statusCode = 500
      res.end(String(e))
    }
  })
  return new Promise((resolve, reject) => {
    server!.once('error', reject)
    server!.listen(PORT, () => resolve())
  })
}

export default async function setup({ provide }: TestProject): Promise<() => Promise<void>> {
  await stashOriginal()
  try {
    await writeFixtures()
    await rm(join(root, 'dist'), { recursive: true, force: true })
    await run(
      process.execPath,
      ['--run', 'generate'],
      {
        cwd: root,
        env: { ...process.env, NUXT_PUBLIC_SITE_URL: SITE_URL },
        maxBuffer: 1024 * 1024 * 64,
      },
    )

    await startServer(join(root, 'dist'))
    provide('baseURL', BASE_URL)
  }
  catch (err) {
    await restoreOriginal()
    throw err
  }

  return async () => {
    await new Promise<void>(resolve => (server ? server.close(() => resolve()) : resolve()))
    await restoreOriginal()
  }
}

declare module 'vitest' {
  interface ProvidedContext {
    baseURL: string
  }
}
