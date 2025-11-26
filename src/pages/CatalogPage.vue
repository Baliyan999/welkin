<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <SectionWrapper>
            <h1 class="text-center mb-4" v-motion-slide-up>
              {{ route.query.search ? $t('search.resultsFor', { query: route.query.search }) : $t('nav.catalog') }}
            </h1>
            <p class="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              {{ route.query.search ? $t('search.foundResults', { count: filteredProducts.length }) : $t('catalog.subtitle') }}
            </p>

        <!-- Filter Buttons (shown only when category is selected or filters are active) -->
        <div v-if="hasActiveFilters || filters.category" class="mb-8 flex items-center gap-4 flex-wrap">
          <!-- Category Button -->
          <div class="relative" data-category-dropdown>
            <button
              @click="categoryDropdownOpen = !categoryDropdownOpen"
              class="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
              :class="{
                'text-brand-gray dark:text-white': categoryDropdownOpen || filters.category,
                'text-gray-700 dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow': !categoryDropdownOpen && !filters.category
              }"
            >
              <span
                v-if="categoryDropdownOpen || filters.category"
                class="glass-effect absolute inset-0 rounded-xl"
              />
              <span class="relative z-10 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {{ filters.category ? categories.find(c => c.slug === filters.category)?.name : $t('catalog.modal.category') }}
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
                  @click="filters.category = null; categoryDropdownOpen = false"
                  class="w-full px-4 py-2.5 rounded-xl text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-between"
                  :class="{
                    'text-brand-gray dark:text-white bg-gray-100 dark:bg-gray-700': !filters.category,
                    'text-gray-700 dark:text-gray-300': filters.category
                  }"
                >
                  <span>{{ $t('catalog.modal.allCategories') }}</span>
                  <span v-if="!filters.category" class="text-brand-yellow text-lg">✓</span>
                </button>
                <button
                  v-for="category in categories"
                  :key="category.slug"
                  @click="filters.category = filters.category === category.slug ? null : category.slug; categoryDropdownOpen = false"
                  class="w-full px-4 py-2.5 rounded-xl text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-between"
                  :class="{
                    'text-brand-gray dark:text-white bg-gray-100 dark:bg-gray-700': filters.category === category.slug,
                    'text-gray-700 dark:text-gray-300': filters.category !== category.slug
                  }"
                >
                  <span>{{ category.name }}</span>
                  <span v-if="filters.category === category.slug" class="text-brand-yellow text-lg">✓</span>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Filter Button -->
          <button
            @click="openFilterModal"
            class="relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
            :class="{
              'text-brand-gray dark:text-white': filterModalOpen || hasActiveFilters,
              'text-gray-700 dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow': !filterModalOpen && !hasActiveFilters
            }"
          >
            <span
              v-if="filterModalOpen || hasActiveFilters"
              class="glass-effect absolute inset-0 rounded-xl"
            />
            <span class="relative z-10 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {{ $t('catalog.filters') }}
              <span
                v-if="hasActiveFilters"
                class="ml-1 px-2 py-0.5 rounded-full bg-brand-yellow text-brand-gray text-xs font-semibold"
              >
                {{ activeFiltersCount }}
              </span>
            </span>
          </button>
        </div>

        <!-- Filter Modal -->
        <Teleport to="body">
          <Transition name="modal">
            <div
              v-if="filterModalOpen"
              class="fixed inset-0 z-50 flex items-center justify-center p-4"
              @click.self="filterModalOpen = false"
            >
              <!-- Backdrop -->
              <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="filterModalOpen = false" />

              <!-- Modal Content -->
              <div
                class="relative w-full max-w-2xl glass-effect rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 max-h-[90vh] overflow-y-auto"
                v-motion-slide-up
              >
                <!-- Header -->
                <div class="flex items-center justify-center relative mb-6">
                  <h2 class="text-2xl font-bold text-brand-gray dark:text-white">{{ $t('catalog.modal.title') }}</h2>
                  <button
                    @click="filterModalOpen = false"
                    class="absolute right-0 p-2 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 text-gray-700 dark:text-gray-300"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <!-- Filter Content -->
                <div class="space-y-6 max-w-md mx-auto">
                  <!-- Brand (First) -->
                  <div>
                    <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 text-center">{{ $t('catalog.modal.brand') }}</h3>
                    <div class="flex flex-wrap gap-3 justify-center">
                      <button
                        @click="filters.brand = null"
                        class="relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300"
                        :class="{
                          'text-brand-gray dark:text-white': !filters.brand,
                          'text-gray-700 dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow': filters.brand
                        }"
                      >
                        <span
                          v-if="!filters.brand"
                          class="glass-effect absolute inset-0 rounded-xl"
                        />
                        <span class="relative z-10">{{ $t('catalog.modal.allBrands') }}</span>
                      </button>
                      <button
                        v-for="brand in brands"
                        :key="brand.value"
                        @click="filters.brand = filters.brand === brand.value ? null : brand.value"
                        class="relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300"
                        :class="{
                          'text-brand-gray dark:text-white': filters.brand === brand.value,
                          'text-gray-700 dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow': filters.brand !== brand.value
                        }"
                      >
                        <span
                          v-if="filters.brand === brand.value"
                          class="glass-effect absolute inset-0 rounded-xl"
                        />
                        <span class="relative z-10">{{ brand.label }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- Power BTU Filter (only for air conditioners) -->
                  <div v-if="filters.category === 'air-conditioners'">
                    <button
                      @click="powerDropdownOpen = !powerDropdownOpen"
                      class="w-full flex items-center justify-between mb-3 p-2 -mx-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    >
                      <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400">{{ $t('catalog.modal.power') }}</h3>
                      <svg
                        class="w-4 h-4 transition-transform duration-300 text-gray-600 dark:text-gray-400"
                        :class="{ 'rotate-180': powerDropdownOpen }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <Transition name="power-dropdown">
                      <div v-if="powerDropdownOpen" class="space-y-2 mt-2">
                        <label
                          v-for="powerOption in powerBTUOptions"
                          :key="powerOption.value"
                          class="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/15 dark:hover:bg-white/10 cursor-pointer transition-all duration-200 border border-transparent hover:border-brand-yellow/30"
                        >
                          <div class="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              :value="powerOption.value"
                              v-model="filters.selectedPowerBTU"
                              class="custom-checkbox appearance-none w-5 h-5 rounded-md border-2 border-gray-300 dark:border-gray-400 bg-gray-100 dark:bg-gray-700 cursor-pointer transition-all duration-200 checked:bg-brand-yellow checked:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 shadow-sm"
                            />
                            <svg
                              v-if="filters.selectedPowerBTU.includes(powerOption.value)"
                              class="absolute w-3.5 h-3.5 text-white pointer-events-none transition-all duration-200 scale-100 drop-shadow-sm"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-yellow transition-colors duration-200">
                            {{ powerOption.label }}
                          </span>
                        </label>
                      </div>
                    </Transition>
                  </div>

                  <!-- Power KW Filter (only for boilers) -->
                  <div v-if="filters.category === 'boilers'">
                    <button
                      @click="powerKWDropdownOpen = !powerKWDropdownOpen"
                      class="w-full flex items-center justify-between mb-3 p-2 -mx-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    >
                      <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400">{{ $t('catalog.modal.power') }}</h3>
                      <svg
                        class="w-4 h-4 transition-transform duration-300 text-gray-600 dark:text-gray-400"
                        :class="{ 'rotate-180': powerKWDropdownOpen }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <Transition name="power-dropdown">
                      <div v-if="powerKWDropdownOpen" class="space-y-2 mt-2">
                        <label
                          v-for="powerOption in powerKWOptions"
                          :key="powerOption.value"
                          class="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/15 dark:hover:bg-white/10 cursor-pointer transition-all duration-200 border border-transparent hover:border-brand-yellow/30"
                        >
                          <div class="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              :value="powerOption.value"
                              v-model="filters.selectedPowerKW"
                              class="custom-checkbox appearance-none w-5 h-5 rounded-md border-2 border-gray-300 dark:border-gray-400 bg-gray-100 dark:bg-gray-700 cursor-pointer transition-all duration-200 checked:bg-brand-yellow checked:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 shadow-sm"
                            />
                            <svg
                              v-if="filters.selectedPowerKW.includes(powerOption.value)"
                              class="absolute w-3.5 h-3.5 text-white pointer-events-none transition-all duration-200 scale-100 drop-shadow-sm"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-yellow transition-colors duration-200">
                            {{ powerOption.label }}
                          </span>
                        </label>
                      </div>
                    </Transition>
                  </div>

                  <!-- Size Filter (only for heat curtains) -->
                  <div v-if="filters.category === 'heat-curtains'">
                    <button
                      @click="sizeDropdownOpen = !sizeDropdownOpen"
                      class="w-full flex items-center justify-between mb-3 p-2 -mx-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    >
                      <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400">{{ $t('catalog.modal.size') }}</h3>
                      <svg
                        class="w-4 h-4 transition-transform duration-300 text-gray-600 dark:text-gray-400"
                        :class="{ 'rotate-180': sizeDropdownOpen }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <Transition name="power-dropdown">
                      <div v-if="sizeDropdownOpen" class="space-y-2 mt-2">
                        <label
                          v-for="sizeOption in sizeOptions"
                          :key="sizeOption.value"
                          class="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/15 dark:hover:bg-white/10 cursor-pointer transition-all duration-200 border border-transparent hover:border-brand-yellow/30"
                        >
                          <div class="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              :value="sizeOption.value"
                              v-model="filters.selectedSizes"
                              class="custom-checkbox appearance-none w-5 h-5 rounded-md border-2 border-gray-300 dark:border-gray-400 bg-gray-100 dark:bg-gray-700 cursor-pointer transition-all duration-200 checked:bg-brand-yellow checked:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 shadow-sm"
                            />
                            <svg
                              v-if="filters.selectedSizes.includes(sizeOption.value)"
                              class="absolute w-3.5 h-3.5 text-white pointer-events-none transition-all duration-200 scale-100 drop-shadow-sm"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-yellow transition-colors duration-200">
                            {{ sizeOption.label }}
                          </span>
                        </label>
                      </div>
                    </Transition>
                  </div>

                  <!-- Color Filter (only for heat curtains) -->
                  <div v-if="filters.category === 'heat-curtains'">
                    <button
                      @click="colorDropdownOpen = !colorDropdownOpen"
                      class="w-full flex items-center justify-between mb-3 p-2 -mx-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    >
                      <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400">{{ $t('catalog.modal.color') }}</h3>
                      <svg
                        class="w-4 h-4 transition-transform duration-300 text-gray-600 dark:text-gray-400"
                        :class="{ 'rotate-180': colorDropdownOpen }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <Transition name="power-dropdown">
                      <div v-if="colorDropdownOpen" class="space-y-2 mt-2">
                        <label
                          v-for="colorOption in colorOptions"
                          :key="colorOption.value"
                          class="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/15 dark:hover:bg-white/10 cursor-pointer transition-all duration-200 border border-transparent hover:border-brand-yellow/30"
                        >
                          <div class="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              :value="colorOption.value"
                              v-model="filters.selectedColors"
                              class="custom-checkbox appearance-none w-5 h-5 rounded-md border-2 border-gray-300 dark:border-gray-400 bg-gray-100 dark:bg-gray-700 cursor-pointer transition-all duration-200 checked:bg-brand-yellow checked:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 shadow-sm"
                            />
                            <svg
                              v-if="filters.selectedColors.includes(colorOption.value)"
                              class="absolute w-3.5 h-3.5 text-white pointer-events-none transition-all duration-200 scale-100 drop-shadow-sm"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-yellow transition-colors duration-200">
                            {{ colorOption.label }}
                          </span>
                        </label>
                      </div>
                    </Transition>
                  </div>

                </div>

                <!-- Footer -->
                <div class="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-white/10 dark:border-white/5">
                  <button
                    v-if="hasActiveFilters"
                    @click="resetFilters"
                    class="px-5 py-2.5 rounded-xl font-medium text-sm text-gray-600 dark:text-gray-400 hover:text-brand-yellow dark:hover:text-brand-yellow transition-all duration-300"
                  >
                    {{ $t('catalog.modal.reset') }}
                  </button>
                  <button
                    @click="filterModalOpen = false"
                    class="relative px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300"
                  >
                    <span class="glass-effect absolute inset-0 rounded-xl" />
                    <span class="relative z-10 text-brand-gray dark:text-white">{{ $t('catalog.modal.apply') }}</span>
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>

        <!-- Categories Grid (shown when no category is selected and no search query) -->
        <div v-if="!filters.category && !hasActiveFilters && !route.query.search" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            v-for="(category, index) in categoryList"
            :key="category.slug"
            :category="category"
            v-motion-slide-up
            :delay="index * 100"
          />
        </div>

        <!-- Products Grid (shown when category is selected, filters are active, or search query exists) -->
        <div v-else-if="filters.category || hasActiveFilters || route.query.search" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard
            v-for="(product, index) in filteredProducts"
            :key="product.slug"
            :product="product"
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
import { ref, computed, onMounted, watch } from 'vue'
import { Teleport, Transition } from 'vue'
import { useSeoMeta } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import ProductCard from '@/components/ProductCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import AirConditionerIcon from '@/components/icons/AirConditionerIcon.vue'
import DehumidifierIcon from '@/components/icons/DehumidifierIcon.vue'
import HeatCurtainIcon from '@/components/icons/HeatCurtainIcon.vue'
import HeatingIcon from '@/components/icons/HeatingIcon.vue'
import PurificationIcon from '@/components/icons/PurificationIcon.vue'
import { getProductImage } from '@/utils/imageHelper'
import { useProducts } from '@/composables/useProducts'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { products } = useProducts()

useSeoMeta({
  title: () => `${t('nav.catalog')} - Welkin`,
  description: () => t('catalog.subtitle'),
})

const filterModalOpen = ref(false)
const categoryDropdownOpen = ref(false)
const powerDropdownOpen = ref(false)
const powerKWDropdownOpen = ref(false)
const sizeDropdownOpen = ref(false)
const colorDropdownOpen = ref(false)

const filters = ref({
  category: null as string | null,
  brand: null as string | null,
  powerMin: 0 as number,
  powerMax: 15 as number,
  priceMin: 0 as number,
  priceMax: 5000000 as number,
  sort: 'popular' as string,
  selectedPowerBTU: [] as number[],
  selectedPowerKW: [] as number[],
  selectedSizes: [] as number[],
  selectedColors: [] as string[],
})

const dropdowns = ref({
  sort: false,
})

const maxPower = computed(() => {
  if (products.value.length === 0) return 15
  return Math.max(...products.value.map(p => p.power), 15)
})

const maxPrice = computed(() => {
  if (products.value.length === 0) return 5000000
  if (filters.value.category) {
    const categoryProducts = products.value.filter(p => p.category === filters.value.category)
    return categoryProducts.length > 0 ? Math.max(...categoryProducts.map(p => p.priceValue)) : Math.max(...products.value.map(p => p.priceValue), 5000000)
  }
  return Math.max(...products.value.map(p => p.priceValue), 5000000)
})

const hasActiveFilters = computed(() => {
  return !!(
    filters.value.category ||
    filters.value.brand
  )
})

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.category) count++
  if (filters.value.brand) count++
  if (filters.value.selectedPowerBTU.length > 0) count++
  if (filters.value.selectedPowerKW.length > 0) count++
  if (filters.value.selectedSizes.length > 0) count++
  if (filters.value.selectedColors.length > 0) count++
  return count
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ' + t('catalog.modal.priceUnit')
}

