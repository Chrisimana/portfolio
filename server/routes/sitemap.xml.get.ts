export default defineEventHandler(async (event) => {
  const siteUrl = useRuntimeConfig().public.siteUrl || ''
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return buildSitemap(event, siteUrl)
})
