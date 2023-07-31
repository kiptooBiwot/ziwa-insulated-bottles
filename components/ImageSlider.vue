<script setup>
const props = defineProps({
  images: {
    type: Array,
    requried: true
  },
  // index: {
  //   type: Number,
  //   requried: true
  // }
})
</script>

<template>
  <div class="relative w-full bg-black bg-opacity-70">
    <div class="absolute top-0 w-full z-20 p-5 lg:py-10 lg:px-10">
      <p class="text-white text-xs flex justify-center">Swipe to view all images</p>
      <div class="text-white flex justify-end">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-10 h-10 hover:scale-105 transform duration-300 hover:shadow-md hover:text-gray-200"
          @click="$emit('closeModal')">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>

      </div>

      <!-- <p class="text-white text-xs">Double  to exit</p> -->
    </div>
    <Swiper :navigation="false" :loop="true" :modules="[]" :effect="'creative'">
      <SwiperSlide v-for="imag in images" :key="imag">
        <img :src="imag" class="mx-auto block object-cover md:object-fill  w-auto h-screen " alt="...">
      </SwiperSlide>
    </Swiper>
  </div>
</template>


<style scoped></style>