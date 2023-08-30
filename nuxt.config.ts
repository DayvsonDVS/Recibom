// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: [
    'normalize.css',
    'bumi-components-new/dist/style.css',
    '@cataline.io/darpi/dist/style.css',
    '@/assets/scss/main.scss'
  ],
  build: {
    transpile: ['@cataline.io/darpi']
  },
  modules: ['@pinia/nuxt'],
  components: [{ path: '@/components', pathPrefix: false }],
  dir: {
    pages: 'components/pages/'
  }
})
