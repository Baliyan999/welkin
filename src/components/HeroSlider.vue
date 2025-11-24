<template>
  <div class="relative h-[70vh] md:h-[80vh] overflow-hidden rounded-3xl">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute inset-0 transition-opacity duration-1000"
      :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
    >
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${slide.image})` }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-brand-gray/90 to-brand-gray/60" />
      </div>
      <div class="relative h-full flex items-center section-wrapper">
        <div class="max-w-2xl text-white" v-motion-slide-left>
          <h1 class="mb-4 text-white">{{ slide.title }}</h1>
          <p class="text-xl md:text-2xl text-gray-200">{{ slide.subtitle }}</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="currentSlide = index"
        class="w-3 h-3 rounded-full transition-all"
        :class="currentSlide === index ? 'bg-brand-yellow w-8' : 'bg-white/50'"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getHeroImage } from '@/utils/imageHelper'

const { t } = useI18n()
const currentSlide = ref(0)

const slides = computed(() => [
  {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    cta: t('hero.cta'),
    image: getHeroImage('hero-1'),
  },
  {
    title: t('hero.slide2.title'),
    subtitle: t('hero.slide2.subtitle'),
    cta: t('hero.cta'),
    image: getHeroImage('hero-2'),
  },
  {
    title: t('hero.slide3.title'),
    subtitle: t('hero.slide3.subtitle'),
    cta: t('hero.cta'),
    image: getHeroImage('hero-3'),
  },
])

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

let interval: number | null = null

onMounted(() => {
  interval = window.setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

