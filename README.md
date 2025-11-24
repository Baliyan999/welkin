# Welkin - Промо-сайт климатического бренда

Современный, адаптивный и мультиязычный промо-сайт-каталог для климатического бренда Welkin, построенный на Vue 3.

## 🚀 Технологии

- **Vue 3** (Composition API)
- **TypeScript**
- **Vue Router** - маршрутизация
- **Vue i18n** - мультиязычность (ru/uz)
- **Tailwind CSS** - стилизация
- **VueUse Motion** - анимации
- **Vite** - сборка

## 📦 Установка

```bash
npm install
```

## 🛠️ Разработка

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

## 🏗️ Сборка

```bash
npm run build
```

## 📐 Структура проекта

```
welkin/
├── src/
│   ├── components/      # Компоненты
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── HeroSlider.vue
│   │   ├── CategoryGrid.vue
│   │   ├── CategoryCard.vue
│   │   ├── AdvantagesSection.vue
│   │   ├── ProductCard.vue
│   │   ├── BlogCard.vue
│   │   ├── SectionWrapper.vue
│   │   ├── ThemeToggle.vue
│   │   ├── LanguageSwitcher.vue
│   │   └── icons/       # SVG иконки
│   ├── pages/          # Страницы
│   │   ├── HomePage.vue
│   │   ├── CatalogPage.vue
│   │   ├── ProductPage.vue
│   │   ├── BlogPage.vue
│   │   ├── BlogPostPage.vue
│   │   ├── AboutPage.vue
│   │   └── ContactsPage.vue
│   ├── router/         # Роутинг
│   ├── locales/        # Переводы
│   ├── composables/    # Composables
│   ├── style.css       # Глобальные стили
│   └── main.ts         # Точка входа
├── tailwind.config.js  # Конфигурация Tailwind
└── vite.config.ts      # Конфигурация Vite
```

## 🎨 Дизайн

### Цветовая палитра
- **Жёлтый (Brand Yellow)**: `#FFD700`
- **Тёмно-серый (Brand Gray)**: `#2C2C2C`
- Поддержка светлой и тёмной темы

### Типографика
- **Заголовки**: Poppins (font-display)
- **Основной текст**: Inter (font-sans)

## 🌍 Мультиязычность

Поддерживаемые языки:
- Русский (ru) - по умолчанию
- Узбекский (uz)

Переключение языка сохраняется в localStorage.

## 📱 Адаптивность

- Mobile-first подход
- Breakpoints: sm, md, lg, xl
- Максимальная ширина контента: `max-w-screen-xl`

## ✨ Анимации

- Плавные появления элементов при скролле
- Hover-эффекты на интерактивных элементах
- Переходы между страницами
- Анимации через VueUse Motion

## 📄 Страницы

- `/` - Главная страница
- `/catalog` - Каталог товаров
- `/catalog/[slug]` - Страница товара
- `/blog` - Блог
- `/blog/[slug]` - Статья блога
- `/about` - О компании
- `/contacts` - Контакты

## 🔧 Настройка

### Изменение цветов бренда

Отредактируйте `tailwind.config.js`:

```js
colors: {
  brand: {
    yellow: '#FFD700',
    gray: '#2C2C2C',
    // ...
  }
}
```

### Добавление нового языка

1. Создайте файл перевода в `src/locales/[lang].json`
2. Добавьте язык в `src/components/LanguageSwitcher.vue`
3. Импортируйте в `src/main.ts`

## 📝 Лицензия

MIT


