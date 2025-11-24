import { ref } from 'vue'
import { usePreferredDark } from '@vueuse/core'

// Singleton для темы
let themeInstance: ReturnType<typeof createTheme> | null = null

function createTheme() {
  const isDark = ref<boolean>(false)
  const prefersDark = usePreferredDark()

  const applyTheme = () => {
    const root = document.documentElement
    if (isDark.value) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const init = () => {
    const stored = localStorage.getItem('theme')
    if (stored) {
      isDark.value = stored === 'dark'
    } else {
      // По умолчанию темная тема
      isDark.value = true
    }
    applyTheme()
  }

  const toggle = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  return {
    isDark,
    toggle,
    init,
  }
}

export function useTheme() {
  if (!themeInstance) {
    themeInstance = createTheme()
  }
  return themeInstance
}

