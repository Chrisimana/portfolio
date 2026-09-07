import type { Browser, Page } from 'playwright-core'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { baseURL, gotoHydrated, launchBrowser, openPage } from './browser'

describe('alur pengunjung', () => {
  let browser: Browser
  let page: Page
  const h1 = () => page.getByRole('heading', { level: 1 })

  beforeAll(async () => {
    browser = await launchBrowser()
    page = await openPage(browser)
  })
  afterAll(async () => {
    await browser?.close()
  })

  it('homepage terbuka dan menautkan ke daftar project', async () => {
    await gotoHydrated(page, `${baseURL()}/id`)
    expect(await page.title()).toMatch(/\S/)
    await h1().waitFor()

    await page.locator('header').getByRole('link', { name: 'Proyek', exact: true }).click()
    await page.waitForURL(/\/id\/projects$/)
  })

  it('daftar menampilkan filter kategori (2 kategori fikstur aktif)', async () => {
    const group = page.getByRole('group')
    await group.waitFor()
    // "Semua" + Web + Mobile
    expect(await group.getByRole('button').count()).toBe(3)
    expect(await page.getByRole('article').count()).toBe(4)
  })

  it('pencarian menyaring daftar dan menyimpan kata kunci di URL', async () => {
    await page.locator('#project-search').fill('cuaca')
    await page.waitForURL(/[?&]q=cuaca/, { timeout: 8000 })
    await expect.poll(() => page.getByRole('article').count(), { timeout: 8000 }).toBe(1)
    expect(await page.getByRole('article').first().textContent()).toMatch(/cuaca/i)
  })

  it('membuka halaman detail project', async () => {
    await page.getByRole('article').getByRole('link', { name: /lihat proyek/i }).click()
    await page.waitForURL(/\/id\/projects\/panel-cuaca$/)
    await h1().waitFor()
    expect(await h1().textContent()).toContain('Panel Cuaca Kota')
    expect(await page.locator('main img').first().isVisible()).toBe(true)
  })

  it('ganti bahasa mempertahankan halaman (slug sama, konten EN)', async () => {
    await page.locator('header').getByRole('link', { name: 'EN', exact: true }).click()
    await page.waitForURL(/\/en\/projects\/panel-cuaca$/)
    await h1().waitFor()
    expect(await h1().textContent()).toContain('City Weather Panel')
  })

  it('ganti tema membalik <html data-theme> dan bertahan setelah reload', async () => {
    const before = await page.locator('html').getAttribute('data-theme')
    await page.locator('header').getByRole('button').first().click()
    await expect
      .poll(() => page.locator('html').getAttribute('data-theme'), { timeout: 8000 })
      .not.toBe(before)

    const after = await page.locator('html').getAttribute('data-theme')
    await page.reload({ waitUntil: 'domcontentloaded' })
    expect(await page.locator('html').getAttribute('data-theme')).toBe(after)
  })
})
