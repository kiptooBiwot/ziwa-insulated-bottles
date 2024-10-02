// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  debug: true,
  css: ['~/assets/css/main.css'],
  buildModules: [
    '@nuxtjs/date-fns',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-swiper',
    'nuxt3-meta-pixel',
    'nuxt-gtag',
    'dayjs-nuxt'
  ],
  swiper: {

  },
  facebook: {
    track: 'PageView',
    pixelId: process.env.FACEBOOK_PIXEL_ID,
    autoPageView: true,
    disabled: false
  },
  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore', 'storeToRefs', 'acceptHMRUpdate'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  runtimeConfig: {
    // mailerUser: '',
    // mailerPass: '',
    // mailerLog: '',
    // mailerDriver: '',
    // mailerHost: '',
    // mailerPort: '',
    // mailerSmtpTls: '',
    // mailerFromAddress: '',
    // mailerToAddress: '',
    RESEND_API: '',
    MAILHOST: '',
    MAILPORT: '',
    MAILUSER: '',
    MAILPASSWORD: '',
    CONTACTMAIL: '',
    MONGODB_URI: process.env.MONGODB_URI,
    CONSUMER_KEY: process.env.CONSUMER_KEY,
    CONSUMER_SECRET: process.env.CONSUMER_SECRET,
  }
})