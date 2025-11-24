<template>
  <section :class="['section-wrapper', customClass]">
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  customClass?: string
}>()
</script>


