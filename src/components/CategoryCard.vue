<template>
  <RouterLink
    :to="`/catalog?category=${category.slug}`"
    class="card p-6 group hover:scale-105"
    v-motion-slide-up
  >
    <div class="w-16 h-16 bg-brand-yellow/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-yellow transition-colors">
      <component :is="category.icon" class="w-8 h-8 text-brand-gray" />
    </div>
    <h3 class="text-xl font-bold mb-2 text-brand-gray dark:text-white">
      {{ category.name }}
    </h3>
    <p class="text-gray-600 dark:text-gray-400 text-sm">
      {{ category.description }}
    </p>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  category: {
    slug: string
    name: string
    description: string
    icon: any
  }
}>()
</script>

