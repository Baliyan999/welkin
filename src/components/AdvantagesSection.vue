<template>
  <SectionWrapper class="bg-gray-50 dark:bg-gray-800/50 rounded-3xl">
    <div class="text-center mb-12" v-motion-slide-up>
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
        class="text-center"
        v-motion-slide-up
        :delay="index * 100"
      >
        <div class="w-20 h-20 bg-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
          <component :is="advantage.icon" class="w-10 h-10 text-brand-gray" />
        </div>
        <h3 class="text-xl font-bold mb-2">
          {{ $t(`advantages.${advantage.key}.title`) }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          {{ $t(`advantages.${advantage.key}.description`) }}
        </p>
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

