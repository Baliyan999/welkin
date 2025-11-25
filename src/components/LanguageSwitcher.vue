<template>
  <div class="relative">
    <button
      @click="dropdownOpen = !dropdownOpen"
      class="relative p-1.5 md:px-2.5 md:py-1.5 desktop:px-3 desktop:py-2 rounded-xl transition-all duration-300 flex items-center gap-1 md:gap-1.5 desktop:gap-2"
      :class="{
        'text-white': dropdownOpen,
        'text-gray-300 hover:text-brand-yellow': !dropdownOpen
      }"
      aria-label="Change language"
    >
      <span
        v-if="dropdownOpen"
        class="glass-effect absolute inset-0 rounded-xl"
      />
      <span class="relative z-10 text-xs md:text-sm desktop:text-base font-medium">
        {{ currentLocale.toUpperCase() }}
      </span>
      <svg
        class="w-3 h-3 md:w-3.5 md:h-3.5 desktop:w-4 desktop:h-4 transition-transform duration-300 relative z-10"
        :class="{ 'rotate-180': dropdownOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
      v-if="dropdownOpen"
      class="absolute left-1/2 -translate-x-1/2 mt-2 w-36 md:w-40 glass-effect rounded-2xl p-2 shadow-2xl z-50 border border-white/20 dark:border-white/10"
      v-motion-slide-down
    >
      <button
        v-for="locale in locales"
        :key="locale.code"
        @click="changeLocale(locale.code)"
        class="w-full px-4 py-2.5 rounded-xl text-sm hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 flex items-center justify-between"
        :class="{
          'text-white bg-white/10': currentLocale === locale.code,
          'text-gray-300': currentLocale !== locale.code
        }"
      >
        <span>{{ locale.name }}</span>
        <span v-if="currentLocale === locale.code" class="text-brand-yellow text-lg">✓</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const dropdownOpen = ref(false)

const locales = [
  { code: 'ru', name: 'Русский' },
  { code: 'uz', name: "O'zbekcha" },
]

const currentLocale = computed(() => locale.value)

const changeLocale = (code: string) => {
  locale.value = code
  localStorage.setItem('locale', code)
  dropdownOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

