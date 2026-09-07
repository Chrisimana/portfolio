export default defineNuxtPlugin(() => {
  const { analyticsToken, siteUrl } = useRuntimeConfig().public

  if (!analyticsToken) return

  if (siteUrl) {
    let expected: string
    try {
      expected = new URL(siteUrl).origin
    }
    catch {
      return
    }
    if (window.location.origin !== expected) return
  }

  useHead({
    script: [
      {
        'src': 'https://static.cloudflareinsights.com/beacon.min.js',
        'defer': true,
        'data-cf-beacon': JSON.stringify({ token: analyticsToken }),
      },
    ],
  })
})
