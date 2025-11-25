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
    <!-- Временно закомментировано - возможно пригодится когда каталог будет большим
    <div class="text-center mt-12">
      <RouterLink to="/catalog" class="btn btn-outline">
        {{ $t('categories.viewAll') }}
      </RouterLink>
    </div>
    -->
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
    image: '/images/catalog/welkin/air-conditioners/Nuar.png',
    icon: AirConditionerIcon,
  },
  {
    slug: 'air-purifiers',
    name: 'Очиститель/Увлажнитель воздуха',
    description: 'Очистители и увлажнители',
    image: '/images/catalog/welkin/air-purifiers/K08A.png',
    icon: PurificationIcon,
  },
  {
    slug: 'boilers',
    name: 'Газовый котел',
    description: 'Отопительные котлы',
    image: '/images/catalog/welkin/boilers/Diana.png',
    icon: HeatingIcon,
  },
  {
    slug: 'dehumidifiers',
    name: 'Осушители воздуха',
    description: 'Осушители для помещений',
    image: '/images/catalog/welkin/dehumidifiers/CL-158H.png',
    icon: DehumidifierIcon,
  },
  {
    slug: 'heat-curtains',
    name: 'Воздушные/Тепловые завесы',
    description: 'Воздушные и тепловые завесы',
    image: '/images/catalog/welkin/heat-curtains/Zavesa_silver.png',
    icon: HeatCurtainIcon,
  },
]
</script>

