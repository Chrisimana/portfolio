import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import process from 'node:process'
import { imageMeta } from 'image-meta'
import { IMAGE_LIMITS } from '../shared/constants.ts'

const ROOT = process.cwd()
const IMAGES_DIR = join(ROOT, 'public', 'images')
const ALLOWED = new Set<string>(IMAGE_LIMITS.formats)

const errors: string[] = []
const fail = (msg: string): void => void errors.push(msg)

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.isFile()) out.push(full)
  }
  return out
}

function kb(bytes: number): string {
  return `${(bytes / 1024).toFixed(0)} KB`
}

if (!existsSync(IMAGES_DIR)) {
  console.log('\nimages:check — public/images belum ada, tidak ada gambar untuk diperiksa.\n')
  process.exit(0)
}

const files = walk(IMAGES_DIR)

if (!files.length) {
  console.log('\nimages:check — public/images kosong, tidak ada gambar untuk diperiksa.\n')
  process.exit(0)
}

for (const file of files) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  const ext = extname(file).toLowerCase().replace(/^\./, '')

  if (ext === 'svg') {
    const size = statSync(file).size
    if (size > IMAGE_LIMITS.svgMaxBytes) {
      fail(`${rel}: SVG ${kb(size)} melebihi batas ${kb(IMAGE_LIMITS.svgMaxBytes)} — ikon vektor harus mungil (satu path).`)
    }
    continue
  }

  if (!ALLOWED.has(ext)) {
    fail(`${rel}: format ".${ext}" tidak diizinkan — hanya ${IMAGE_LIMITS.formats.join(' / ')}.`)
    continue
  }

  const size = statSync(file).size
  if (size > IMAGE_LIMITS.maxBytes) {
    fail(`${rel}: ${kb(size)} melebihi batas ${kb(IMAGE_LIMITS.maxBytes)}. Kompres ulang sebelum commit.`)
  }

  let meta: ReturnType<typeof imageMeta>
  try {
    meta = imageMeta(readFileSync(file))
  }
  catch (e) {
    fail(`${rel}: dimensi gambar gagal dibaca (${(e as Error).message}). Berkas mungkin rusak.`)
    continue
  }

  const { width, height } = meta
  if (!width || !height) {
    fail(`${rel}: dimensi gambar tidak terbaca.`)
    continue
  }

  const longest = Math.max(width, height)
  if (longest > IMAGE_LIMITS.maxLongEdgePx) {
    fail(`${rel}: sisi terpanjang ${longest}px melebihi batas ${IMAGE_LIMITS.maxLongEdgePx}px.`)
  }

  const isCover = /(^|\/)cover\.[^/]+$/.test(rel)
  if (isCover) {
    const ratio = width / height
    if (Math.abs(ratio - IMAGE_LIMITS.cardAspect) > IMAGE_LIMITS.cardAspectTolerance) {
      fail(
        `${rel}: rasio ${width}×${height} (${ratio.toFixed(3)}) bukan 16:9 (${IMAGE_LIMITS.cardAspect.toFixed(3)}) `
        + `— cover dipakai sebagai gambar kartu, wajib 16:9.`,
      )
    }
  }
}

console.log(`\nimages:check — ${files.length} berkas di public/images`)
console.log('─'.repeat(50))

if (errors.length) {
  console.log(`\n✖ IMAGES:CHECK GAGAL — ${errors.length} pelanggaran:\n`)
  for (const e of errors) console.log(`  ✖ ${e}`)
  console.log('\nSatu gambar 8MB yang lolos akan menghancurkan target performa. Perbaiki di atas.\n')
  process.exit(1)
}

console.log(`\n✔ Semua gambar memenuhi batas.\n`)
