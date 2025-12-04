<script setup>
import { useGeneralStore } from '@/stores/general'

const generalStore = useGeneralStore()
</script>

<template>
  <div class="w-full py-10 h-auto">
    <div class="max-w-4xl lg:mx-auto mx-5">
      <h2 class="font-bold text-center text-[38px]">Shop Best Sellers</h2>

      <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div
          v-for="(bestSeller, index) in generalStore.bestSellers"
          :key="index"
        >
          <NuxtLink
            :to="`/shop/${bestSeller.category}`"
            class="bg-white group bg-opacity-80 relative rounded-md h-[350px] flex justify-center items-center hover:bg-opacity-100 transition duration-500 ease-in-out"
          >
            <svg
              class="absolute top-[10%] left-0 ml-8 fill-blue-500"
              viewBox="0 0 375 283"
              style="transform: scale(1.5); opacity: 0.1"
            >
              <rect
                y="175.48"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 0 107.48)"
              />
            </svg>

            <img
              :src="bestSeller.image"
              alt="best sellers"
              class="object-contain absolute rounded-lg h-[80%] transition duration-500 ease-in-out"
            />

            <h5
              class="text-2xl text-blue-600 mt-5 z-20 absolute bottom-1 text-center font-medium group-hover:text-gray-900"
            >
              {{ bestSeller.title }}
            </h5>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
