<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <SectionWrapper>
        <div v-if="post" class="max-w-4xl mx-auto">
          <RouterLink
            to="/blog"
            class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-brand-yellow mb-6 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            {{ $t('blog.backToBlog') }}
          </RouterLink>

          <article v-motion-slide-up>
            <div class="mb-6">
              <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>{{ formatDate(post.date) }}</span>
                <span class="mx-2">•</span>
                <span>{{ post.category }}</span>
              </div>
              <h1 class="text-4xl md:text-5xl font-bold mb-6">{{ post.title }}</h1>
            </div>

            <div class="relative h-96 mb-8 rounded-3xl overflow-hidden">
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="prose prose-lg dark:prose-invert max-w-none">
              <div v-html="post.content" />
            </div>
          </article>
        </div>
      </SectionWrapper>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import { RouterLink } from 'vue-router'
import { getBlogImage } from '@/utils/imageHelper'

const { t } = useI18n()
const route = useRoute()

const posts = computed(() => [
  {
    slug: 'how-to-choose-ac',
    title: t('blog.posts.howToChooseAc.title'),
    excerpt: t('blog.posts.howToChooseAc.excerpt'),
    image: getBlogImage('how-to-choose-ac'),
    date: '2024-01-15',
    category: t('blog.posts.howToChooseAc.category'),
    content: `
      <p>Выбор кондиционера для дома — это важное решение, которое влияет на комфорт и энергопотребление. В этой статье мы рассмотрим ключевые факторы, которые нужно учитывать при выборе.</p>
      
      <h2>Площадь помещения</h2>
      <p>Первое, что нужно определить — это площадь помещения, которое будет охлаждаться. Для комнаты до 20 м² подойдёт кондиционер мощностью 7000 BTU, для 20-30 м² — 9000 BTU, а для больших помещений — 12000 BTU и выше.</p>
      
      <h2>Тип кондиционера</h2>
      <p>Сплит-системы — самый популярный вариант для квартир и домов. Они состоят из внутреннего и наружного блоков, что обеспечивает тихую работу и эффективное охлаждение.</p>
      
      <h2>Энергоэффективность</h2>
      <p>Обратите внимание на класс энергоэффективности. Инверторные кондиционеры класса A+++ потребляют на 30-40% меньше электроэнергии по сравнению с обычными моделями.</p>
      
      <h2>Дополнительные функции</h2>
      <p>Современные кондиционеры оснащены Wi-Fi управлением, ионизацией воздуха, режимом обогрева и другими полезными функциями. Выбирайте модель с функциями, которые действительно вам нужны.</p>
    `,
  },
  {
    slug: 'energy-saving-tips',
    title: t('blog.posts.energySavingTips.title'),
    excerpt: t('blog.posts.energySavingTips.excerpt'),
    image: getBlogImage('energy-saving-tips'),
    date: '2024-01-10',
    category: t('blog.posts.energySavingTips.category'),
    content: `
      <p>Энергосбережение — это не только забота об окружающей среде, но и значительная экономия средств. Вот несколько практических советов.</p>
      
      <h2>Правильная установка</h2>
      <p>Убедитесь, что кондиционер установлен правильно. Наружный блок должен быть в тени, а внутренний — не подвергаться прямым солнечным лучам.</p>
      
      <h2>Регулярное обслуживание</h2>
      <p>Чистые фильтры и испаритель работают эффективнее. Регулярная чистка может снизить энергопотребление на 10-15%.</p>
      
      <h2>Оптимальная температура</h2>
      <p>Установите температуру на 24-26°C. Каждый градус ниже увеличивает энергопотребление на 5-7%.</p>
    `,
  },
]

const post = computed(() => {
  return posts.value.find(p => p.slug === route.params.slug as string)
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

useSeoMeta({
  title: () => post.value ? `${post.value.title} - Welkin Blog` : `${t('blog.title')} - Welkin`,
  description: () => post.value?.excerpt || '',
})
</script>

<style scoped>
:deep(.prose) {
  @apply text-gray-700 dark:text-gray-300;
}

:deep(.prose h2) {
  @apply text-2xl font-bold mt-8 mb-4 text-brand-gray dark:text-white;
}

:deep(.prose p) {
  @apply mb-4 leading-relaxed;
}
</style>

