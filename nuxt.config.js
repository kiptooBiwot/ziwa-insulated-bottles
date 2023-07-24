// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-swiper'
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  runtimeConfig: {
    mailerUser: '',
    mailerPass: '',
    mailerLog: '',
    mailerDriver: '',
    mailerHost: '',
    mailerPort: '',
    mailerSmtpTls: '',
    mailerFromAddress: '',
    mailerToAddress: '',
    MAILHOST: '',
    MAILPORT: '',
    MAILUSER: '',
    MAILPASSWORD: '',
    CONTACTMAIL: ''
  }
})
