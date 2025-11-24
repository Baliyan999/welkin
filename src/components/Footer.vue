<template>
  <footer class="bg-brand-gray dark:bg-gray-950 text-white">
    <div class="section-wrapper">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
        <div>
          <div class="mb-4">
            <img
              src="/images/logo/logo_Welkin_x_Midea.svg"
              alt="Welkin x Midea"
              class="h-10 w-auto"
            />
          </div>
          <p class="text-gray-400 text-sm">
            Современное климатическое оборудование для вашего комфорта
          </p>
        </div>

        <div>
          <h4 class="font-semibold mb-4">{{ $t('footer.about') }}</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <RouterLink to="/about" class="hover:text-brand-yellow transition-colors">
                {{ $t('footer.about') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/contacts" class="hover:text-brand-yellow transition-colors">
                {{ $t('footer.contacts') }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">{{ $t('footer.catalog') }}</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <RouterLink to="/catalog" class="hover:text-brand-yellow transition-colors">
                {{ $t('footer.catalog') }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">{{ $t('footer.blog') }}</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <RouterLink to="/blog" class="hover:text-brand-yellow transition-colors">
                {{ $t('footer.blog') }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Welkin. {{ $t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

