import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://preview.cu-freelance.tech/',
    pageLoadTimeout: 150000,
		defaultCommandTimeout: 150000,
		requestTimeout: 120000,

  },
})