<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <SectionWrapper>
        <div class="max-w-6xl mx-auto">
          <h1 class="text-center mb-4" v-motion-slide-up>
            {{ $t('contacts.title') }}
          </h1>
          <p class="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            {{ $t('contacts.subtitle') }}
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div v-motion-slide-right>
              <div class="space-y-6">
                <div class="card p-6">
                  <h3 class="text-xl font-bold mb-4 flex items-center">
                    <svg class="w-6 h-6 mr-3 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ $t('contacts.address') }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ $t('contacts.addressValue') }}
                  </p>
                </div>

                <div class="card p-6">
                  <h3 class="text-xl font-bold mb-4 flex items-center">
                    <svg class="w-6 h-6 mr-3 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {{ $t('contacts.phone') }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    <a href="tel:+998901234567" class="hover:text-brand-yellow transition-colors">
                      {{ $t('contacts.phoneValue') }}
                    </a>
                  </p>
                </div>

                <div class="card p-6">
                  <h3 class="text-xl font-bold mb-4 flex items-center">
                    <svg class="w-6 h-6 mr-3 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {{ $t('contacts.email') }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    <a href="mailto:info@welkin.uz" class="hover:text-brand-yellow transition-colors">
                      {{ $t('contacts.emailValue') }}
                    </a>
                  </p>
                </div>

                <div class="card p-6">
                  <h3 class="text-xl font-bold mb-4 flex items-center">
                    <svg class="w-6 h-6 mr-3 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ $t('contacts.hours') }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                    {{ $t('contacts.hoursValue') }}
                  </p>
                </div>
              </div>
            </div>

            <div class="card p-8" v-motion-slide-left>
              <h2 class="text-2xl font-bold mb-6">{{ $t('contacts.form.title') }}</h2>
              <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold mb-2">{{ $t('contacts.form.name') }}</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    minlength="2"
                    maxlength="100"
                    :placeholder="$t('contacts.form.namePlaceholder')"
                    @input="sanitizeName"
                    class="w-full px-4 py-3 rounded-xl border transition-all"
                    :class="{
                      'border-red-500 dark:border-red-500': errors.name,
                      'border-gray-300 dark:border-gray-700': !errors.name,
                      'bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand-yellow focus:border-transparent': true
                    }"
                  />
                  <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2">{{ $t('contacts.form.phone') }}</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    :placeholder="$t('contacts.form.phonePlaceholder')"
                    @input="formatPhone"
                    maxlength="20"
                    class="w-full px-4 py-3 rounded-xl border transition-all"
                    :class="{
                      'border-red-500 dark:border-red-500': errors.phone,
                      'border-gray-300 dark:border-gray-700': !errors.phone,
                      'bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand-yellow focus:border-transparent': true
                    }"
                  />
                  <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2">
                    {{ $t('contacts.form.message') }}
                    <span class="text-gray-500 dark:text-gray-400 text-xs font-normal ml-1">({{ $t('contacts.form.messageOptional') }})</span>
                  </label>
                  <textarea
                    v-model="form.message"
                    rows="5"
                    maxlength="1000"
                    :placeholder="$t('contacts.form.messagePlaceholder')"
                    @input="sanitizeMessage"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all"
                  />
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                    {{ form.message.length }}/1000
                  </p>
                </div>
                <button type="submit" class="btn btn-primary w-full" :disabled="isSubmitting">
                  <span v-if="isSubmitting">{{ $t('contacts.form.submitting') }}</span>
                  <span v-else>{{ $t('contacts.form.submit') }}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useSeoMeta } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'

const { t } = useI18n()

useSeoMeta({
  title: () => `${t('contacts.title')} - Welkin`,
  description: () => `${t('contacts.title')} - ${t('contacts.subtitle')}`,
})

const form = ref({
  name: '',
  phone: '',
  message: '',
})

const errors = reactive({
  name: '',
  phone: '',
})

const isSubmitting = ref(false)

// Санитизация строки от HTML/JS инъекций
const sanitizeString = (str: string): string => {
  if (!str) return ''
  return str
    .replace(/[<>]/g, '') // Удаляем < и >
    .replace(/javascript:/gi, '') // Удаляем javascript:
    .replace(/on\w+=/gi, '') // Удаляем обработчики событий (onclick=, onerror= и т.д.)
    .replace(/script/gi, '') // Удаляем script
    .trim()
}

// Валидация и санитизация имени
const sanitizeName = () => {
  form.value.name = sanitizeString(form.value.name)
  if (form.value.name.length > 0 && form.value.name.length < 2) {
    errors.name = t('contacts.validation.nameMin')
  } else {
    errors.name = ''
  }
}

// Форматирование и валидация телефона
const formatPhone = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '') // Удаляем все кроме цифр
  
  // Автоматически добавляем + если его нет
  if (value.length > 0 && !form.value.phone.startsWith('+')) {
    value = '+' + value
  }
  
  // Ограничиваем длину (максимум 15 цифр после +)
  if (value.length > 16) {
    value = value.slice(0, 16)
  }
  
  form.value.phone = value
  
  // Валидация
  if (form.value.phone.length > 0) {
    const phoneDigits = form.value.phone.replace(/\D/g, '')
    if (phoneDigits.length < 9) {
      errors.phone = t('contacts.validation.phoneMin')
    } else if (phoneDigits.length > 15) {
      errors.phone = t('contacts.validation.phoneMax')
    } else {
      errors.phone = ''
    }
  } else {
    errors.phone = ''
  }
}

// Санитизация сообщения
const sanitizeMessage = () => {
  form.value.message = sanitizeString(form.value.message)
  // Ограничиваем длину
  if (form.value.message.length > 1000) {
    form.value.message = form.value.message.slice(0, 1000)
  }
}

// Валидация формы перед отправкой
const validateForm = (): boolean => {
  let isValid = true
  
  // Валидация имени
  const name = sanitizeString(form.value.name)
  if (name.length < 2) {
    errors.name = t('contacts.validation.nameMin')
    isValid = false
  } else {
    errors.name = ''
  }
  
  // Валидация телефона
  const phoneDigits = form.value.phone.replace(/\D/g, '')
  if (phoneDigits.length < 9) {
    errors.phone = t('contacts.validation.phoneMin')
    isValid = false
  } else if (phoneDigits.length > 15) {
    errors.phone = t('contacts.validation.phoneMax')
    isValid = false
  } else {
    errors.phone = ''
  }
  
  return isValid
}

const handleSubmit = async () => {
  // Санитизация всех полей
  form.value.name = sanitizeString(form.value.name)
  form.value.phone = sanitizeString(form.value.phone)
  form.value.message = sanitizeString(form.value.message)
  
  // Валидация
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // TODO: Отправка в Telegram бот
    // Пример структуры для будущей интеграции:
    // const telegramBotToken = 'YOUR_BOT_TOKEN'
    // const chatId = 'YOUR_CHAT_ID'
    // const safeMessage = sanitizeString(form.value.message || 'Не указано')
    // const message = `Новая заявка:\nИмя: ${sanitizeString(form.value.name)}\nТелефон: ${sanitizeString(form.value.phone)}\nСообщение: ${safeMessage}`
    // await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
    
    // Временная заглушка
    await new Promise(resolve => setTimeout(resolve, 500))
    
    alert(t('contacts.form.success'))
    form.value = { name: '', phone: '', message: '' }
    errors.name = ''
    errors.phone = ''
  } catch (error) {
    console.error('Ошибка отправки формы:', error)
    alert(t('contacts.form.error'))
  } finally {
    isSubmitting.value = false
  }
}
</script>

