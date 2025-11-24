<template>
  <header
    class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    v-motion-slide-top
  >
    <nav class="section-wrapper py-4">
      <div class="flex items-center justify-between">
        <RouterLink to="/" class="flex items-center group">
          <img
            src="/images/logo/logo_Welkin_x_Midea.svg"
            alt="Welkin x Midea"
            class="h-10 md:h-12 w-auto"
          />
        </RouterLink>

        <div class="hidden md:flex items-center space-x-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="relative px-4 py-2 rounded-xl font-medium transition-all duration-300"
            v-slot="{ isActive }"
          >
            <span
              v-if="isActive"
              class="glass-effect absolute inset-0 rounded-xl"
            />
            <span
              class="relative z-10 transition-colors duration-300"
              :class="{
                'text-brand-gray dark:text-white font-semibold': isActive,
                'text-gray-700 dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow': !isActive
              }"
            >
              {{ $t(item.key) }}
            </span>
          </RouterLink>
        </div>

        <div class="flex items-center space-x-4">
          <LanguageSwitcher class="hidden min-[480px]:block" />
          <ThemeToggle />
          
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden mt-4 pb-4 space-y-2"
        v-motion-slide-down
      >
        <!-- Language Switcher for Mobile - Top -->
        <div class="min-[480px]:hidden pb-2 border-b border-gray-200 dark:border-gray-700 flex justify-center">
          <LanguageSwitcher />
        </div>
        
        <!-- Navigation Links - Centered -->
        <div class="flex flex-col items-center space-y-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="mobileMenuOpen = false"
            class="relative block px-4 py-2 rounded-xl font-medium transition-all duration-300 text-center w-full max-w-xs"
            v-slot="{ isActive }"
          >
            <span
              v-if="isActive"
              class="glass-effect absolute inset-0 rounded-xl"
            />
            <span
              class="relative z-10 transition-colors duration-300"
              :class="{
                'text-brand-gray dark:text-white font-semibold': isActive,
                'text-gray-700 dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow': !isActive
              }"
            >
              {{ $t(item.key) }}
            </span>
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ThemeToggle from './ThemeToggle.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  { path: '/', key: 'nav.home' },
  { path: '/catalog', key: 'nav.catalog' },
  { path: '/blog', key: 'nav.blog' },
  { path: '/about', key: 'nav.about' },
  { path: '/contacts', key: 'nav.contacts' },
]
</script>

