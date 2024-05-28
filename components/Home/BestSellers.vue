<script setup>
import { useGeneralStore } from '@/stores/general'

const generalStore = useGeneralStore()
</script>

<template>
  <div class="w-full py-10 h-auto">
    <div class="max-w-4xl lg:mx-auto mx-5">
      <h2 class="font-bold text-center text-[38px]">Shop Best Sellers</h2>
      <div class="w-full block gap-5 md:flex md:justify-between">
        <div
          v-for="(bestSeller, index) in generalStore.bestSellers"
          :key="index"
        >
          <!-- <div class="bg-blue-300 rounded-full w-[80%] absolute"></div> -->
          <NuxtLink
            :to="`/shop/${bestSeller.category}`"
            class="bg-white group bg-opacity-80 relative rounded-md h-[350px] md:w-[250px] w-full flex justify-center items-center hover:bg-opacity-100 transition duration-500 ease-in-out"
          >
            <svg
              class="absolute top-[10%] left-0 ml-8 fill-blue-500"
              viewBox="0 0 375 283"
              fill="none"
              style="transform: scale(1.5); opacity: 0.1"
            >
              <rect
                y="175.48"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 0 107.48)"
                fill=""
              />
            </svg>
            <img
              :src="bestSeller.image"
              alt="best sellers"
              class="object-cover absolute h-[80%] transition duration-500 ease-in-out"
            />
            <h5
              class="text-2xl text-blue-600 mt-5 z-20 absolute bottom-1 font-medium group-hover:text-gray-900"
            >
              {{ bestSeller.title }}
            </h5>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- <div class="flex gap-10"> -->

    <!-- <div
        v-for="(card, index) in generalStore.bestSellers"
        :key="index"
        class="flex flex-col"
      >
        <div class="bg-white relative w-[150px]">
          <div
            class="w-[100px] h-[100px] rounded-full bg-green-300 mx-auto absolute inset-0"
          >
            <img
              :src="card.image"
              alt=""
              class="w-auto h-[200px] object-cover"
            />
          </div>
        </div>
        <div>
          <p class="text-blue-600 text-bold text-center">Ziwa Kids</p>
        </div>
      </div> -->
    <!-- </div> -->
  </div>
</template>