const openFilterModal = () => {
  filterModalOpen.value = true
}

// Функция для обработки query параметров
const applyCategoryFromQuery = () => {
  const categoryParam = route.query.category as string | undefined
  if (categoryParam) {
    // Проверяем, что категория существует
    const categoryExists = categories.value.some(c => c.slug === categoryParam)
    if (categoryExists && filters.value.category !== categoryParam) {
      filters.value.category = categoryParam
      // Убираем query параметр из URL после применения, но сохраняем фильтр
      router.replace({ query: {} })
    }
  }
}

// Сохраняем фильтры в sessionStorage при их изменении
watch(() => filters.value, (newFilters) => {
  const queryParams: Record<string, string> = {}
  
  if (newFilters.category) {
    queryParams.category = newFilters.category
  }
  if (newFilters.brand) {
    queryParams.brand = newFilters.brand
  }
  if (newFilters.selectedPowerBTU.length > 0) {
    queryParams.power = newFilters.selectedPowerBTU.join(',')
  }
  if (newFilters.selectedPowerKW.length > 0) {
    queryParams.powerKW = newFilters.selectedPowerKW.join(',')
  }
  if (newFilters.selectedSizes.length > 0) {
    queryParams.size = newFilters.selectedSizes.join(',')
  }
  if (newFilters.selectedColors.length > 0) {
    queryParams.color = newFilters.selectedColors.join(',')
  }
  
  const queryString = new URLSearchParams(queryParams).toString()
  if (queryString) {
    sessionStorage.setItem('catalogFilters', queryString)
  } else {
    sessionStorage.removeItem('catalogFilters')
  }
}, { deep: true })

