<template>
  <RouterLink
    :to="`/catalog?category=${category.slug}`"
    class="card group overflow-hidden relative"
    v-motion-slide-up
  >
    <!-- Изображение категории (если есть) -->
    <div v-if="category.image" class="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
      <img 
        :src="category.image" 
        :alt="category.name" 
        class="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110" 
      />
      <!-- Градиентный overlay при hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-brand-yellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    
    <!-- Иконка в круглом контейнере (если нет изображения) -->
    <div v-else class="relative w-full h-48 bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5 dark:from-brand-yellow/20 dark:to-brand-yellow/10 flex items-center justify-center">
      <div class="w-24 h-24 bg-brand-yellow/20 dark:bg-brand-yellow/30 rounded-full flex items-center justify-center group-hover:bg-brand-yellow/30 dark:group-hover:bg-brand-yellow/40 transition-all duration-300 group-hover:scale-110">
        <component v-if="category.icon" :is="category.icon" class="w-12 h-12 text-brand-gray dark:text-white" />
      </div>
    </div>

    <!-- Название категории -->
    <div class="p-6 pt-4">
      <h3 class="text-xl font-bold text-brand-gray dark:text-white text-center group-hover:text-brand-yellow transition-colors duration-300">
        {{ category.name }}
      </h3>
    </div>

    <!-- Декоративный элемент при hover -->
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  category: {
    slug: string
    name: string
    description?: string
    icon?: any
    image?: string
  }
}>()
</script>

