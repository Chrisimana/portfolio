import { existsSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const OUTPUT_DIR = 'dist'
const DUMP_ROUTE_DIR = join(OUTPUT_DIR, '__nuxt_content')
const OUTER_ATTEMPTS = 5
const OUTER_DELAY_MS = 1000

function sleepSync(ms: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

function tryRemove(): { removed: number, leftover: string[] } {
  let removed = 0
  const leftover: string[] = []

  if (existsSync(DUMP_ROUTE_DIR)) {
    try {
      rmSync(DUMP_ROUTE_DIR, { recursive: true, force: true, maxRetries: 10, retryDelay: 300 })
      removed++
    }
    catch {
      leftover.push(DUMP_ROUTE_DIR)
    }
  }

  if (existsSync(OUTPUT_DIR)) {
    for (const entry of readdirSync(OUTPUT_DIR)) {
      if (!/^dump\..+\.sql$/.test(entry)) continue
      const file = join(OUTPUT_DIR, entry)
      try {
        rmSync(file, { force: true })
        removed++
      }
      catch {
        leftover.push(file)
      }
    }
  }

  return { removed, leftover }
}

let result = tryRemove()
for (let attempt = 1; result.leftover.length > 0 && attempt < OUTER_ATTEMPTS; attempt++) {
  sleepSync(OUTER_DELAY_MS)
  result = tryRemove()
}

if (result.leftover.length > 0) {
  console.warn(
    `\n[content] PERINGATAN: gagal menghapus artefak dump @nuxt/content setelah ${OUTER_ATTEMPTS} percobaan `
    + `(kemungkinan dikunci antivirus/indexer Windows — bukan masalah kode):\n`
    + result.leftover.map(f => `  - ${f}`).join('\n')
    + `\n[content] Berkas ini memuat data mentah termasuk project "published: false". `
    + `JANGAN deploy folder ${OUTPUT_DIR} ini secara manual sebelum menghapusnya sendiri. `
    + `Build via Cloudflare Pages CI (Linux) tidak pernah mengalami kunci ini.\n`,
  )
}
else if (result.removed > 0) {
  console.log(`[content] ${result.removed} artefak dump @nuxt/content dihapus dari ${OUTPUT_DIR}.`)
}
else {
  console.log('[content] Tidak ada artefak dump @nuxt/content ditemukan — dilewati.')
}
