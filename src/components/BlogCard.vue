<template>
  <RouterLink
    :to="`/blog/${post.slug}`"
    class="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 block bg-white dark:bg-gray-800"
    v-motion-slide-up
  >
    <!-- Image Container -->
    <div class="relative h-56 bg-gray-100 dark:bg-gray-700 overflow-hidden">
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <!-- Category Badge -->
      <div class="absolute top-4 left-4">
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-brand-yellow text-brand-gray">
          {{ post.category }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Title -->
      <h3 class="text-xl font-bold mb-3 text-brand-gray dark:text-white group-hover:text-brand-yellow transition-colors duration-300 line-clamp-2">
        {{ post.title }}
      </h3>

      <!-- Excerpt -->
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
        {{ post.excerpt }}
      </p>

      <!-- Read More -->
      <div class="flex items-center text-brand-yellow font-semibold text-sm group-hover:gap-2 transition-all duration-300">
        <span>{{ $t('blog.readMore') }}</span>
        <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>

    <!-- Hover Effect -->
    <div class="absolute inset-0 border-2 border-brand-yellow/0 group-hover:border-brand-yellow/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  post: {
    slug: string
    title: string
    excerpt: string
    image: string
    date: string
    category: string
    categorySlug?: string
  }
}>()
</script>
