import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(async () => ({
  resolve: {
    alias: {
      '~~': root,
      '@@': root,
      '~': `${root}app`,
      '@': `${root}app`,
    },
  },
  test: {
    projects: [
      {
        resolve: { alias: { '~~': root, '@@': root, '~': `${root}app`, '@': `${root}app` } },
        test: {
          name: 'unit',
          include: ['tests/unit/**/*.test.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['tests/nuxt/**/*.test.ts'],
          environment: 'nuxt',
        },
      }),
      {
        test: {
          name: 'e2e',
          include: ['tests/e2e/**/*.test.ts'],
          environment: 'node',
          globalSetup: ['./tests/e2e/globalSetup.ts'],
          fileParallelism: false,
          testTimeout: 120_000,
          hookTimeout: 600_000,
        },
      },
    ],
  },
}))
