<script setup>
import { useProductStore } from "@/stores/product"

import kids_1 from '@/assets/images/kids/lid_base_kids.jpeg'
import kids_2 from '@/assets/images/kids/lid_kids.jpeg'
import kids_3 from '@/assets/images/kids/inner_lining_kids.jpeg'
import kids_4 from '@/assets/images/kids/navy_kids_horizontal.jpeg'
import kids_5 from '@/assets/images/kids/kids_2.jpeg'
import kids_6 from '@/assets/images/kids/red_kids.jpeg'

const productStore = useProductStore()

const kidsProducts = ref(null)

const sendId = (id) => {
  productStore.imageId = id
}

onMounted(async () => {

  if (productStore.dbProducts.length < 1) {
    await productStore.getAllProducts()
  }
  productStore.getKidsProducts()
})
</script>

<template>
  <div class="min-h-screen">
    <section id="about" class="min-h-screen">
      <div class="max-w-6xl mx-auto py-40 px-5 xl:px-0">
        <h3 class="text-[#39519f] font-medium text-lg">Little Ziwa</h3>
        <h2 class="text-gray-900 font-medium text-xl md:text-xl tracking-tight mt-6">
          Meet "Little Ziwa" – Style, Fun, and Sip Perfection for Your Little Explorer!
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 mt-5">
          <div
            class="md:col-span-7 space-y-8 text-justify flex leading-relaxed flex-col justify-start order-last md:order-first">
            <p class="text-xl font-medium">
              Elevate Every Sip: Little Ziwa is more than a drink companion; it's a style statement. Crafted to add flair
              to your child's sipping experience, this vessel brags of top tier functionality for your little one.
            </p>
            <!-- <p>
              That's the world that Ziwa is trying to create. From superior thermal retention capabilities, the leak proof
              design and an aesthetically pleasing vessel that is personalised your own way. We offer superior quality
              products for adults and kids in the sleeves of designs for the African Market.
            </p> -->
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <img :src="kids_3" alt="" class="hidden md:flex w-auto h-[350px] object-contain rounded-lg mb-5">
              <img :src="kids_4" alt="" class="hidden md:flex w-auto h-[350px] object-contain rounded-lg mb-5">
              <img :src="kids_5" alt="" class="hidden md:flex w-auto h-[350px] object-contain rounded-lg mb-5">
              <img :src="kids_6" alt="" class="hidden md:flex w-auto h-[350px] object-contain rounded-lg mb-5">
            </div>
          </div>
          <div class=" md:col-span-5 h-auto">
            <!-- Image -->
            <div class="block order-first md:order-last">
              <img :src="kids_1" alt="" class="hidden md:flex w-auto h-[350px] mx-auto object-cover rounded-lg mb-5">
              <img :src="kids_2" alt="" class="flex w-auto h-[350px] mx-auto object-cover rounded-lg">

            </div>
          </div>
        </div>
        <div>
          <h3>Buy the Little Ziwa Bottle</h3>
          KIDS PRODUCTS
          <!-- <div v-if="productStore.kidsProducts">

            {{ productStore.kidsProducts }}
          </div> -->
          <div v-if="productStore.kidsProducts" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <!-- <template v-for="(product, index) in productStore.kidsProducts" :key="index"> -->
            <div v-for="img in productStore.kidsProducts.images" :key="img._id"
              class="flex-shrink-0 m-6 md:m-2 relative overflow-hidden bg-blue-200 rounded-lg w-auto md:max-w-xs shadow-lg">
              <!-- [#89CFF0] -->
              <NuxtLink :to="{
                name: 'item-slug',
                params: { slug: productStore.kidsProducts.slug },
              }" @click="sendId(img._id)">
                <!-- :class="`bg-${product.bgColor}`" -->
                <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
                  style="transform: scale(1.5); opacity: 0.1">
                  <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)"
                    fill="white" />
                  <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                </svg>
                <div class="relative pt-10 px-10 flex items-center justify-center">
                  <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style="
                      background: radial-gradient(black, transparent 60%);
                      transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1);
                      opacity: 0.2;
                    "></div>
                  <img class="relative w-auto h-[250px]" :src="img.url" alt="" />
                </div>
                <div class="relative text-white px-6 pb-6 mt-6">
                  <span v-if="productStore.kidsProducts.category === 'big-bottle'"
                    class="block opacity-75 -mb-1 text-gray-600 text-xs">{{
                      img.color }} Water Bottle
                  </span>
                  <span v-else class="block opacity-75 -mb-1 text-gray-600 text-xs">Little Ziwa in {{ img.color
                  }}</span>
                  <div class="flex items-end justify-between">
                    <!-- <NuxtLink :to="`/item/${product.slug}`" :image="img._id"> -->

                    <span
                      class="block font-medium text-lg text-gray-800 transform duration-500 ease-in-out hover:scale-105 hover:text-gray-700">View
                      Details</span>
                    <DiscountComponent
                      v-if="productStore.discountOffer && productStore.kidsProducts.category === 'big-bottle'"
                      :price="img.price" />
                    <span v-else
                      class="block bg-white rounded-full text-orange-500 text-[11px] font-bold px-1 py-2 leading-none items-center">
                      {{ useCurrencyFormatter(img.price) }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>
            <!-- </template> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
