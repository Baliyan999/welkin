<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20"
        @click.self="closeModal"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 dark:bg-black/70" @click="closeModal" />
        
        <!-- Modal Content -->
        <div
          class="relative w-full max-w-2xl glass-effect rounded-3xl shadow-2xl border border-white/20 dark:border-white/10"
          v-motion-pop
          @click.stop
        >
          <!-- Search Input -->
          <div class="p-6 pb-4">
            <div class="relative">
              <input
                ref="searchInput"
                v-model="searchQuery"
                @focus="isFocused = true"
                @input="handleSearch"
                @keydown.enter="handleEnter"
                @keydown.escape="closeModal"
                type="text"
                :placeholder="$t('search.placeholder')"
                class="w-full px-4 py-3 pl-12 pr-12 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition-all duration-300 text-base placeholder-gray-400 dark:placeholder-gray-500"
              />
              <!-- Search Icon -->
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <!-- Clear Button -->
              <button
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-brand-yellow transition-colors duration-200"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Search Results -->
          <div class="px-6 pb-6 max-h-[60vh] overflow-y-auto">
            <!-- Loading State -->
            <div v-if="isSearching" class="py-12 text-center text-gray-500 dark:text-gray-400">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-yellow"></div>
              <p class="mt-4 text-sm">{{ $t('search.searching') }}</p>
            </div>

            <!-- No Results -->
            <div v-else-if="searchQuery && searchResults.length === 0" class="py-12 text-center text-gray-500 dark:text-gray-400">
              <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-base">{{ $t('search.noResults') }}</p>
            </div>

            <!-- Results -->
            <div v-else-if="searchResults.length > 0" class="space-y-4">
              <!-- Products Section -->
              <div v-if="productResults.length > 0">
                <h3 class="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ $t('search.products') }}
                </h3>
                <div class="space-y-2">
                  <RouterLink
                    v-for="product in productResults.slice(0, 8)"
                    :key="product.slug"
                    :to="`/catalog/${product.slug}`"
                    @click="handleResultClick"
                    class="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200"
                  >
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-16 h-16 object-contain rounded-lg bg-white/50 dark:bg-gray-700/50 p-2 flex-shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                      <p class="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-brand-yellow transition-colors duration-200 truncate">
                        {{ product.name }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {{ getCategoryName(product.category) }}
                      </p>
                    </div>
                    <svg class="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-brand-yellow transition-colors duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </RouterLink>
                </div>
                <div v-if="productResults.length > 8" class="mt-3 px-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                  {{ $t('search.moreProducts', { count: productResults.length - 8 }) }}
                </div>
              </div>

              <!-- Categories Section -->
              <div v-if="categoryResults.length > 0" class="mt-6">
                <h3 class="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ $t('search.categories') }}
                </h3>
                <div class="space-y-2">
                  <RouterLink
                    v-for="category in categoryResults"
                    :key="category.slug"
                    :to="`/catalog?category=${category.slug}`"
                    @click="handleResultClick"
                    class="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200"
                  >
                    <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/10 flex items-center justify-center flex-shrink-0">
                      <svg class="w-8 h-8 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-brand-yellow transition-colors duration-200 truncate">
                        {{ category.name }}
                      </p>
                    </div>
                    <svg class="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-brand-yellow transition-colors duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </RouterLink>
                </div>
              </div>

              <!-- View All Results -->
              <div v-if="searchResults.length > 0" class="mt-6 pt-4 border-t border-white/10 dark:border-white/5">
                <RouterLink
                  :to="`/catalog?search=${encodeURIComponent(searchQuery)}`"
                  @click="handleResultClick"
                  class="flex items-center justify-center gap-2 text-base font-medium text-brand-yellow hover:text-brand-yellow/80 transition-colors duration-200"
                >
                  <span>{{ $t('search.viewAll') }}</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </RouterLink>
              </div>
            </div>

            <!-- Empty State (when no query) -->
            <div v-else class="py-12 text-center text-gray-500 dark:text-gray-400">
              <svg class="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p class="text-base">{{ $t('search.startTyping') }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { Teleport, Transition } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProducts } from '@/composables/useProducts'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const { products } = useProducts()

const searchQuery = ref('')
const isFocused = ref(false)
const isSearching = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)

// Categories data (computed to update on language change)
const categories = computed(() => [
  { slug: 'air-conditioners', name: t('catalog.categories.airConditioners') },
  { slug: 'air-purifiers', name: t('catalog.categories.airPurifiers') },
  { slug: 'boilers', name: t('catalog.categories.boilers') },
  { slug: 'dehumidifiers', name: t('catalog.categories.dehumidifiers') },
  { slug: 'heat-curtains', name: t('catalog.categories.heatCurtains') },
])

// Search function
const searchProducts = (query: string) => {
  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase().trim()
  
  return products.value.filter(product => {
    // Search in original name
    const nameMatch = product.name.toLowerCase().includes(lowerQuery)
    
    // Search in translated name (if available)
    let translatedNameMatch = false
    try {
      const translatedName = t(`products.items.${product.slug}.name`)
      if (translatedName && translatedName !== `products.items.${product.slug}.name`) {
        translatedNameMatch = translatedName.toLowerCase().includes(lowerQuery)
      }
    } catch {
      // Translation not found, ignore
    }
    
    // Search in description (already translated)
    const descriptionMatch = product.description?.toLowerCase().includes(lowerQuery) || false
    
    // Search in category name (already translated)
    const categoryMatch = getCategoryName(product.category).toLowerCase().includes(lowerQuery)
    
    return nameMatch || translatedNameMatch || descriptionMatch || categoryMatch
  })
}

const searchCategories = (query: string) => {
  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase().trim()
  
  return categories.value.filter(category => {
    return category.name.toLowerCase().includes(lowerQuery)
  })
}

// Computed results
const productResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  return searchProducts(searchQuery.value)
})

const categoryResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  return searchCategories(searchQuery.value)
})

const searchResults = computed(() => {
  return [...productResults.value, ...categoryResults.value]
})

// Helper function
const getCategoryName = (categorySlug: string) => {
  const category = categories.value.find(c => c.slug === categorySlug)
  return category?.name || categorySlug
}

// Handlers
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    isSearching.value = true
    setTimeout(() => {
      isSearching.value = false
    }, 300)
  }
}

const handleEnter = () => {
  if (productResults.value.length > 0) {
    router.push(`/catalog/${productResults.value[0].slug}`)
    closeModal()
  } else if (categoryResults.value.length > 0) {
    router.push(`/catalog?category=${categoryResults.value[0].slug}`)
    closeModal()
  } else if (searchQuery.value.trim()) {
    router.push(`/catalog?search=${encodeURIComponent(searchQuery.value)}`)
    closeModal()
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const closeModal = () => {
  emit('update:isOpen', false)
  searchQuery.value = ''
  isFocused.value = false
}

const handleResultClick = () => {
  closeModal()
}

// Focus input when modal opens
watch(() => props.isOpen, async (newValue) => {
  if (newValue) {
    await nextTick()
    searchInput.value?.focus()
  }
})

// Close search results when route changes
watch(() => route.path, () => {
  if (props.isOpen) {
    closeModal()
  }
})

// Prevent body scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  // Cleanup on unmount
  return () => {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .glass-effect,
.modal-leave-to .glass-effect {
  transform: scale(0.9) translateY(-20px);
}
</style>

