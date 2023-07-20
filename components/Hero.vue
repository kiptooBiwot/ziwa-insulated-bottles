<script setup>

import bottle1 from '@/assets/images/products/bottle1-bg.png'
import bottle2 from '@/assets/images/products/bottle2-bg.png'
import bottle3 from '@/assets/images/products/bottle3-bg.png'
import bottle4 from '@/assets/images/products/bottle4-bg.png'
import bottle5 from '@/assets/images/products/bottle5-bg.png'
import bottle6 from '@/assets/images/products/bottle6-bg.png'
import bottle7 from '@/assets/images/products/bottle7-bg.png'
import bottle8 from '@/assets/images/products/bottle8-bg.png'
import products from '@/assets/images/products/products1.png'

// const products = reactive([bottle1, bottle2, bottle3, bottle4, bottle5, bottle6, bottle7, bottle8])

</script>

<template>
  <!--  -->
  <div class="w-full  bg-[#395A9F] to-[#89CFF0] relative min-h-screen inset-0 overflow-hidden">
    <!-- <svg class="absolute  mb-8" viewBox="0 0 375 283" fill="none" style="transform: scale(1.5); opacity: 0.1;">
      <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
      <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
    </svg> -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-7 text-white min-h-screen max-w-6xl container mx-auto px-5 xl:px-0">
      <div class="space-y-5 flex-1 h-full flex items-center mt-[120px]  md:mt-0">
        <div class="block space-y-4 md:space-y-8 mb-20 md:mb-0">
          <h1 class="text-6xl md:text-6xl xl:text-7xl lg:leading-loose font-display font-extrabold text-white">
            Stay Refreshed, <span class="text-[#89CFF0]">Stay Hydrated.</span>
          </h1>
          <h3 class="text-lg lg:text-2xl font-normal text-white font-display">Discover the Ultimate Insulated Water
            Bottles</h3>
        </div>
      </div>
      <div class="flex-1 h-full flex items-center pb-40 md:pb-0">
        <img :src="products" alt="" class="w-full h-auto object-fill">
      </div>
    </div>
  </div>
</template>


<style scoped></style>