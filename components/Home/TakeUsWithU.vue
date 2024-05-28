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
          v-for="(insta, index) in images"
          :key="index"
          class="w-full h-[400px] relative flex cursor-pointer hover:-translate-y-3 transition duration-1000 ease-in-out hover:shadow-lg"
        >
          <a href="https://www.instagram.com/ziwa_ke/" target="_blank">
            <img
              :src="insta.imageUrl"
              class="inset-0 absolute w-full md:w-[200px] lg:w-[300px] h-[400px] object-cover"
              alt=""
            />
            <div
              class="inset-0 absolute bg-[#395A9F] hover:opacity-60 flex justify-center items-center space-y-4 opacity-0 transition duration-1000 ease-in-out"
            >
              <Icon name="mdi:instagram" class="w-10 h-10 text-white" />
              <!-- <p class="text-white font-title text-4xl">
                  {{ property.title }}
                </p> -->
            </div>
          </a>
        </div>
      </div>

      <!-- <div class="block md:flex">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="flex cursor-pointer relative"
        >
          <div
            class="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 flex items-center justify-center"
          >
            <Icon name="mdi:instagram" class="w-10 h-10 text-white" />
          </div>
          <img
            :src="image.imageUrl"
            alt=""
            class="w-full md:w-[200px] lg:w-[300px] h-auto object-cover"
          />
        </div>

      </div> -->
    </div>
  </div>
</template>
