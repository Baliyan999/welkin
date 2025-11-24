// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-i18n',
    'nuxt-color-mode',
    'nuxt-headlessui',
    '@vueuse/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  i18n: {
    locales: [
      { code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский' },
      { code: 'uz', iso: 'uz-UZ', file: 'uz.json', name: "O'zbek" }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
      'Playfair Display': [700, 900]
    },
    display: 'swap',
    preload: true
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      siteName: 'Welkin',
      siteUrl: 'https://welkin.example.com'
    }
  }
})


