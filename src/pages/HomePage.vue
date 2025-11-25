<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <!-- Hero Section -->
      <SectionWrapper class="py-8 md:py-12">
        <HeroSlider />
      </SectionWrapper>

      <!-- Categories -->
      <CategoryGrid />

      <!-- Advantages -->
      <SectionWrapper>
        <AdvantagesSection />
      </SectionWrapper>

      <!-- Blog Preview -->
      <SectionWrapper class="bg-gray-50 dark:bg-gray-800/50 rounded-3xl">
        <h2 class="text-center mb-12" v-motion-slide-up>
          {{ $t('blog.title') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BlogCard
            v-for="(post, index) in featuredPosts"
            :key="post.slug"
            :post="post"
            v-motion-slide-up
            :delay="index * 100"
          />
        </div>
        <div class="text-center mt-12">
          <RouterLink to="/blog" class="btn btn-outline">
            {{ $t('blog.allPosts') }}
          </RouterLink>
        </div>
      </SectionWrapper>

      <!-- CTA Section -->
      <SectionWrapper>
        <div class="bg-brand-yellow rounded-3xl p-12 text-center" v-motion-slide-up>
          <h2 class="text-3xl md:text-4xl font-bold text-brand-gray mb-4">
            {{ $t('home.cta.title') }}
          </h2>
          <p class="text-lg text-brand-gray/80 mb-8">
            {{ $t('home.cta.text') }}
          </p>
          <RouterLink to="/contacts" class="btn btn-secondary">
            {{ $t('home.cta.button') }}
          </RouterLink>
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
import HeroSlider from '@/components/HeroSlider.vue'
import CategoryGrid from '@/components/CategoryGrid.vue'
import AdvantagesSection from '@/components/AdvantagesSection.vue'
import BlogCard from '@/components/BlogCard.vue'
import { RouterLink } from 'vue-router'
import { getBlogImage } from '@/utils/imageHelper'

const { t } = useI18n()

useSeoMeta({
  title: () => `Welkin - ${t('hero.title')}`,
  description: () => `Welkin - ${t('hero.subtitle')}`,
})

const featuredPosts = computed(() => [
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
])
</script>

