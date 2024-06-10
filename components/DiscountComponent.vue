<script setup>
import { useProductStore } from '@/stores/product.js'
const props = defineProps(['price'])

// console.log('PRICE PROP', props.price)

const productStore = useProductStore()

const originalPrice = computed(() => {
  let propPrice = props.price
  const originalP = (propPrice += productStore.discountAmount)
  return originalP
})
// const discountedPrice = computed(() => {
//   const discounted = (props.price -= productStore.discountAmount)
//   return discounted
// })
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
      {{ useCurrencyFormatter(originalPrice) }}
    </span>
  </div>
</template>
