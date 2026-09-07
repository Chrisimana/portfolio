import { execFile } from 'node:child_process'
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const run = promisify(execFile)
const root = fileURLToPath(new URL('../..', import.meta.url))
const validateScript = join(root, 'scripts/validate.ts')

describe('validasi konten', () => {
  let sandbox: string

  beforeAll(async () => {
    sandbox = await mkdtemp(join(tmpdir(), 'portofolio-content-'))
    await cp(join(root, 'content'), join(sandbox, 'content'), { recursive: true })
    await cp(join(root, 'public/images/projects'), join(sandbox, 'public/images/projects'), { recursive: true })
    await cp(join(root, 'public/images/tech'), join(sandbox, 'public/images/tech'), { recursive: true })
  })
  afterAll(async () => {
    await rm(sandbox, { recursive: true, force: true })
  })

  it('konten repo saat ini lolos skema (slug, technologies, gambar)', async () => {
    const { stdout } = await run('node', [validateScript], { cwd: sandbox })
    expect(stdout).toContain('Validasi lolos')
  })

  it('gambar repo saat ini memenuhi batas', async () => {
    const { stdout } = await run('node', [join(root, 'scripts/images-check.ts')], { cwd: root })
    expect(stdout).toMatch(/memenuhi batas|tidak ada gambar untuk diperiksa/)
  })

  it('validate MENGGAGALKAN (exit 1) saat sebuah field frontmatter dirusak', async () => {
    const target = join(sandbox, 'content/id/projects/winterra.md')
    const md = await readFile(target, 'utf8')
    await writeFile(target, md.replace(/^category:.*$/m, 'category: WEBSITE'))

    await expect(run('node', [validateScript], { cwd: sandbox }))
      .rejects.toMatchObject({ code: 1 })
  })
})
