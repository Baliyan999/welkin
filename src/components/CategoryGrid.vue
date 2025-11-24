<template>
  <SectionWrapper>
    <h2 class="text-center mb-12" v-motion-slide-up>
      {{ $t('categories.title') }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <CategoryCard
        v-for="(category, index) in categories"
        :key="category.slug"
        :category="category"
        v-motion-slide-up
        :delay="index * 100"
      />
    </div>
    <div class="text-center mt-12">
      <RouterLink to="/catalog" class="btn btn-outline">
        {{ $t('categories.viewAll') }}
      </RouterLink>
    </div>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionWrapper from './SectionWrapper.vue'
import CategoryCard from './CategoryCard.vue'
import AirConditionerIcon from './icons/AirConditionerIcon.vue'
import DehumidifierIcon from './icons/DehumidifierIcon.vue'
import HeatCurtainIcon from './icons/HeatCurtainIcon.vue'
import HeatingIcon from './icons/HeatingIcon.vue'
import PurificationIcon from './icons/PurificationIcon.vue'

const categories = [
  {
    slug: 'air-conditioners',
    name: 'Кондиционеры',
    description: 'Сплит-системы и мульти-сплит системы',
    icon: AirConditionerIcon,
  },
  {
    slug: 'air-purifiers',
    name: 'Очистители воздуха',
    description: 'Очистители и увлажнители',
    icon: PurificationIcon,
  },
  {
    slug: 'boilers',
    name: 'Котлы',
    description: 'Отопительные котлы',
    icon: HeatingIcon,
  },
  {
    slug: 'dehumidifiers',
    name: 'Осушители воздуха',
    description: 'Осушители для помещений',
    icon: DehumidifierIcon,
  },
  {
    slug: 'heat-curtains',
    name: 'Тепловые завесы',
    description: 'Воздушные и тепловые завесы',
    icon: HeatCurtainIcon,
  },
]
</script>

