<script setup>
import products from '@/assets/images/products/products1.png'
import heroImg from '@/assets/images/hero_img-no-bg.png'
</script>

<template>
  <!-- bg-[#395A9F] to-[#89CFF0] -->
  <div class="w-full bg-white  bg-opacity-90 relative min-h-screen inset-0 overflow-x-hidden">
    <div class=" grid grid-cols-1 md:grid-cols-2 md:h-screen">
      <div
        class="space-y-5 flex-1 w-[90%] md:mx-16 mx-auto h-full flex items-center justify-center mt-[80px] pb-10 md:pb-0  md:mt-0">
        <div class="block space-y-4 md:space-y-8 mb-20 md:mb-0">
          <h1 class="text-5xl md:text-6xl xl:text-7xl lg:leading-loose font-display font-extrabold text-gray-800">
            Stay <br> Refreshed, <br><span class="text-[#395A9F]">Stay Hydrated.</span>
          </h1>
          <h3 class="text-normal lg:text-2xl font-normal text-gray-800 font-display">Discover the Ultimate Insulated Water
            Bottles</h3>
        </div>
      </div>
      <div class="flex-1 h-full flex items-center justify-center bg-[#395A9F] bg-opacity-10 py-10 md:pb-0">
        <img :src="heroImg" alt="" class="w-auto px-5 py-10 md:px-0 md:py-0 md:w-auto h-full mx-auto object-cover">
      </div>
    </div>
  </div>
</template>


<style scoped></style>