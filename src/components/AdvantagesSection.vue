<template>
  <SectionWrapper>
    <div class="text-center mb-16" v-motion-slide-up>
      <h2 class="mb-4">
        {{ $t('advantages.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        {{ $t('advantages.subtitle') }}
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(advantage, index) in advantages"
        :key="advantage.key"
        class="group relative"
        v-motion-slide-up
        :delay="index * 100"
      >
        <!-- Card with glass effect and hover animations -->
        <div class="relative h-full glass-effect rounded-3xl p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
          <!-- Animated background gradient -->
          <div class="absolute inset-0 bg-gradient-to-br from-brand-yellow/0 via-brand-yellow/5 to-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          
          <!-- Icon container with animation -->
          <div class="relative z-10 mb-6">
            <div class="w-24 h-24 bg-gradient-to-br from-brand-yellow to-brand-yellow/80 rounded-3xl flex items-center justify-center mx-auto mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-2xl">
              <component :is="advantage.icon" class="w-12 h-12 text-brand-gray transform transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
          
          <!-- Content -->
          <div class="relative z-10">
            <h3 class="text-xl font-bold mb-3 text-brand-gray dark:text-white transition-colors duration-300 group-hover:text-brand-yellow">
              {{ $t(`advantages.${advantage.key}.title`) }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
              {{ $t(`advantages.${advantage.key}.description`) }}
            </p>
          </div>
          
          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-brand-yellow/5 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <!-- Shine effect on hover -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup lang="ts">
import SectionWrapper from './SectionWrapper.vue'
import QualityIcon from './icons/QualityIcon.vue'
import PunctualityIcon from './icons/PunctualityIcon.vue'
import ServiceGuaranteeIcon from './icons/ServiceGuaranteeIcon.vue'
import ProfessionalismIcon from './icons/ProfessionalismIcon.vue'
import PaymentIcon from './icons/PaymentIcon.vue'
import MoneyBackIcon from './icons/MoneyBackIcon.vue'
import DeliveryIcon from './icons/DeliveryIcon.vue'
import InstallationIcon from './icons/InstallationIcon.vue'

const advantages = [
  { key: 'quality', icon: QualityIcon },
  { key: 'punctuality', icon: PunctualityIcon },
  { key: 'service-guarantee', icon: ServiceGuaranteeIcon },
  { key: 'professionalism', icon: ProfessionalismIcon },
  { key: 'payment', icon: PaymentIcon },
  { key: 'money-back', icon: MoneyBackIcon },
  { key: 'delivery', icon: DeliveryIcon },
  { key: 'installation', icon: InstallationIcon },
]
</script>

