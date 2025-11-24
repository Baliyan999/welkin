<template>
  <div>
    <Header />
    <main>
      <SectionWrapper>
        <h1 class="text-center mb-4" v-motion-slide-up>
          {{ $t('blog.title') }}
        </h1>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          {{ $t('blog.subtitle') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard
            v-for="(post, index) in posts"
            :key="post.slug"
            :post="post"
            v-motion-slide-up
            :delay="index * 50"
          />
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
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import BlogCard from '@/components/BlogCard.vue'
import { getBlogImage } from '@/utils/imageHelper'

const { t } = useI18n()

useSeoMeta({
  title: () => `${t('blog.title')} - Welkin`,
  description: () => t('blog.subtitle'),
})

const posts = computed(() => [
  {
    slug: 'how-to-choose-ac',
    title: t('blog.posts.howToChooseAc.title'),
    excerpt: t('blog.posts.howToChooseAc.excerpt'),
    image: getBlogImage('how-to-choose-ac'),
    date: '2024-01-15',
    category: t('blog.posts.howToChooseAc.category'),
  },
  {
    slug: 'energy-saving-tips',
    title: t('blog.posts.energySavingTips.title'),
    excerpt: t('blog.posts.energySavingTips.excerpt'),
    image: getBlogImage('energy-saving-tips'),
    date: '2024-01-10',
    category: t('blog.posts.energySavingTips.category'),
  },
  {
    slug: 'smart-home-climate',
    title: t('blog.posts.smartHomeClimate.title'),
    excerpt: t('blog.posts.smartHomeClimate.excerpt'),
    image: getBlogImage('smart-home-climate'),
    date: '2024-01-05',
    category: t('blog.posts.smartHomeClimate.category'),
  },
  {
    slug: 'ventilation-basics',
    title: t('blog.posts.ventilationBasics.title'),
    excerpt: t('blog.posts.ventilationBasics.excerpt'),
    image: getBlogImage('ventilation-basics'),
    date: '2024-01-01',
    category: t('blog.posts.ventilationBasics.category'),
  },
  {
    slug: 'winter-heating',
    title: t('blog.posts.winterHeating.title'),
    excerpt: t('blog.posts.winterHeating.excerpt'),
    image: getBlogImage('winter-heating'),
    date: '2023-12-20',
    category: t('blog.posts.winterHeating.category'),
  },
  {
    slug: 'air-quality',
    title: t('blog.posts.airQuality.title'),
    excerpt: t('blog.posts.airQuality.excerpt'),
    image: getBlogImage('air-quality'),
    date: '2023-12-15',
    category: t('blog.posts.airQuality.category'),
  },
])
</script>

