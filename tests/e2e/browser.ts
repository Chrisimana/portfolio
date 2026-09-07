import { chromium, type Browser, type Page } from 'playwright-core'
import { BASE_URL } from './config'

export async function launchBrowser(): Promise<Browser> {
  return chromium.launch({ channel: 'chrome', headless: true })
}

export function baseURL(): string {
  return BASE_URL
}

export async function openPage(
  browser: Browser,
  opts: { colorScheme?: 'light' | 'dark', viewport?: { width: number, height: number } } = {},
): Promise<Page> {
  const context = await browser.newContext({
    colorScheme: opts.colorScheme ?? 'light',
    viewport: opts.viewport ?? { width: 1280, height: 800 },
  })
  const page = await context.newPage()
  page.setDefaultTimeout(15_000)
  return page
}

export async function gotoHydrated(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.locator('header svg').first().waitFor({ state: 'attached', timeout: 15_000 })
}
