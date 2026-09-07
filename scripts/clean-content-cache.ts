import { rmSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

const root = process.cwd()

for (const dir of ['.nuxt/content', 'dist', '.output']) {
  try {
    rmSync(join(root, dir), { recursive: true, force: true, maxRetries: 3, retryDelay: 200 })
  }
  catch (err) {
    console.warn(`[clean-content-cache] lewati ${dir}: ${(err as Error).message}`)
  }
}

console.log('[clean-content-cache] .nuxt/content + dist dibuang.')
