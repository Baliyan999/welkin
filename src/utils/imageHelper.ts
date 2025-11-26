/**
 * Утилита для получения URL изображений из public/images
 * Изображения в public доступны напрямую по URL
 */

/**
 * Получить изображение товара
 * @param slug - slug товара
 * @param brand - бренд ('welkin' | 'midea')
 * @param category - категория товара ('air-conditioners' | 'dehumidifiers' | 'heat-curtains' | 'boilers' | 'air-purifiers')
 */
export function getProductImage(
  slug: string,
  brand: 'welkin' | 'midea' = 'welkin',
  category: 'air-conditioners' | 'dehumidifiers' | 'heat-curtains' | 'boilers' | 'air-purifiers' = 'air-conditioners'
): string {
  return `/images/catalog/${brand}/${category}/${slug}.png`
}

/**
 * Получить изображение статьи блога
 */
export function getBlogImage(slug: string): string {
  // Временно используем одно изображение как заглушку для всех постов
  return `/images/blog/how-to-choose-ac.png`
}

/**
 * Получить изображение hero слайдера
 */
export function getHeroImage(name: string): string {
  return `/images/hero/${name}.png`
}

/**
 * Получить логотип
 */
export function getLogo(name: string = 'logo'): string {
  return `/images/logo/${name}.svg`
}

/**
 * Получить изображение категории
 * @param slug - slug категории ('air-conditioners' | 'dehumidifiers' | 'heat-curtains' | 'boilers' | 'air-purifiers')
 */
export function getCategoryImage(slug: string): string {
  return `/images/categories/${slug}.png`
}

