<template>
  <RouterLink
    :to="`/blog/${post.slug}`"
    class="card overflow-hidden group block"
    v-motion-slide-up
  >
    <div class="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div class="p-6">
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <span>{{ formatDate(post.date) }}</span>
        <span class="mx-2">•</span>
        <span>{{ post.category }}</span>
      </div>
      <h3 class="text-xl font-bold mb-2 text-brand-gray dark:text-white group-hover:text-brand-yellow transition-colors">
        {{ post.title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
        {{ post.excerpt }}
      </p>
      <span class="text-brand-yellow font-semibold text-sm group-hover:underline">
        {{ $t('blog.readMore') }} →
      </span>
    </div>
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
  }
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>


