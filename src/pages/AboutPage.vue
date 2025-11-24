<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <SectionWrapper>
        <div class="max-w-4xl mx-auto">
          <h1 class="text-center mb-4" v-motion-slide-up>
            {{ $t('about.title') }}
          </h1>
          <p class="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            {{ $t('about.subtitle') }}
          </p>

          <div class="prose prose-lg dark:prose-invert max-w-none mb-12" v-motion-slide-up>
            <p>
              {{ $t('about.description1') }}
            </p>
            <p>
              {{ $t('about.description2') }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="card p-8" v-motion-slide-right>
              <h2 class="text-2xl font-bold mb-4">{{ $t('about.mission') }}</h2>
              <p class="text-gray-600 dark:text-gray-400">
                {{ $t('about.missionText') }}
              </p>
            </div>
            <div class="card p-8" v-motion-slide-left>
              <h2 class="text-2xl font-bold mb-4">{{ $t('about.values') }}</h2>
              <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ {{ $t('about.value1') }}</li>
                <li>✓ {{ $t('about.value2') }}</li>
                <li>✓ {{ $t('about.value3') }}</li>
                <li>✓ {{ $t('about.value4') }}</li>
              </ul>
            </div>
          </div>

          <div class="bg-brand-yellow rounded-3xl p-12 text-center" v-motion-slide-up>
            <h2 class="text-3xl font-bold text-brand-gray mb-4">
              {{ $t('about.ctaTitle') }}
            </h2>
            <p class="text-lg text-brand-gray/80 mb-6">
              {{ $t('about.ctaText') }}
            </p>
            <RouterLink to="/contacts" class="btn btn-secondary">
              {{ $t('about.ctaButton') }}
            </RouterLink>
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
  title: () => `${t('about.title')} - Welkin`,
  description: () => t('about.subtitle'),
})
</script>

