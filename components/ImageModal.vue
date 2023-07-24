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
  <div id="default-carousel" data-carousel="slide">
    <!-- {{ images }} -->
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-screen">
      <!-- Item 1 -->
      <!-- <template> -->
      <!-- <img 
      src="https://images.unsplash.com/photo-1604854429029-4a80f1cce783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW55dGhpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
      alt="" class="w-full h-full object-contain"> -->
      <div v-for="(image, index) in images" :key="index" class="duration-700 ease-in-out">
        <!-- {{ image[index] }} -->
        <img :src="image" class="absolute block w-auto h-screen -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          alt="...">
      </div>
      <!-- </template> -->
      <!-- Item 2 -->
      <!-- <div class="hidden duration-700 ease-in-out" data-carousel-item>
              <img src="/docs/images/carousel/carousel-2.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
          </div> -->
      <!-- Item 3 -->
      <!-- <div class="hidden duration-700 ease-in-out" data-carousel-item>
              <img src="/docs/images/carousel/carousel-3.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
          </div> -->
      <!-- Item 4 -->
      <!-- <div class="hidden duration-700 ease-in-out" data-carousel-item>
              <img src="/docs/images/carousel/carousel-4.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
          </div> -->
      <!-- Item 5 -->
      <!-- <div class="hidden duration-700 ease-in-out" data-carousel-item>
              <img src="/docs/images/carousel/carousel-5.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
          </div> -->
    </div>
    <!-- Slider indicators -->
    <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
      <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"
        data-carousel-slide-to="0"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"
        data-carousel-slide-to="1"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"
        data-carousel-slide-to="2"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4"
        data-carousel-slide-to="3"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5"
        data-carousel-slide-to="4"></button>
    </div>
    <!-- Slider controls -->
    <button type="button"
      class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-prev>
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 ">
        <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button type="button"
      class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-next>
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 ">
        <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</template>


<style lang="scss" scoped></style>