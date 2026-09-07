import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import process from 'node:process'

const OUTPUT_HEADERS = 'dist/_headers'
const PRODUCTION_BRANCH = 'main'

const isCloudflareBuild = process.env.CF_PAGES === '1'
const branch = process.env.CF_PAGES_BRANCH

if (!isCloudflareBuild) {
  console.log('[headers] Bukan build Cloudflare Pages (CF_PAGES tidak diset) — noindex preview dilewati.')
  process.exit(0)
}

if (branch === PRODUCTION_BRANCH) {
  console.log(`[headers] Branch produksi ("${branch}") — noindex preview dilewati.`)
  process.exit(0)
}

if (!existsSync(OUTPUT_HEADERS)) {
  throw new Error(`[headers] ${OUTPUT_HEADERS} tidak ditemukan. Skrip ini harus jalan setelah "nuxt generate" berhasil.`)
}

const contents = readFileSync(OUTPUT_HEADERS, 'utf8')

if (contents.includes('X-Robots-Tag: noindex')) {
  console.log('[headers] X-Robots-Tag: noindex sudah ada — dilewati.')
  process.exit(0)
}

const updated = contents.replace('/*\n', '/*\n  X-Robots-Tag: noindex, nofollow\n')

if (updated === contents) {
  throw new Error(`[headers] Blok "/* " tidak ditemukan di ${OUTPUT_HEADERS} — periksa isi public/_headers.`)
}

writeFileSync(OUTPUT_HEADERS, updated)
console.log(`[headers] Preview (branch: "${branch}") — X-Robots-Tag: noindex ditambahkan ke ${OUTPUT_HEADERS}.`)
