<template>
  <footer class="relative bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-brand-gray dark:via-gray-900 dark:to-black text-gray-900 dark:text-white overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-brand-yellow rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 opacity-5" style="background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>

    <div class="section-wrapper relative z-10">
      <!-- Main Footer Content -->
      <div class="pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-10 lg:pb-12">
        <!-- Top Section: Logo & Social Media -->
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-10 lg:mb-12 pb-8 md:pb-10 lg:pb-12 border-b border-gray-300 dark:border-gray-700/50">
          <!-- Logo -->
          <div class="flex-1 w-full md:w-auto">
            <div class="mb-4 md:mb-6 transform hover:scale-105 transition-transform duration-300 flex justify-center max-w-md">
              <img
                :src="logoPath"
                alt="Welkin x Midea"
                class="h-8 md:h-10 lg:h-12 w-auto filter drop-shadow-lg"
              />
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed max-w-md mx-auto md:mx-0 text-center md:text-left">
              {{ $t('footer.description') }}
            </p>
          </div>

          <!-- Social Media -->
          <div class="flex flex-col items-center w-full md:w-auto">
              <h4 class="font-semibold text-base md:text-lg text-gray-900 dark:text-white relative inline-block mb-3 md:mb-4">
              <span class="relative z-10">{{ $t('footer.socialMedia') }}</span>
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-yellow to-transparent"></span>
            </h4>
            <div class="flex items-center gap-3 md:gap-4">
              <a
                href="https://www.instagram.com/dmitriistratulenko"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-3 shadow-md dark:shadow-lg hover:shadow-pink-500/50 border border-gray-200 dark:border-gray-700 hover:border-transparent"
              >
                <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400 group-hover:text-white transition-all duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
              </a>
              <a
                href="https://t.me/Welkin_hvac_Midea"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 hover:from-blue-500 hover:to-blue-600 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-rotate-3 shadow-md dark:shadow-lg hover:shadow-blue-500/50 border border-gray-200 dark:border-gray-700 hover:border-transparent"
              >
                <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400 group-hover:text-white transition-all duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z"/>
                </svg>
                <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
              </a>
            </div>
          </div>
        </div>

        <!-- Middle Section: Addresses & Contacts -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10 lg:mb-12">
          <!-- Showroom Addresses -->
          <div>
            <div class="text-center mb-4 md:mb-6">
              <h4 class="font-semibold text-base md:text-lg text-gray-900 dark:text-white relative inline-block">
                <span class="relative z-10">{{ $t('footer.showroomAddress') }}</span>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-yellow to-transparent"></span>
              </h4>
            </div>
            <div class="flex flex-col gap-3 md:gap-4">
              <!-- Address 1 -->
              <button
                @click="openMapModal(1)"
                class="group relative p-4 md:p-5 rounded-xl md:rounded-2xl bg-white dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 hover:border-brand-yellow/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-yellow/10 hover:-translate-y-1 cursor-pointer w-full text-left shadow-sm dark:shadow-none"
              >
                <div class="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-brand-yellow/0 to-brand-yellow/0 group-hover:from-brand-yellow/5 group-hover:to-transparent transition-all duration-300"></div>
                <div class="relative z-10 flex items-center gap-3 md:gap-4">
                  <div class="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-brand-yellow/20">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div class="flex-1 text-center">
                    <p class="text-gray-900 dark:text-white text-xs md:text-sm font-medium leading-relaxed">{{ $t('footer.address1') }}</p>
                  </div>
                </div>
              </button>

              <!-- Address 2 -->
              <button
                @click="openMapModal(2)"
                class="group relative p-4 md:p-5 rounded-xl md:rounded-2xl bg-white dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 hover:border-brand-yellow/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-yellow/10 hover:-translate-y-1 cursor-pointer w-full text-left shadow-sm dark:shadow-none"
              >
                <div class="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-brand-yellow/0 to-brand-yellow/0 group-hover:from-brand-yellow/5 group-hover:to-transparent transition-all duration-300"></div>
                <div class="relative z-10 flex items-center gap-3 md:gap-4">
                  <div class="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 border border-brand-yellow/20">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div class="flex-1 text-center">
                    <p class="text-gray-900 dark:text-white text-xs md:text-sm font-medium leading-relaxed">{{ $t('footer.address2') }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Contact Info -->
          <div>
            <div class="text-center mb-4 md:mb-6">
              <h4 class="font-semibold text-base md:text-lg text-gray-900 dark:text-white relative inline-block">
                <span class="relative z-10">{{ $t('footer.contact') }}</span>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-yellow to-transparent"></span>
              </h4>
            </div>
            <div class="space-y-3 md:space-y-4">
              <!-- Service Center -->
              <div class="group relative p-4 md:p-5 rounded-xl md:rounded-2xl bg-white dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 hover:border-brand-yellow/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-yellow/10 hover:-translate-y-1 shadow-sm dark:shadow-none">
                <div class="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-brand-yellow/0 to-brand-yellow/0 group-hover:from-brand-yellow/5 group-hover:to-transparent transition-all duration-300"></div>
                <div class="relative z-10 flex items-center gap-3 md:gap-4">
                  <div class="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-brand-yellow/20">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div class="flex-1 text-center">
                    <p class="text-gray-500 dark:text-gray-400 text-xs mb-1 md:mb-2 uppercase tracking-wider font-semibold">{{ $t('footer.serviceCenter') }}</p>
                    <a href="tel:+998991234567" class="text-gray-900 dark:text-white text-xs md:text-sm font-medium hover:text-brand-yellow transition-colors block">
                      {{ $t('footer.servicePhone') }}
                    </a>
                  </div>
                </div>
              </div>

              <!-- Sales Department -->
              <div class="group relative p-4 md:p-5 rounded-xl md:rounded-2xl bg-white dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 hover:border-brand-yellow/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-yellow/10 hover:-translate-y-1 shadow-sm dark:shadow-none">
                <div class="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-brand-yellow/0 to-brand-yellow/0 group-hover:from-brand-yellow/5 group-hover:to-transparent transition-all duration-300"></div>
                <div class="relative z-10 flex items-center gap-3 md:gap-4">
                  <div class="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 border border-brand-yellow/20">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div class="flex-1 text-center">
                    <p class="text-gray-500 dark:text-gray-400 text-xs mb-1 md:mb-2 uppercase tracking-wider font-semibold">{{ $t('footer.salesDepartment') }}</p>
                    <a href="tel:+998999876543" class="text-gray-900 dark:text-white text-xs md:text-sm font-medium hover:text-brand-yellow transition-colors block">
                      {{ $t('footer.salesPhone') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-6 md:pt-8 border-t border-gray-300 dark:border-gray-700/50">
          <div class="flex justify-center">
            <p class="text-gray-600 dark:text-gray-400 text-xs md:text-sm text-center px-4">
              &copy; {{ new Date().getFullYear() }} Welkin & Midea. {{ $t('footer.rights') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Selection Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="mapModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          @click.self="mapModalOpen = false"
        >
          <div
            class="relative bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
            v-motion-pop
          >
            <button
              @click="mapModalOpen = false"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {{ $t('footer.chooseMap') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {{ selectedAddress }}
            </p>

            <div class="flex flex-col gap-4">
              <button
                @click="openMap('yandex')"
                class="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/30 dark:hover:to-red-800/30 transition-all duration-200 border-2 border-red-200 dark:border-red-800 group shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                <div class="w-20 h-20 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg p-2 overflow-hidden">
                  <img 
                    src="/images/footer/yandex_maps.png" 
                    alt="Yandex Maps" 
                    class="w-full h-full object-contain"
                  />
                </div>
                <div class="flex-1 text-left">
                  <p class="font-bold text-lg text-gray-900 dark:text-white mb-1">{{ $t('footer.yandexMaps') }}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Откроет маршрут в Яндекс Картах</p>
                </div>
                <svg class="w-6 h-6 text-red-500 dark:text-red-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                @click="openMap('google')"
                class="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 hover:from-blue-100 hover:to-green-100 dark:hover:from-blue-900/30 dark:hover:to-green-900/30 transition-all duration-200 border-2 border-blue-200 dark:border-blue-800 group shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                <div class="w-20 h-20 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg p-2 overflow-hidden">
                  <img 
                    src="/images/footer/google_maps.png" 
                    alt="Google Maps" 
                    class="w-full h-full object-contain"
                  />
                </div>
                <div class="flex-1 text-left">
                  <p class="font-bold text-lg text-gray-900 dark:text-white mb-1">{{ $t('footer.googleMaps') }}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Откроет маршрут в Google Maps</p>
                </div>
                <svg class="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import { Teleport, Transition } from 'vue'

const { t } = useI18n()
const { isDark } = useTheme()

const logoPath = computed(() => {
  return isDark.value 
    ? '/images/logo/logo_Welkin_x_Midea.svg'
    : '/images/logo/logo_Welkin_x_Midea_light.svg'
})

const mapModalOpen = ref(false)
const selectedAddressNumber = ref<number | null>(null)

const selectedAddress = computed(() => {
  if (selectedAddressNumber.value === 1) {
    return t('footer.address1')
  } else if (selectedAddressNumber.value === 2) {
    return t('footer.address2')
  }
  return ''
})

const selectedCoords = computed(() => {
  if (selectedAddressNumber.value === 1) {
    return t('footer.address1Coords')
  } else if (selectedAddressNumber.value === 2) {
    return t('footer.address2Coords')
  }
  return ''
})

const openMapModal = (addressNumber: number) => {
  selectedAddressNumber.value = addressNumber
  mapModalOpen.value = true
}

const openMap = (mapType: 'yandex' | 'google') => {
  if (!selectedCoords.value) return

  const [lat, lon] = selectedCoords.value.split(',')

  if (mapType === 'yandex') {
    // Yandex Maps URL with directions
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      // Для мобильных устройств пробуем открыть приложение Яндекс Карт
      const yandexAppUrl = `yandexmaps://maps.yandex.ru/?pt=${lon},${lat}&z=15`
      window.location.href = yandexAppUrl
      
      // Fallback на веб версию
      setTimeout(() => {
        const yandexWebUrl = `https://yandex.ru/maps/?pt=${lon},${lat}&z=15&rtext=~${lat},${lon}`
        window.open(yandexWebUrl, '_blank')
      }, 1000)
    } else {
      // Для десктопа открываем веб версию с маршрутом
      const yandexWebUrl = `https://yandex.ru/maps/?pt=${lon},${lat}&z=15&rtext=~${lat},${lon}`
      window.open(yandexWebUrl, '_blank')
    }
  } else if (mapType === 'google') {
    // Google Maps URL with directions
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      // Для мобильных устройств пробуем открыть приложение Google Maps
      const googleAppUrl = `comgooglemaps://?daddr=${lat},${lon}&directionsmode=driving`
      window.location.href = googleAppUrl
      
      // Fallback на веб версию
      setTimeout(() => {
        const googleWebUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`
        window.open(googleWebUrl, '_blank')
      }, 1000)
    } else {
      // Для десктопа открываем веб версию с маршрутом
      const googleWebUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`
      window.open(googleWebUrl, '_blank')
    }
  }

  mapModalOpen.value = false
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  opacity: 0;
  transform: scale(0.9);
}
</style>