// Обработка query параметров при загрузке страницы
onMounted(() => {
  applyCategoryFromQuery()
  
  // Восстанавливаем фильтры из sessionStorage
  const stored = sessionStorage.getItem('catalogFilters')
  if (stored) {
    const params = new URLSearchParams(stored)
    if (params.get('category')) {
      filters.value.category = params.get('category')
    }
    if (params.get('brand')) {
      filters.value.brand = params.get('brand')
    }
    if (params.get('power')) {
      filters.value.selectedPowerBTU = params.get('power')!.split(',').map(Number)
    }
    if (params.get('powerKW')) {
      filters.value.selectedPowerKW = params.get('powerKW')!.split(',').map(Number)
    }
    if (params.get('size')) {
      filters.value.selectedSizes = params.get('size')!.split(',').map(Number)
    }
    if (params.get('color')) {
      filters.value.selectedColors = params.get('color')!.split(',')
    }
  }
  
  // Закрытие выпадающего списка категорий при клике вне его
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const categoryButton = document.querySelector('[data-category-dropdown]')
    if (categoryButton && !categoryButton.contains(target)) {
      categoryDropdownOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
})

// Отслеживаем изменения query параметров
watch(() => route.query.category, () => {
  applyCategoryFromQuery()
})

const resetFilters = () => {
  // НЕ сбрасываем категорию - она должна остаться выбранной
  // Сбрасываем только флажки и значения фильтров
  filters.value.brand = null
  filters.value.selectedPowerBTU = []
  filters.value.selectedPowerKW = []
  filters.value.selectedSizes = []
  filters.value.selectedColors = []
  // Закрываем все выпадающие списки
  powerDropdownOpen.value = false
  powerKWDropdownOpen.value = false
  dropdowns.value.sizeDropdownOpen = false
  dropdowns.value.colorDropdownOpen = false
  // Обновляем sessionStorage с учетом сохраненной категории
  const queryParams: Record<string, string> = {}
  if (filters.value.category) {
    queryParams.category = filters.value.category
  }
  const queryString = new URLSearchParams(queryParams).toString()
  if (queryString) {
    sessionStorage.setItem('catalogFilters', queryString)
  } else {
    sessionStorage.removeItem('catalogFilters')
  }
}

const categories = computed(() => [
  { slug: 'air-conditioners', name: t('catalog.categories.airConditioners') },
  { slug: 'air-purifiers', name: t('catalog.categories.airPurifiers') },
  { slug: 'boilers', name: t('catalog.categories.boilers') },
  { slug: 'dehumidifiers', name: t('catalog.categories.dehumidifiers') },
  { slug: 'heat-curtains', name: t('catalog.categories.heatCurtains') },
])

const categoryList = computed(() => [
  {
    slug: 'air-conditioners',
    name: t('catalog.categories.airConditioners'),
    description: t('categories.descriptions.airConditioners'),
    image: '/images/catalog/welkin/air-conditioners/Nuar.png',
    icon: AirConditionerIcon,
  },
  {
    slug: 'air-purifiers',
    name: t('catalog.categories.airPurifiers'),
    description: t('categories.descriptions.airPurifiers'),
    image: '/images/catalog/welkin/air-purifiers/K08A.png',
    icon: PurificationIcon,
  },
  {
    slug: 'boilers',
    name: t('catalog.categories.boilers'),
    description: t('categories.descriptions.boilers'),
    image: '/images/catalog/welkin/boilers/Diana.png',
    icon: HeatingIcon,
  },
  {
    slug: 'dehumidifiers',
    name: t('catalog.categories.dehumidifiers'),
    description: t('categories.descriptions.dehumidifiers'),
    image: '/images/catalog/welkin/dehumidifiers/CL-158H.png',
    icon: DehumidifierIcon,
  },
  {
    slug: 'heat-curtains',
    name: t('catalog.categories.heatCurtains'),
    description: t('categories.descriptions.heatCurtains'),
    image: '/images/catalog/welkin/heat-curtains/Zavesa_silver.png',
    icon: HeatCurtainIcon,
  },
])

const brands = [
  { value: 'welkin', label: 'Welkin' },
  { value: 'midea', label: 'Midea' },
]

const powerBTUOptions = [
  { value: 7000, label: '7 000 BTU' },
  { value: 9000, label: '9 000 BTU' },
  { value: 12000, label: '12 000 BTU' },
  { value: 18000, label: '18 000 BTU' },
  { value: 24000, label: '24 000 BTU' },
]

const powerKWOptions = [
  { value: 20, label: '20 кВт' },
  { value: 26, label: '26 кВт' },
  { value: 32, label: '32 кВт' },
]

// Функция для округления мощности к ближайшему значению из группы
const roundPowerBTU = (power: number): number => {
  // Группы: 7000, 9000, 12000, 18000, 24000
  if (power <= 8000) return 7000
  if (power <= 11000) return 9000
  if (power <= 15000) return 12000
  if (power <= 21000) return 18000
  return 24000
}

// Функция для проверки, попадает ли мощность в выбранную группу
const isPowerInGroup = (power: number, selectedGroup: number): boolean => {
  return roundPowerBTU(power) === selectedGroup
}

const sizeOptions = computed(() => [
  { value: 90, label: '90см' },
  { value: 120, label: '120см' },
  { value: 150, label: '150см' },
  { value: 180, label: '180см' },
  { value: 200, label: '200см' },
])

const colorOptions = computed(() => [
  { value: 'white', label: t('catalog.modal.colors.white') },
  { value: 'steel', label: t('catalog.modal.colors.steel') },
  { value: 'black', label: t('catalog.modal.colors.black') },
])

const sortOptions = [
  { value: 'popular', label: 'Популярное' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'power-asc', label: 'Мощность: по возрастанию' },
  { value: 'power-desc', label: 'Мощность: по убыванию' },
]

const powerRanges = [
  { value: 'low', label: 'До 2.5 кВт', min: 0, max: 2.5 },
  { value: 'medium', label: '2.5 - 5 кВт', min: 2.5, max: 5 },
  { value: 'high', label: '5 - 10 кВт', min: 5, max: 10 },
  { value: 'very-high', label: 'Свыше 10 кВт', min: 10, max: Infinity },
]

const filteredProducts = computed(() => {
  let result = [...products.value]

  // Filter by search query
  const searchQuery = route.query.search as string | undefined
  if (searchQuery && searchQuery.trim()) {
    const lowerQuery = searchQuery.toLowerCase().trim()
    result = result.filter(p => {
      // Search in original name
      const nameMatch = p.name.toLowerCase().includes(lowerQuery)
      
      // Search in translated name (if available)
      let translatedNameMatch = false
      try {
        const translatedName = t(`products.items.${p.slug}.name`)
        if (translatedName && translatedName !== `products.items.${p.slug}.name`) {
          translatedNameMatch = translatedName.toLowerCase().includes(lowerQuery)
        }
      } catch {
        // Translation not found, ignore
      }
      
      // Search in description (already translated)
      const descriptionMatch = p.description?.toLowerCase().includes(lowerQuery) || false
      
      // Search in category name (already translated)
      const categoryMatch = categories.value.find(c => c.slug === p.category)?.name.toLowerCase().includes(lowerQuery) || false
      
      return nameMatch || translatedNameMatch || descriptionMatch || categoryMatch
    })
  }

  // Filter by category
  if (filters.value.category) {
    result = result.filter(p => p.category === filters.value.category)
  }

  // Filter by brand
  if (filters.value.brand) {
    result = result.filter(p => p.brand === filters.value.brand)
  }

  // Filter by power BTU (only for air conditioners)
  if (filters.value.category === 'air-conditioners' && filters.value.selectedPowerBTU.length > 0) {
    result = result.filter(p => {
      const availablePowerBTU = (p as any).availablePowerBTU || []
      // Проверяем, есть ли хотя бы одна мощность, которая попадает в выбранные группы
      return availablePowerBTU.some((power: number) => 
        filters.value.selectedPowerBTU.some(selectedGroup => isPowerInGroup(power, selectedGroup))
      )
    })
  }

  // Filter by power KW (only for boilers)
  if (filters.value.category === 'boilers' && filters.value.selectedPowerKW.length > 0) {
    result = result.filter(p => {
      const availablePowerKW = (p as any).availablePowerKW || []
      // Проверяем, есть ли хотя бы одна мощность, которая совпадает с выбранными
      return availablePowerKW.some((power: number) => 
        filters.value.selectedPowerKW.includes(power)
      )
    })
  }

  // Filter by size (only for heat curtains)
  if (filters.value.category === 'heat-curtains' && filters.value.selectedSizes.length > 0) {
    result = result.filter(p => {
      const availableSizes = (p as any).availableSizes || []
      return filters.value.selectedSizes.some(size => availableSizes.includes(size))
    })
  }

  // Filter by color (only for heat curtains)
  if (filters.value.category === 'heat-curtains' && filters.value.selectedColors.length > 0) {
    result = result.filter(p => {
      const availableColors = (p as any).availableColors || []
      return filters.value.selectedColors.some(color => availableColors.includes(color))
    })
  }

  // Sort
  switch (filters.value.sort) {
    case 'popular':
      result.sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1
        if (!a.isPopular && b.isPopular) return 1
        // Если оба популярные или оба не популярные, сортируем по алфавиту
        return a.name.localeCompare(b.name, 'ru', { numeric: true })
      })
      break
  }

  // Сортировка по алфавиту по умолчанию (если не выбрана другая сортировка)
  if (filters.value.sort !== 'popular') {
    result.sort((a, b) => a.name.localeCompare(b.name, 'ru', { numeric: true }))
  }

  return result
})
</script>

