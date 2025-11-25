<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <SectionWrapper>
        <div v-if="post" class="max-w-4xl mx-auto">
          <!-- Back Button -->
          <RouterLink
            to="/blog"
            class="inline-flex items-center text-gray-300 hover:text-brand-yellow mb-8 transition-colors group"
          >
            <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>{{ $t('blog.backToBlog') }}</span>
          </RouterLink>

          <article v-motion-slide-up>
            <!-- Meta Info -->
            <div class="mb-6">
              <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ formatDate(post.date) }}</span>
                </div>
                <div class="flex items-center">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold bg-brand-yellow text-brand-gray">
                    {{ post.category }}
                  </span>
                </div>
              </div>
              <h1 class="text-4xl md:text-5xl font-bold mb-6 text-white">{{ post.title }}</h1>
            </div>

            <!-- Featured Image -->
            <div class="relative h-96 md:h-[500px] mb-12 rounded-3xl overflow-hidden shadow-2xl">
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <!-- Content -->
            <div class="prose prose-lg dark:prose-invert max-w-none mb-12">
              <div v-html="post.content" />
            </div>

            <!-- Share Buttons -->
            <div class="mb-12 pt-8 border-t border-gray-700">
              <h3 class="text-lg font-semibold mb-4 text-white">{{ $t('blog.share') }}</h3>
              <div class="flex flex-wrap gap-3">
                <button
                  @click="shareOnSocial('facebook')"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ $t('blog.social.facebook') }}</span>
                </button>
                <button
                  @click="shareOnSocial('twitter')"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ $t('blog.social.twitter') }}</span>
                </button>
                <button
                  @click="shareOnSocial('telegram')"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ $t('blog.social.telegram') }}</span>
                </button>
                <button
                  @click="copyLink"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm font-medium">{{ $t('blog.copyLink') }}</span>
                </button>
              </div>
            </div>

            <!-- Related Posts -->
            <div v-if="relatedPosts.length > 0" class="pt-8 border-t border-gray-700">
              <h2 class="text-3xl font-bold mb-8 text-white">{{ $t('blog.relatedPosts') }}</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BlogCard
                  v-for="relatedPost in relatedPosts"
                  :key="relatedPost.slug"
                  :post="relatedPost"
                />
              </div>
            </div>
          </article>
        </div>

        <!-- Post Not Found -->
        <div v-else class="max-w-4xl mx-auto text-center py-20">
          <h1 class="text-4xl font-bold mb-4 text-white">{{ $t('blog.postNotFound') }}</h1>
          <RouterLink to="/blog" class="btn btn-primary mt-6">
            {{ $t('blog.backToBlog') }}
          </RouterLink>
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
import BlogCard from '@/components/BlogCard.vue'
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
    categorySlug: 'tips',
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
    categorySlug: 'energyEfficiency',
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
  {
    slug: 'smart-home-climate',
    title: t('blog.posts.smartHomeClimate.title'),
    excerpt: t('blog.posts.smartHomeClimate.excerpt'),
    image: getBlogImage('smart-home-climate'),
    date: '2024-01-05',
    category: t('blog.posts.smartHomeClimate.category'),
    categorySlug: 'technologies',
    content: `
      <p>Умный дом — это будущее комфорта и энергоэффективности. Интеграция климатического оборудования в систему умного дома позволяет автоматизировать управление температурой и создавать идеальные условия для жизни.</p>
      
      <h2>Преимущества умного климата</h2>
      <p>Автоматическое управление температурой в зависимости от времени суток, присутствия людей и погодных условий позволяет значительно снизить энергопотребление и повысить комфорт.</p>
      
      <h2>Интеграция с голосовыми помощниками</h2>
      <p>Современные системы умного дома поддерживают интеграцию с Яндекс Алисой, Google Assistant и другими голосовыми помощниками, что делает управление климатом еще более удобным.</p>
    `,
  },
  {
    slug: 'ventilation-basics',
    title: t('blog.posts.ventilationBasics.title'),
    excerpt: t('blog.posts.ventilationBasics.excerpt'),
    image: getBlogImage('ventilation-basics'),
    date: '2024-01-01',
    category: t('blog.posts.ventilationBasics.category'),
    categorySlug: 'tips',
    content: `
      <p>Вентиляция — важная часть комфортного дома. Правильно спроектированная система вентиляции обеспечивает постоянный приток свежего воздуха и удаление загрязненного.</p>
      
      <h2>Типы вентиляции</h2>
      <p>Естественная вентиляция работает за счет разницы температур и давления. Принудительная вентиляция использует вентиляторы для обеспечения постоянного воздухообмена.</p>
      
      <h2>Планирование вентиляции</h2>
      <p>При строительстве или ремонте важно правильно спланировать систему вентиляции, учитывая площадь помещений, количество жильцов и особенности конструкции дома.</p>
    `,
  },
  {
    slug: 'winter-heating',
    title: t('blog.posts.winterHeating.title'),
    excerpt: t('blog.posts.winterHeating.excerpt'),
    image: getBlogImage('winter-heating'),
    date: '2023-12-20',
    category: t('blog.posts.winterHeating.category'),
    categorySlug: 'maintenance',
    content: `
      <p>Подготовка системы отопления к зиме — важный этап обслуживания, который обеспечит надежную работу оборудования в холодный период.</p>
      
      <h2>Проверка системы</h2>
      <p>Перед началом отопительного сезона необходимо проверить все элементы системы: котлы, радиаторы, трубы и насосы. Обнаруженные проблемы следует устранить до наступления холодов.</p>
      
      <h2>Чистка и обслуживание</h2>
      <p>Регулярная чистка фильтров, проверка давления в системе и настройка автоматики помогут избежать поломок и обеспечить эффективную работу отопления.</p>
    `,
  },
  {
    slug: 'air-quality',
    title: t('blog.posts.airQuality.title'),
    excerpt: t('blog.posts.airQuality.excerpt'),
    image: getBlogImage('air-quality'),
    date: '2023-12-15',
    category: t('blog.posts.airQuality.category'),
    categorySlug: 'health',
    content: `
      <p>Качество воздуха в помещении напрямую влияет на здоровье и комфорт. Очистители и увлажнители воздуха помогают создать здоровую атмосферу в доме.</p>
      
      <h2>Загрязнители воздуха</h2>
      <p>В закрытых помещениях могут накапливаться пыль, аллергены, бактерии и вирусы. Современные очистители воздуха эффективно удаляют эти загрязнители.</p>
      
      <h2>Влажность воздуха</h2>
      <p>Оптимальная влажность воздуха составляет 40-60%. Увлажнители помогают поддерживать этот уровень, особенно в зимний период, когда воздух становится сухим из-за отопления.</p>
    `,
  },
])

const post = computed(() => {
  return posts.value.find(p => p.slug === route.params.slug as string)
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  return posts.value
    .filter(p => 
      p.slug !== post.value?.slug && 
      (p.categorySlug === post.value?.categorySlug || Math.random() > 0.5)
    )
    .slice(0, 2)
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const shareOnSocial = (platform: string) => {
  const url = window.location.href
  const title = post.value?.title || ''
  const text = post.value?.excerpt || ''

  const shareUrls: Record<string, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' ' + text)}`,
  }

  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert(t('blog.linkCopied'))
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

useSeoMeta({
  title: () => post.value ? `${post.value.title} - Welkin Blog` : `${t('blog.title')} - Welkin`,
  description: () => post.value?.excerpt || '',
})
</script>

<style scoped>
:deep(.prose) {
  color: rgb(209 213 219);
}

:deep(.prose h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: rgb(255 255 255);
}

:deep(.prose p) {
  margin-bottom: 1rem;
  line-height: 1.75;
}

:deep(.prose a) {
  color: #FFD700;
}

:deep(.prose a:hover) {
  color: rgba(255, 215, 0, 0.8);
}
</style>
