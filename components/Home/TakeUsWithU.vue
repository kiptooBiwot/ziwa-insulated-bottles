<script setup>
const images = [
  { imageUrl: '/images/take_1.jpg' },
  { imageUrl: '/images/take_2.jpg' },
  { imageUrl: '/images/take_3.jpg' },
  { imageUrl: '/images/take_4.jpg' },
]
</script>

<template>
  <div class="w-full bg-blue-50 min-h-auto py-20">
    <div class="max-w-6xl mx-5 lg:mx-auto">
      <h3 class="font-display text-3xl font-bold text-center mb-5">
        #TakeUsWithYou
      </h3>
      <div class="block md:flex">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="flex cursor-pointer"
        >
          <!-- <a href="https://www.instagram.com/ziwa_ke/" target="_blank" class=""> -->
          <img
            :src="image.imageUrl"
            alt=""
            class="w-full md:w-[200px] lg:w-[300px] h-auto object-cover"
          />
          <!-- </a> -->
        </div>
      </div>
    </div>
  </div>
</template>
