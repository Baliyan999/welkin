<template>
  <header
    class="sticky top-0 z-50 bg-brand-gray dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-700 dark:border-gray-800"
    v-motion-slide-top
  >
    <nav class="section-wrapper py-3 desktop:py-4">
      <div class="flex items-center justify-between">
        <RouterLink to="/" class="flex items-center group">
          <img
            src="/images/logo/logo_Welkin_x_Midea.svg"
            alt="Welkin x Midea"
            class="h-8 md:h-10 desktop:h-12 w-auto"
          />
        </RouterLink>

        <div class="hidden tablet:flex items-center space-x-1 desktop:space-x-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="relative px-3 py-1.5 desktop:px-4 desktop:py-2 rounded-xl text-sm desktop:text-base font-medium transition-all duration-300"
            v-slot="{ isActive }"
          >
            <span
              v-if="isActive"
              class="glass-effect absolute inset-0 rounded-xl"
            />
            <span
              class="relative z-10 transition-colors duration-300"
              :class="{
                'text-white font-semibold': isActive,
                'text-gray-300 hover:text-brand-yellow': !isActive
              }"
            >
              {{ $t(item.key) }}
            </span>
          </RouterLink>
        </div>

        <div class="flex items-center space-x-2 desktop:space-x-4">
          <!-- Search Icon Button (desktop only) -->
          <button
            @click="searchModalOpen = true"
            class="hidden tablet:flex items-center justify-center p-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-800 transition-all duration-200"
            aria-label="Search"
          >
            <svg class="w-6 h-6 text-gray-300 hover:text-brand-yellow transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <LanguageSwitcher class="hidden min-[480px]:block" />
          <ThemeToggle />
          
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="tablet:hidden p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-all duration-300 text-gray-300"
            aria-label="Menu"
          >
            <div class="relative w-6 h-6">
              <svg
                class="absolute inset-0 w-6 h-6 transition-all duration-300"
                :class="{
                  'opacity-0 rotate-90': mobileMenuOpen,
                  'opacity-100 rotate-0': !mobileMenuOpen
                }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                class="absolute inset-0 w-6 h-6 transition-all duration-300"
                :class="{
                  'opacity-100 rotate-0': mobileMenuOpen,
                  'opacity-0 -rotate-90': !mobileMenuOpen
                }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <div
          v-if="mobileMenuOpen"
          class="tablet:hidden mt-4 pb-4 space-y-2"
        >
        <!-- Search Bar for Mobile - Top -->
        <div class="px-2 pb-4 border-b border-gray-700 dark:border-gray-700">
          <SearchBar />
        </div>
        
        <!-- Language Switcher for Mobile -->
        <div class="min-[480px]:hidden pb-2 border-b border-gray-700 dark:border-gray-700 flex justify-center">
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
                'text-white font-semibold': isActive,
                'text-gray-300 hover:text-brand-yellow': !isActive
              }"
            >
              {{ $t(item.key) }}
            </span>
          </RouterLink>
        </div>
        </div>
      </Transition>
    </nav>

    <!-- Search Modal (desktop only) -->
    <SearchModal v-model:isOpen="searchModalOpen" />
  </header>
</template>

<script setup lang="ts">
import { ref, Transition } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ThemeToggle from './ThemeToggle.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import SearchBar from './SearchBar.vue'
import SearchModal from './SearchModal.vue'

const { t } = useI18n()
const route = useRoute()
const mobileMenuOpen = ref(false)
const searchModalOpen = ref(false)

const navItems = [
  { path: '/', key: 'nav.home' },
  { path: '/catalog', key: 'nav.catalog' },
  { path: '/blog', key: 'nav.blog' },
  { path: '/about', key: 'nav.about' },
  { path: '/contacts', key: 'nav.contacts' },
]
</script>

