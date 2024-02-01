<script setup>
const props = defineProps(['price'])

</script>

<template>
  <div class="block">
    <span class=" text-red-500 text-[11px] font-bold px-1 py-2 leading-none items-center">
      {{ useCurrencyFormatter(price) }}
    </span>
    <span
      class="block bg-white rounded-full text-orange-500 text-[11px] font-bold px-1 py-2 leading-none items-center line-through">
      {{ useCurrencyFormatter(1800) }}
    </span>
  </div>
</template>
