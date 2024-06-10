<script setup>
import { useProductStore } from '@/stores/product.js'
const props = defineProps(['price'])

const productStore = useProductStore()

const originalPrice = computed(() => {
  return (props.price += productStore.discountAmount)
})

console.log('ORIGINAL PRICE:', originalPrice)
</script>

<template>
  <div class="block">
    <span
      class="text-red-500 text-[11px] font-bold px-1 py-2 leading-none items-center"
    >
      {{ useCurrencyFormatter(price) }}
    </span>
    <span
      class="block bg-white rounded-full text-orange-500 text-[11px] font-bold px-1 py-2 leading-none items-center line-through"
    >
      <!-- <div v-if=""></div> -->
      {{ useCurrencyFormatter(originalPrice) }}
    </span>
  </div>
</template>
