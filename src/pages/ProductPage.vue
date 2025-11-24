<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <SectionWrapper>
        <div v-if="product" class="max-w-7xl mx-auto">
          <!-- Back Button -->
          <RouterLink
            :to="getBackToCatalogUrl()"
            class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-brand-yellow mb-8 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            {{ $t('product.backToCatalog') }}
          </RouterLink>

          <!-- Product Header -->
          <div class="mb-12" v-motion-slide-up>
            <h1 class="text-4xl md:text-5xl font-bold">{{ product.name }}</h1>
          </div>

          <!-- Product Images and Info -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <!-- Image Gallery -->
            <div class="relative" v-motion-slide-right>
              <div class="bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 flex items-center justify-center min-h-[500px] relative overflow-hidden max-w-full">
                <!-- Color-based images for heat curtains with carousel effect -->
                <template v-if="product.category === 'heat-curtains' && (product as any).colorImages">
                  <div
                    v-for="(color, index) in allColors"
                    :key="color"
                    class="absolute inset-0 flex items-center justify-center transition-opacity duration-1000"
                    :class="{ 'opacity-100 z-10': selectedColor === color && isColorAvailable(color), 'opacity-0 z-0': selectedColor !== color || !isColorAvailable(color) }"
                  >
                    <div class="product-page-image-container overflow-hidden">
                      <img
                        v-if="isColorAvailable(color)"
                        :src="(product as any).colorImages[color]"
                        :alt="`${product.name} - ${$t(`catalog.modal.colors.${color}`)}`"
                        class="product-page-image"
                      />
                    </div>
                  </div>
                </template>
                <!-- Regular slider for multiple images -->
                <template v-else>
                  <!-- Multiple images with slider -->
                  <template v-if="productImages.length > 1">
                    <div
                      v-for="(img, index) in productImages"
                      :key="index"
                      class="absolute inset-0 flex items-center justify-center transition-opacity duration-1000"
                      :class="{ 'opacity-100 z-10': selectedImageIndex === index, 'opacity-0 z-0': selectedImageIndex !== index }"
                    >
                      <div class="product-page-image-container">
                        <img
                          :src="img"
                          :alt="`${product.name} - ${index + 1}`"
                          class="product-page-image"
                        />
                      </div>
                    </div>
                  </template>
                  <!-- Single image (if only one) -->
                  <div v-else class="product-page-image-container">
                    <img
                      v-if="productImages.length === 1"
                      :src="productImages[0]"
                      :alt="product.name"
                      class="product-page-image"
                    />
                  </div>
                </template>
              </div>
              <!-- Navigation dots (if multiple images, not for heat curtains with colors) -->
              <div v-if="productImages.length > 1 && !(product.category === 'heat-curtains' && (product as any).colorImages)" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                <button
                  v-for="(_, index) in productImages"
                  :key="index"
                  @click="selectedImageIndex = index"
                  class="w-3 h-3 rounded-full transition-all duration-300"
                  :class="selectedImageIndex === index ? 'bg-brand-yellow w-8' : 'bg-white/50 hover:bg-white/70'"
                  :aria-label="`Go to image ${index + 1}`"
                />
              </div>
              <!-- Thumbnail Gallery (if multiple images, not for heat curtains with colors) -->
              <div v-if="productImages.length > 1 && !(product.category === 'heat-curtains' && (product as any).colorImages)" class="flex gap-4 mt-4 overflow-x-auto">
                <button
                  v-for="(img, index) in productImages"
                  :key="index"
                  @click="selectedImageIndex = index"
                  class="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all"
                  :class="selectedImageIndex === index 
                    ? 'border-brand-yellow ring-2 ring-brand-yellow ring-offset-2' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-yellow'"
                >
                  <img
                    :src="img"
                    :alt="`${product.name} - ${index + 1}`"
                    class="w-full h-full object-contain bg-gray-50 dark:bg-gray-800"
                  />
                </button>
              </div>
            </div>

            <!-- Product Info -->
            <div v-motion-slide-left>
              <div class="sticky top-24">
                <div v-if="product.price" class="text-4xl font-bold text-brand-yellow mb-8">
                  {{ product.price }}
                </div>

                <!-- Quick Info -->
                <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
                  <div class="space-y-4">
                    <div v-if="product.brand" class="flex items-center justify-between">
                      <span class="text-gray-600 dark:text-gray-400 font-medium">{{ $t('product.brand') }}</span>
                      <span class="font-semibold text-brand-gray dark:text-white capitalize">{{ product.brand }}</span>
                    </div>
                    <div v-if="product.category" class="flex items-center justify-between">
                      <span class="text-gray-600 dark:text-gray-400 font-medium">{{ $t('product.category') }}</span>
                      <span class="font-semibold text-brand-gray dark:text-white">
                        {{ $t(`catalog.categories.${getCategoryKey(product.category)}`) }}
                      </span>
                    </div>
                    <div v-if="product.category === 'air-conditioners' && (product as any).availablePowerBTU && (product as any).availablePowerBTU.length > 0" class="flex items-center justify-between">
                      <span class="text-gray-600 dark:text-gray-400 font-medium">{{ $t('catalog.modal.power') }}</span>
                      <div class="flex items-center gap-2 flex-wrap justify-end">
                        <button
                          v-for="powerBTU in (product as any).availablePowerBTU"
                          :key="powerBTU"
                          @click="selectedPowerBTU = powerBTU"
                          class="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                          :class="{
                            'text-brand-gray dark:text-white font-semibold': selectedPowerBTU === powerBTU,
                            'text-gray-700 dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow': selectedPowerBTU !== powerBTU
                          }"
                        >
                          <span
                            v-if="selectedPowerBTU === powerBTU"
                            class="glass-effect absolute inset-0 rounded-xl"
                          />
                          <span class="relative z-10">
                            {{ formatPowerBTU(powerBTU) }}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div v-if="product.category === 'heat-curtains' && (product as any).availableSizes && (product as any).availableSizes.length > 0" class="flex items-center justify-between">
                      <span class="text-gray-600 dark:text-gray-400 font-medium">{{ $t('catalog.modal.size') }}</span>
                      <div class="flex items-center gap-2 flex-wrap justify-end">
                        <button
                          v-for="size in (product as any).availableSizes"
                          :key="size"
                          @click="selectedSize = size"
                          class="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                          :class="{
                            'text-brand-gray dark:text-white': selectedSize === size,
                            'text-gray-700 dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow': selectedSize !== size
                          }"
                        >
                          <span
                            v-if="selectedSize === size"
                            class="glass-effect absolute inset-0 rounded-xl"
                          />
                          <span class="relative z-10">
                            {{ size }}см
                          </span>
                        </button>
                      </div>
                    </div>
                    <div v-if="product.category === 'heat-curtains'" class="flex items-center justify-between">
                      <span class="text-gray-600 dark:text-gray-400 font-medium">{{ $t('catalog.modal.color') }}</span>
                      <div class="flex items-center gap-2 flex-wrap justify-end">
                        <button
                          v-for="color in allColors"
                          :key="color"
                          @click="isColorAvailable(color) && (selectedColor = color)"
                          :disabled="!isColorAvailable(color)"
                          class="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                          :class="{
                            'text-brand-gray dark:text-white': selectedColor === color && isColorAvailable(color),
                            'text-gray-700 dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow': selectedColor !== color && isColorAvailable(color),
                            'opacity-40 cursor-not-allowed text-gray-400 dark:text-gray-500': !isColorAvailable(color)
                          }"
                        >
                          <span
                            v-if="selectedColor === color && isColorAvailable(color)"
                            class="glass-effect absolute inset-0 rounded-xl"
                          />
                          <span class="relative z-10">
                            {{ $t(`catalog.modal.colors.${color}`) }}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Specifications -->
                <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
                  <button
                    @click="specificationsExpanded = !specificationsExpanded"
                    class="w-full flex items-center justify-between text-left"
                  >
                    <h3 class="text-xl font-bold text-brand-gray dark:text-white">{{ $t('product.specifications') }}</h3>
                    <svg
                      class="w-5 h-5 text-brand-gray dark:text-white transition-transform duration-300"
                      :class="{ 'rotate-180': specificationsExpanded }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <Transition name="specifications">
                    <dl v-if="specificationsExpanded" class="space-y-4 mt-6">
                      <div
                        v-for="spec in currentSpecifications"
                        :key="spec.name"
                        class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <dt class="font-semibold text-brand-gray dark:text-white">{{ spec.name }}</dt>
                        <dd class="text-gray-600 dark:text-gray-400 text-right">{{ spec.value }}</dd>
                      </div>
                      <div v-if="currentSpecifications.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400 italic">
                        {{ $t('product.noSpecifications') }}
                      </div>
                    </dl>
                  </Transition>
                </div>

                <!-- Order Button -->
                <button class="btn btn-primary w-full">
                  {{ buyText }}
                </button>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-16" v-motion-slide-up>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 lg:p-8">
              <h2 class="text-2xl font-bold mb-6 text-brand-gray dark:text-white">{{ $t('product.description') }}</h2>
              <div class="prose prose-lg dark:prose-invert max-w-none">
                <p 
                  v-if="product.fullDescription"
                  class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
                  :class="descriptionExpanded ? '' : 'line-clamp-2'"
                >
                  {{ product.fullDescription }}
                </p>
                <p 
                  v-else-if="product.description"
                  class="text-gray-600 dark:text-gray-400 italic"
                  :class="descriptionExpanded ? '' : 'line-clamp-2'"
                >
                  {{ product.description }}
                </p>
              </div>
              <button
                v-if="(product.fullDescription || product.description) && ((product.fullDescription || product.description)?.length || 0) > 150"
                @click="descriptionExpanded = !descriptionExpanded"
                class="mt-4 text-sm text-brand-yellow hover:text-brand-yellow/80 transition-colors font-medium"
              >
                {{ descriptionExpanded ? $t('products.collapse') : $t('products.expand') }}
              </button>
            </div>
          </div>

          <!-- Related Products -->
          <div v-motion-slide-up>
            <h2 class="text-3xl font-bold mb-8">{{ $t('product.related') }}</h2>
            <div v-if="relatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard
                v-for="related in relatedProducts"
                :key="related.slug"
                :product="related"
              />
            </div>
            <p v-else class="text-gray-500 dark:text-gray-400 text-center py-8">
              {{ $t('product.noRelated') }}
            </p>
          </div>
        </div>

        <!-- Product Not Found -->
        <div v-else class="max-w-4xl mx-auto text-center py-20">
          <h1 class="text-4xl font-bold mb-4">{{ $t('product.notFound') }}</h1>
          <RouterLink to="/catalog" class="btn btn-primary mt-6">
            {{ $t('product.backToCatalog') }}
          </RouterLink>
        </div>
      </SectionWrapper>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import ProductCard from '@/components/ProductCard.vue'
