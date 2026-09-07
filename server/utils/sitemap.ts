import { queryCollection } from '@nuxt/content/server'
import type { H3Event } from 'h3'
import { slugFromPath } from '~~/shared/slug'


interface SitemapUrl {
  loc: string
  lastmod?: string
  alternates: Record<string, string>
}

function xmlEscape(value: string): string {
  return value.replace(/[<>&'"]/g, c => (
    { '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;' }[c] ?? c
  ))
}

export async function buildSitemap(event: H3Event, siteUrl: string): Promise<string> {
  const base = siteUrl.replace(/\/$/, '')

  const [idRows, enRows] = await Promise.all([
    queryCollection(event, 'projectsId')
      .where('published', '=', true)
      .select('path', 'publishedAt')
      .all(),
    queryCollection(event, 'projectsEn')
      .where('published', '=', true)
      .select('path')
      .all(),
  ])
  const enSlugs = new Set(enRows.map(row => slugFromPath(row.path)))

  const urls: SitemapUrl[] = []

  for (const path of ['', '/projects']) {
    urls.push({
      loc: `${base}/id${path}`,
      alternates: { id: `${base}/id${path}`, en: `${base}/en${path}` },
    })
    urls.push({
      loc: `${base}/en${path}`,
      alternates: { id: `${base}/id${path}`, en: `${base}/en${path}` },
    })
  }

  for (const row of idRows) {
    const slug = slugFromPath(row.path)
    const hasEn = enSlugs.has(slug)
    const alternates: Record<string, string> = { id: `${base}/id/projects/${slug}` }
    if (hasEn) alternates.en = `${base}/en/projects/${slug}`

    urls.push({ loc: `${base}/id/projects/${slug}`, lastmod: row.publishedAt, alternates })
    if (hasEn) {
      urls.push({ loc: `${base}/en/projects/${slug}`, lastmod: row.publishedAt, alternates })
    }
  }

  const body = urls
    .map((url) => {
      const alts = Object.entries(url.alternates)
        .map(([code, href]) =>
          `    <xhtml:link rel="alternate" hreflang="${code}" href="${xmlEscape(href)}"/>`,
        )
        .join('\n')
      return [
        '  <url>',
        `    <loc>${xmlEscape(url.loc)}</loc>`,
        url.lastmod ? `    <lastmod>${xmlEscape(url.lastmod)}</lastmod>` : '',
        alts,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`
}
