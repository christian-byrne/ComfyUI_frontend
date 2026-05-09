import { defineConfig } from 'vitest/config'

/**
 * Vitest config for the extension-api test suite (I-TF).
 *
 * Runs only the extension-api-v2 __tests__ stubs — isolated from the main
 * unit suite so the compat-floor gate can run independently on PRs that
 * touch src/extension-api/** or src/extension-api-v2/**.
 *
 * Coverage is scoped to src/extension-api/ (the public declaration files)
 * and src/extension-api-v2/ (the impl + test stubs).
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'src/extension-api-v2/__tests__/**/*.{test,spec}.{ts,mts}'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov'],
      include: [
        'src/extension-api/**/*.ts',
        'src/extension-api-v2/**/*.ts'
      ],
      exclude: [
        'src/extension-api-v2/__tests__/**'
      ]
    },
    reporter: process.env.CI ? ['verbose', 'github-actions'] : ['verbose']
  }
})
