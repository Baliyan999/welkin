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
        <div class="max-w-2xl text-white">
          <!-- Animated Title -->
          <h1 class="mb-4 text-white overflow-hidden" :key="`title-${index}-${animationKey}`">
            <span
              v-for="(word, wordIndex) in slide.titleWords"
              :key="`title-${index}-${wordIndex}-${animationKey}`"
              class="inline-block"
              :class="{ 'animate-word-drop': currentSlide === index }"
              :style="{ animationDelay: `${wordIndex * 0.1}s` }"
            >
              {{ word }}&nbsp;
            </span>
          </h1>
          <!-- Animated Subtitle -->
          <p class="text-xl md:text-2xl text-gray-200 overflow-hidden" :key="`subtitle-${index}-${animationKey}`">
            <span
              v-for="(word, wordIndex) in slide.subtitleWords"
              :key="`subtitle-${index}-${wordIndex}-${animationKey}`"
              class="inline-block"
              :class="{ 'animate-word-drop': currentSlide === index }"
              :style="{ animationDelay: `${(slide.titleWords.length + wordIndex) * 0.1}s` }"
            >
              {{ word }}&nbsp;
            </span>
          </p>
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getHeroImage } from '@/utils/imageHelper'

const { t } = useI18n()
const currentSlide = ref(0)
const animationKey = ref(0)

// Reset animation when slide changes
watch(currentSlide, () => {
  animationKey.value++
})

const slides = computed(() => {
  const title = t('hero.title')
  const subtitle = t('hero.subtitle')
  
  return [
    {
      title,
      subtitle,
      cta: t('hero.cta'),
      image: getHeroImage('hero-1'),
      titleWords: title.split(' '),
      subtitleWords: subtitle.split(' '),
    },
    {
      title,
      subtitle,
      cta: t('hero.cta'),
      image: getHeroImage('hero-2'),
      titleWords: title.split(' '),
      subtitleWords: subtitle.split(' '),
    },
    {
      title,
      subtitle,
      cta: t('hero.cta'),
      image: getHeroImage('hero-3'),
      titleWords: title.split(' '),
      subtitleWords: subtitle.split(' '),
    },
    {
      title,
      subtitle,
      cta: t('hero.cta'),
      image: getHeroImage('hero-4'),
      titleWords: title.split(' '),
      subtitleWords: subtitle.split(' '),
    },
    {
      title,
      subtitle,
      cta: t('hero.cta'),
      image: getHeroImage('hero-5'),
      titleWords: title.split(' '),
      subtitleWords: subtitle.split(' '),
    },
  ]
})

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

let interval: number | null = null

onMounted(() => {
  interval = window.setInterval(nextSlide, 10000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

