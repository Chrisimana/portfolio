export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

  const siteUrl = (useRuntimeConfig().public.siteUrl || '').replace(/\/$/, '')
  const lines = ['User-agent: *', 'Allow: /']
  if (siteUrl) lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`)

  return lines.join('\n') + '\n'
})