import { RouterLink } from 'vue-router'
import { useProducts } from '@/composables/useProducts'

const { t, locale } = useI18n()
const route = useRoute()
const { products } = useProducts()

// Сохраняем фильтры из sessionStorage при загрузке страницы товара
const savedFilters = ref<string>('')

onMounted(() => {
  // Восстанавливаем сохраненные фильтры из sessionStorage
  const stored = sessionStorage.getItem('catalogFilters')
  if (stored) {
    savedFilters.value = stored
  }
})

const selectedImageIndex = ref(0)
const selectedSize = ref<number | null>(null)
const selectedColor = ref<string | null>(null)
const selectedPowerBTU = ref<number | null>(null)
const specificationsExpanded = ref(false)
const descriptionExpanded = ref(false)


const buyText = computed(() => {
  // Добавляем locale.value в зависимости для реактивности
  const currentLocale = locale.value
  try {
    const text = t('products.buy')
    return text && text !== 'products.buy' ? text : (currentLocale === 'uz' ? 'Buyurtma berish' : 'Заказать')
  } catch {
    return currentLocale === 'uz' ? 'Buyurtma berish' : 'Заказать'
  }
})

const product = computed(() => {
  return products.value.find(p => p.slug === route.params.slug as string)
})

const productImages = computed(() => {
  if (!product.value) return []
  
  // For heat curtains, use color-based images
  if (product.value.category === 'heat-curtains' && (product.value as any).colorImages) {
    const colorImages = (product.value as any).colorImages as Record<string, string>
    const availableColors = (product.value as any).availableColors || []
    // Return images for available colors
    return availableColors.map((color: string) => colorImages[color] || product.value.image).filter(Boolean)
  }
  
  // If product has multiple images, use them; otherwise use the main image
  if (product.value.images && product.value.images.length > 0) {
    return product.value.images
  }
  return [product.value.image]
})

