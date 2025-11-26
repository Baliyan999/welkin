<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <SectionWrapper>
        <!-- Header -->
        <div class="text-center mb-12" v-motion-slide-up>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            {{ $t('blog.title') }}
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {{ $t('blog.subtitle') }}
          </p>
        </div>

        <!-- Filters and Search -->
        <div class="mb-8 flex items-center gap-4 flex-wrap justify-between" v-motion-slide-up>
          <!-- Category Filter - Dropdown (like catalog) -->
          <div class="relative" data-category-dropdown>
            <button
              @click="categoryDropdownOpen = !categoryDropdownOpen"
              class="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
              :class="{
                'text-brand-gray dark:text-white': categoryDropdownOpen || selectedCategory,
                'text-gray-700 dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow': !categoryDropdownOpen && !selectedCategory
              }"
            >
              <span
                class="glass-effect absolute inset-0 rounded-xl"
              />
              <span class="relative z-10 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {{ selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name : $t('blog.allCategories') }}
                <svg
                  class="w-4 h-4 transition-transform duration-300"
                  :class="{ 'rotate-180': categoryDropdownOpen }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            <!-- Category Dropdown -->
            <Transition name="dropdown">
              <div
                v-if="categoryDropdownOpen"
                class="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-2xl z-50 border border-gray-200 dark:border-gray-700"
                v-motion-slide-down
              >
                <button
                  @click="selectedCategory = null; categoryDropdownOpen = false"
                  class="relative w-full px-4 py-2.5 rounded-xl text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-between"
                  :class="{
                    'text-brand-gray dark:text-white bg-gray-100 dark:bg-gray-700': !selectedCategory,
                    'text-gray-700 dark:text-gray-300': selectedCategory
                  }"
                >
                  <span class="relative z-10">{{ $t('blog.allCategories') }}</span>
                  <span v-if="!selectedCategory" class="relative z-10 text-brand-yellow text-lg">✓</span>
                </button>
                <button
                  v-for="category in categories"
                  :key="category.slug"
                  @click="selectedCategory = selectedCategory === category.slug ? null : category.slug; categoryDropdownOpen = false"
                  class="relative w-full px-4 py-2.5 rounded-xl text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-between"
                  :class="{
                    'text-brand-gray dark:text-white bg-gray-100 dark:bg-gray-700': selectedCategory === category.slug,
                    'text-gray-700 dark:text-gray-300': selectedCategory !== category.slug
                  }"
                >
                  <span class="relative z-10">{{ category.name }}</span>
                  <span v-if="selectedCategory === category.slug" class="relative z-10 text-brand-yellow text-lg">✓</span>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Search -->
          <div class="relative w-full sm:w-64 ml-auto">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('blog.searchPlaceholder')"
              class="w-full px-4 py-2 pl-10 pr-4 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition-all duration-300 text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-yellow transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Posts Grid -->
        <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard
            v-for="(post, index) in filteredPosts"
            :key="post.slug"
            :post="post"
            v-motion-slide-up
            :delay="index * 50"
          />
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-16" v-motion-slide-up>
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
            {{ $t('blog.noPosts') }}
          </p>
          <p class="text-gray-500 dark:text-gray-400">
            {{ $t('blog.tryDifferentFilters') }}
          </p>
        </div>
      </SectionWrapper>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Transition } from 'vue'
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

const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)
const categoryDropdownOpen = ref(false)

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const categoryButton = document.querySelector('[data-category-dropdown]')
  if (categoryButton && !categoryButton.contains(target)) {
    categoryDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const categories = computed(() => [
  { slug: 'tips', name: t('blog.categories.tips') },
  { slug: 'energyEfficiency', name: t('blog.categories.energyEfficiency') },
  { slug: 'technologies', name: t('blog.categories.technologies') },
  { slug: 'maintenance', name: t('blog.categories.maintenance') },
  { slug: 'health', name: t('blog.categories.health') },
])

const posts = computed(() => [
  {
    slug: 'how-to-choose-ac',
    title: t('blog.posts.howToChooseAc.title'),
    excerpt: t('blog.posts.howToChooseAc.excerpt'),
    image: getBlogImage('how-to-choose-ac'),
    date: '2024-01-15',
    category: t('blog.posts.howToChooseAc.category'),
    categorySlug: 'tips',
  },
  {
    slug: 'energy-saving-tips',
    title: t('blog.posts.energySavingTips.title'),
    excerpt: t('blog.posts.energySavingTips.excerpt'),
    image: getBlogImage('energy-saving-tips'),
    date: '2024-01-10',
    category: t('blog.posts.energySavingTips.category'),
    categorySlug: 'energyEfficiency',
  },
  {
    slug: 'smart-home-climate',
    title: t('blog.posts.smartHomeClimate.title'),
    excerpt: t('blog.posts.smartHomeClimate.excerpt'),
    image: getBlogImage('smart-home-climate'),
    date: '2024-01-05',
    category: t('blog.posts.smartHomeClimate.category'),
    categorySlug: 'technologies',
  },
  {
    slug: 'ventilation-basics',
    title: t('blog.posts.ventilationBasics.title'),
    excerpt: t('blog.posts.ventilationBasics.excerpt'),
    image: getBlogImage('ventilation-basics'),
    date: '2024-01-01',
    category: t('blog.posts.ventilationBasics.category'),
    categorySlug: 'tips',
  },
  {
    slug: 'winter-heating',
    title: t('blog.posts.winterHeating.title'),
    excerpt: t('blog.posts.winterHeating.excerpt'),
    image: getBlogImage('winter-heating'),
    date: '2023-12-20',
    category: t('blog.posts.winterHeating.category'),
    categorySlug: 'maintenance',
  },
  {
    slug: 'air-quality',
    title: t('blog.posts.airQuality.title'),
    excerpt: t('blog.posts.airQuality.excerpt'),
    image: getBlogImage('air-quality'),
    date: '2023-12-15',
    category: t('blog.posts.airQuality.category'),
    categorySlug: 'health',
  },
])

const filteredPosts = computed(() => {
  let result = [...posts.value]

  // Filter by category
  if (selectedCategory.value) {
    result = result.filter(p => p.categorySlug === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const lowerQuery = searchQuery.value.toLowerCase().trim()
    result = result.filter(p => {
      return p.title.toLowerCase().includes(lowerQuery) ||
             p.excerpt.toLowerCase().includes(lowerQuery) ||
             p.category.toLowerCase().includes(lowerQuery)
    })
  }

  // Sort by date (newest first)
  result.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return result
})
</script>
