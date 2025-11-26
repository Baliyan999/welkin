<template>
  <div class="flex flex-col min-h-screen relative overflow-hidden bg-[rgb(253,245,234)] dark:bg-gray-900">
    <Header />
    <main class="flex-grow flex items-start justify-center pt-4 md:pt-8 relative z-10">
      <!-- Background Logo -->
      <div class="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5 pointer-events-none">
        <img
          :src="logoPath"
          alt="Welkin x Midea"
          class="w-full max-w-4xl h-auto"
        />
      </div>

      <SectionWrapper>
        <div class="text-center max-w-2xl mx-auto pb-16 relative z-10" v-motion-slide-up>
          <!-- 404 Number -->
          <div class="mb-12 relative z-20" v-motion-pop>
            <h1 class="text-9xl md:text-[12rem] font-bold text-brand-yellow mb-4 leading-none drop-shadow-2xl dark:drop-shadow-2xl relative z-20">
              404
            </h1>
          </div>

          <!-- Error Message -->
          <div class="mb-8" v-motion-slide-up :delay="100">
            <h2 class="text-3xl md:text-4xl font-bold text-brand-gray dark:text-white mb-4">
              {{ $t('notFound.title') }}
            </h2>
            <p class="text-lg md:text-xl text-gray-700 dark:text-gray-400 leading-relaxed">
              {{ $t('notFound.description') }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex justify-center items-center" v-motion-slide-up :delay="200">
            <RouterLink
              to="/"
              class="btn btn-primary px-8 py-4 text-lg inline-flex items-center gap-2 group"
            >
              <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {{ $t('notFound.goHome') }}
            </RouterLink>
          </div>

          <!-- Decorative Elements -->
          <div class="mt-16 flex justify-center gap-4 opacity-50" v-motion-slide-up :delay="300">
            <div class="w-2 h-2 rounded-full bg-brand-yellow"></div>
            <div class="w-2 h-2 rounded-full bg-brand-yellow"></div>
            <div class="w-2 h-2 rounded-full bg-brand-yellow"></div>
          </div>
        </div>
      </SectionWrapper>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSeoMeta } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'

const { t } = useI18n()
const { isDark } = useTheme()

const logoPath = computed(() => {
  return isDark.value 
    ? '/images/logo/logo_Welkin_x_Midea.svg'
    : '/images/logo/logo_Welkin_x_Midea_light.svg'
})

useSeoMeta({
  title: () => `404 - ${t('notFound.title')} - Welkin`,
  description: () => t('notFound.description'),
})
</script>

