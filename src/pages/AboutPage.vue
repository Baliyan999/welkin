<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <SectionWrapper>
        <!-- Hero Section -->
        <div class="text-center mb-16" v-motion-slide-up>
          <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            {{ $t('about.title') }}
          </h1>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {{ $t('about.subtitle') }}
          </p>
        </div>

        <!-- Introduction -->
        <div class="max-w-4xl mx-auto mb-16" v-motion-slide-up>
          <div class="prose prose-lg dark:prose-invert max-w-none text-center">
            <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {{ $t('about.description1') }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {{ $t('about.description2') }}
            </p>
          </div>
        </div>

        <!-- Brands Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <!-- Welkin Card -->
          <div class="relative overflow-hidden rounded-3xl bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-8 md:p-12 shadow-lg dark:shadow-2xl group hover:shadow-xl dark:hover:shadow-3xl transition-all duration-500 border border-gray-200 dark:border-transparent" v-motion-slide-right>
            <div class="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-yellow/20 transition-all duration-500"></div>
            <div class="relative z-10">
              <div class="mb-6">
                <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Welkin</h2>
                <div class="w-20 h-1 bg-brand-yellow rounded-full"></div>
              </div>
              <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {{ $t('about.welkin.description') }}
              </p>
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-brand-yellow flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">{{ $t('about.welkin.feature1') }}</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-brand-yellow flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-300">{{ $t('about.welkin.feature2') }}</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-brand-yellow flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-300">{{ $t('about.welkin.feature3') }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Midea Card -->
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 shadow-2xl group hover:shadow-3xl transition-all duration-500" v-motion-slide-left>
            <div class="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-yellow/20 transition-all duration-500"></div>
            <div class="relative z-10">
              <div class="mb-6">
                <h2 class="text-3xl font-bold mb-4 text-white">Midea</h2>
                <div class="w-20 h-1 bg-brand-yellow rounded-full"></div>
              </div>
              <p class="text-gray-300 mb-6 leading-relaxed">
                {{ $t('about.midea.description') }}
              </p>
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-brand-yellow flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">{{ $t('about.midea.feature1') }}</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-brand-yellow flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-300">{{ $t('about.midea.feature2') }}</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-brand-yellow flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-300">{{ $t('about.midea.feature3') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Partnership Section -->
        <div class="max-w-4xl mx-auto mb-16" v-motion-slide-up>
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-yellow/20 via-brand-yellow/10 to-brand-yellow/20 p-8 md:p-12 border border-brand-yellow/30">
            <div class="text-center">
              <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                {{ $t('about.partnership.title') }}
              </h2>
              <p class="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                {{ $t('about.partnership.description') }}
              </p>
              <div class="flex flex-wrap justify-center gap-6">
                <div class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <svg class="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ $t('about.partnership.benefit1') }}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-300">
                  <svg class="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ $t('about.partnership.benefit2') }}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-300">
                  <svg class="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ $t('about.partnership.benefit3') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Values Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div class="card p-6 text-center group hover:scale-105 transition-transform duration-300" v-motion-slide-up>
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-yellow/20 flex items-center justify-center group-hover:bg-brand-yellow/30 transition-colors">
              <svg class="w-8 h-8 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{{ $t('about.value1') }}</h3>
          </div>
          <div class="card p-6 text-center group hover:scale-105 transition-transform duration-300" v-motion-slide-up :delay="50">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-yellow/20 flex items-center justify-center group-hover:bg-brand-yellow/30 transition-colors">
              <svg class="w-8 h-8 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-white">{{ $t('about.value2') }}</h3>
          </div>
          <div class="card p-6 text-center group hover:scale-105 transition-transform duration-300" v-motion-slide-up :delay="100">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-yellow/20 flex items-center justify-center group-hover:bg-brand-yellow/30 transition-colors">
              <svg class="w-8 h-8 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-white">{{ $t('about.value3') }}</h3>
          </div>
          <div class="card p-6 text-center group hover:scale-105 transition-transform duration-300" v-motion-slide-up :delay="150">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-yellow/20 flex items-center justify-center group-hover:bg-brand-yellow/30 transition-colors">
              <svg class="w-8 h-8 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-white">{{ $t('about.value4') }}</h3>
          </div>
        </div>

        <!-- Mission Section -->
        <div class="max-w-4xl mx-auto mb-16" v-motion-slide-up>
          <div class="card p-8 md:p-12 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {{ $t('about.mission') }}
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {{ $t('about.missionText') }}
            </p>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="max-w-4xl mx-auto" v-motion-slide-up>
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-yellow to-brand-yellow-dark p-12 text-center shadow-2xl">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px);"></div>
            </div>
            <div class="relative z-10">
              <h2 class="text-3xl md:text-4xl font-bold text-brand-gray mb-4">
                {{ $t('about.ctaTitle') }}
              </h2>
              <p class="text-lg text-brand-gray/80 mb-8 max-w-2xl mx-auto">
                {{ $t('about.ctaText') }}
              </p>
              <RouterLink 
                to="/contacts" 
                class="inline-flex items-center gap-2 px-8 py-4 bg-brand-gray text-white rounded-xl font-semibold hover:bg-brand-gray-dark transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span>{{ $t('about.ctaButton') }}</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

useSeoMeta({
  title: () => `${t('about.title')} - Welkin & Midea`,
  description: () => t('about.subtitle'),
})
</script>
