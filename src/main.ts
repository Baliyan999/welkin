import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { MotionPlugin } from '@vueuse/motion'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import { useTheme } from './composables/useTheme'
import './style.css'

// i18n setup
import ru from './locales/ru.json'
import uz from './locales/uz.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('locale') || 'ru',
  fallbackLocale: 'ru',
  messages: {
    ru,
    uz,
  },
})

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(i18n)
app.use(MotionPlugin)
app.use(head)

// Initialize theme
useTheme().init()

app.mount('#app')