const mainImage = computed(() => {
  return productImages.value[selectedImageIndex.value] || product.value?.image || ''
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.value
    .filter(p => 
      p.category === product.value?.category && 
      p.slug !== product.value?.slug
    )
    .slice(0, 4)
})

const currentSpecifications = computed(() => {
  if (!product.value) return []
  
  // For heat curtains, use size-based specifications
  if (product.value.category === 'heat-curtains' && selectedSize.value) {
    const sizeSpecs = (product.value as any).sizeSpecifications as Record<number, Array<{ name: string; value: string }>> | undefined
    if (sizeSpecs && sizeSpecs[selectedSize.value]) {
      return sizeSpecs[selectedSize.value]
    }
  }
  
  // For other products, use regular specifications
  return product.value.specifications || []
})

const getCategoryKey = (category: string) => {
  const categoryMap: Record<string, string> = {
    'air-conditioners': 'airConditioners',
    'air-purifiers': 'airPurifiers',
    'boilers': 'boilers',
    'dehumidifiers': 'dehumidifiers',
    'heat-curtains': 'heatCurtains',
  }
  return categoryMap[category] || category
}

const formatPowerBTU = (powerBTU: number) => {
  return new Intl.NumberFormat('ru-RU').format(powerBTU) + ' BTU'
}

