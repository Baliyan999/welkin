<template>
  <div class="card overflow-hidden group" v-motion-slide-up>
    <RouterLink :to="`/catalog/${product.slug}`">
      <div class="relative bg-gray-100 dark:bg-gray-700 overflow-hidden flex items-center justify-center p-3" style="min-height: 240px;">
        <div class="product-image-container">
          <img
            :src="product.image"
            :alt="product.name"
            class="product-image group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            style="image-orientation: 0deg;"
          />
        </div>
        <div
          v-if="product.badge"
          class="absolute top-4 right-4 bg-brand-yellow text-brand-gray px-3 py-1 rounded-full text-sm font-semibold"
        >
          {{ product.badge }}
        </div>
      </div>
    </RouterLink>
    <div class="p-6 flex flex-col items-center text-center">
      <RouterLink :to="`/catalog/${product.slug}`" class="w-full">
        <h3 class="text-xl font-bold mb-4 text-brand-gray dark:text-white group-hover:text-brand-yellow transition-colors">
          {{ product.name }}
        </h3>
      </RouterLink>
      <div v-if="product.description" class="w-full mb-4">
        <p
          class="text-sm text-gray-600 dark:text-gray-400 text-left"
          :class="isExpanded ? '' : 'line-clamp-2'"
        >
          {{ product.description }}
        </p>
        <button
          v-if="product.description && product.description.length > 100"
          @click="isExpanded = !isExpanded"
          class="mt-2 text-sm text-brand-yellow hover:text-brand-yellow/80 transition-colors"
        >
          {{ isExpanded ? collapseText : expandText }}
        </button>
      </div>
      <RouterLink :to="`/catalog/${product.slug}`" class="w-full">
        <button class="btn btn-primary text-sm w-full">
          {{ t('products.details') }}
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const isExpanded = ref(false)

const expandText = computed(() => {
  const currentLocale = locale.value
  try {
    const text = t('products.expand')
    return text && text !== 'products.expand' ? text : (currentLocale === 'uz' ? 'Yoyish' : 'Развернуть')
  } catch {
    return currentLocale === 'uz' ? 'Yoyish' : 'Развернуть'
  }
})

const collapseText = computed(() => {
  const currentLocale = locale.value
  try {
    const text = t('products.collapse')
    return text && text !== 'products.collapse' ? text : (currentLocale === 'uz' ? "Yig'ish" : 'Свернуть')
  } catch {
    return currentLocale === 'uz' ? "Yig'ish" : 'Свернуть'
  }
})

defineProps<{
  product: {
    slug: string
    name: string
    description: string
    image: string
    price: string
    badge?: string
  }
}>()
</script>


