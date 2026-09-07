export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'id',
  missingWarn: import.meta.dev,
  fallbackWarn: false,
}))
