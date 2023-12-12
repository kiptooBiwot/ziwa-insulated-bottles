<script setup>
const props = defineProps({
  gift: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- `{ backgroundColor: ${gift.color} }`, -->
  <div class="rounded-3xl h-[400px] w-[95%] md:w-[95%] flex items-center shrink-0 justify-center text-white relative">
    <!-- <div class="absolute top-8 left-10 space-y-3">
    </div> -->
    <!-- <img :src="gift.giftImage" alt="gifts" class="absolute top-8 rounded-md object-contain h-[70%] w-full"> -->
    <img :src="gift.bgImage" alt="" class="absolute h-full rounded-3xl overflow-hidden object-cover inset-0 -z-0">
    <img :src="gift.giftImage" alt="gifts"
      class="absolute inset-0 overflow-hidden  object-cover rounded-3xl shadow-lg h-full w-full">

    <div class="absolute bottom-8 left-8">
      <p class="text-2xl text-red-500 font-bold font-script">{{ gift.text }}</p>
    </div>
  </div>
</template>