const allColors = computed(() => ['white', 'steel', 'black'])

const isColorAvailable = (color: string) => {
  if (!product.value || product.value.category !== 'heat-curtains') return false
  const availableColors = (product.value as any).availableColors || []
  return availableColors.includes(color)
}

// Initialize selected size, color, and power when product changes
watch(() => product.value, (newProduct) => {
  if (newProduct && newProduct.category === 'heat-curtains') {
    const sizes = (newProduct as any).availableSizes || []
    const colors = (newProduct as any).availableColors || []
    // Set first available size and color as default
    selectedSize.value = sizes.length > 0 ? sizes[0] : null
    selectedColor.value = colors.length > 0 ? colors[0] : null
    selectedPowerBTU.value = null
  } else if (newProduct && newProduct.category === 'air-conditioners') {
    const powerBTU = (newProduct as any).availablePowerBTU || []
    // Set first available power as default
    selectedPowerBTU.value = powerBTU.length > 0 ? powerBTU[0] : null
    selectedSize.value = null
    selectedColor.value = null
  } else {
    selectedSize.value = null
    selectedColor.value = null
    selectedPowerBTU.value = null
  }
  // Reset selected color if it's not available
  if (newProduct && newProduct.category === 'heat-curtains' && selectedColor.value) {
    const colors = (newProduct as any).availableColors || []
    if (!colors.includes(selectedColor.value)) {
      selectedColor.value = colors.length > 0 ? colors[0] : null
    }
  }
  // Reset specificationsExpanded and descriptionExpanded when product changes
  specificationsExpanded.value = false
  descriptionExpanded.value = false
}, { immediate: true })

// Функция для получения URL возврата к каталогу с сохраненными фильтрами
const getBackToCatalogUrl = () => {
  if (!product.value) return '/catalog'
  
  // Если есть сохраненные фильтры, используем их
  if (savedFilters.value) {
    return `/catalog?${savedFilters.value}`
  }
  
  // Иначе используем категорию товара
  return `/catalog?category=${product.value.category}`
}

useSeoMeta({
  title: () => product.value ? `${product.value.name} - Welkin` : `${t('products.title')} - Welkin`,
  description: () => product.value?.description || '',
})
</script>
