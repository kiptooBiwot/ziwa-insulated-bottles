<script setup>
import { useProductStore } from '@/stores/product'
import bottle from '~/assets/images/products/bottle1-bg.png'

const productStore = useProductStore()

useHead({
  title: 'Ziwa | Home of Insulated Water bottles'
})
</script>

<template>
  <div class="">
    <section id="home" class="">
      <Hero />
    </section>
    <!-- bg-[#e8efff] -->


    <section id="shop" class="py-20 min-h-screen">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-gray-900 font-medium text-3xl tracking-tight">
          Our Bottle Varieties
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <template v-for="(product, index) in productStore.products" :key="index">
            <div v-for="(img, i) in product.images" :key="i"
              class="flex-shrink-0 m-6 relative overflow-hidden bg-blue-300 rounded-lg max-w-xs shadow-lg">
              <!-- [#89CFF0] -->
              <!-- :class="`bg-${product.bgColor}`" -->
              <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
                style="transform: scale(1.5); opacity: 0.1;">
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)"
                  fill="white" />
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
              </svg>
              <div class="relative pt-10 px-10 flex items-center justify-center">
                <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style="background: radial-gradient(black, transparent 60%); transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1); opacity: 0.2;">
                </div>
                <img class="relative w-auto h-[250px]" :src="img.url" alt="">
              </div>
              <div class="relative text-white px-6 pb-6 mt-6">
                <span class="block opacity-75 -mb-1 text-gray-600 text-xs">{{ img.bottleTitle }}</span>
                <div class="flex justify-between">
                  <NuxtLink :to="`/item/${product.slug}`" :image="img.id">
                    <span
                      class="block font-medium text-lg text-gray-800 transform duration-500 ease-in-out hover:scale-105 hover:text-gray-700 ">View
                      Details</span>
                  </NuxtLink>
                  <span
                    class="block bg-white rounded-full text-orange-500 text-[11px] font-bold px-1 py-2 leading-none items-center">
                    {{ useCurrencyFormatter(product.price) }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

