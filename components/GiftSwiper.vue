<script setup>
const props = defineProps({
  gift: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="rounded-3xl h-[400px] w-[95%] md:w-[95%] flex items-center shrink-0 justify-center text-white relative"
    :class="`{ backgroundColor: ${gift.color} }`">
    <!-- <div class="absolute top-8 left-10 space-y-3">
    </div> -->
    <!-- <img :src="gift.giftImage" alt="gifts" class="absolute top-8 rounded-md object-contain h-[70%] w-full"> -->
    <img :src="gift.giftImage" alt="gifts"
      class="absolute inset-0 overflow-hidden  object-fill rounded-3xl shadow-lg h-full w-full">

    <div class="absolute bottom-8 left-8">
      <p class="text-2xl font-bold font-script">{{ gift.text }}</p>
    </div>
  </div>
</template>
