import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import AxeBuilder from '@axe-core/playwright'
import type { Browser } from 'playwright-core'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { baseURL, gotoHydrated, launchBrowser, openPage } from './browser'

const PAGES = [
  { name: 'homepage', path: '/id' },
  { name: 'daftar-project', path: '/id/projects' },
  { name: 'detail-project', path: '/id/projects/toko-hijau' },
] as const

const THEMES = ['light', 'dark'] as const

describe('aksesibilitas', () => {
  let browser: Browser

  beforeAll(async () => {
    browser = await launchBrowser()
  })
  afterAll(async () => {
    await browser?.close()
  })

  for (const theme of THEMES) {
    for (const { name, path } of PAGES) {
      it(`${name} — tema ${theme} — tanpa pelanggaran axe`, async () => {
        const page = await openPage(browser, { colorScheme: theme })
        await gotoHydrated(page, `${baseURL()}${path}`)
        expect(await page.locator('html').getAttribute('data-theme')).toBe(theme)

        const { violations } = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze()

        if (violations.length) {
          const file = fileURLToPath(new URL(`./__axe-${name}-${theme}.json`, import.meta.url))
          writeFileSync(file, JSON.stringify(violations, null, 2))
          console.error(
            `\n${name} (${theme}) — ${violations.length} pelanggaran axe:\n`
            + violations
              .map(v => `  [${v.impact}] ${v.id}: ${v.help}\n`
                + v.nodes.map(n => `      ${n.target.join(' ')}`).join('\n'))
              .join('\n'),
          )
        }
        await page.context().close()
        expect(violations.map(v => v.id)).toEqual([])
      })
    }
  }
})
