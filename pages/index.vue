<script setup>
import { useProductStore } from '@/stores/product'

import bottle from '~/assets/images/products/bottle1-bg.png'
import bottle1 from '~/assets/images/products/bottle2-bg.png'
import bottle2 from '~/assets/images/products/bottle3-bg.png'
import bottle3 from '~/assets/images/products/bottle4-bg.png'
import bottle4 from '~/assets/images/products/bottle5-bg.png'
import bottle5 from '~/assets/images/products/bottle6-bg.png'

import celebrate from '/assets/images/celebrate.jpeg'
import tisTheSeason from '/assets/images/tis-the-season.jpeg'
import toast from '/assets/images/toast.jpeg'

import image from '~/assets/images/MOK_4601.jpeg'
import img from '~/assets/images/ziwa_phenomenal.jpg'
import image_13 from '~/assets/images/MOK_4602.jpeg'
import image_1 from '~/assets/images/MOK_4783.jpg'
import image_2 from '~/assets/images/MOK_4796.jpg'
import image_3 from '~/assets/images/MOK_4797.jpg'
import image_4 from '~/assets/images/MOK_4802.jpg'
import image_5 from '~/assets/images/MOK_4804.jpg'
import image_6 from '~/assets/images/MOK_4808.jpg'
import image_7 from '~/assets/images/MOK_4815.jpg'
import image_8 from '~/assets/images/MOK_4820.jpg'
import image_9 from '~/assets/images/MOK_4829.jpg'
import image_10 from '~/assets/images/MOK_4835.jpg'
import image_11 from '~/assets/images/MOK_4849.jpg'
import image_12 from '~/assets/images/MOK_4858.jpg'
import image_14 from '~/assets/images/MOK_4886.jpg'
import image_15 from '~/assets/images/MOK_4902.jpg'
import image_16 from '~/assets/images/the-season.jpg'

import bg_1 from '~/assets/images/hero/MOK_4815-removebg.png'
import bg_2 from '~/assets/images/hero/MOK_4820-removebg.png'
import bg_3 from '~/assets/images/hero/MOK_4829-removebg.png'
import bg_4 from '~/assets/images/hero/MOK_4835-removebg.png'
import bg_5 from '~/assets/images/hero/MOK_4886-removebg.png'
import bg_6 from '~/assets/images/hero/MOK_4910-removebg.png'

const productStore = useProductStore()
const nuxtApp = useNuxtApp()

// console.log('FACEBOOK PIXEL', nuxtApp.$fb);
nuxtApp.$fb.enable()

useHead({
  title: 'Ziwa | Home of Insulated Water bottles',
})

onMounted(async () => {
  isLoading.value = true
  productStore.getAllProducts()

  isLoading.value = false
})

const isLoading = ref(false)
const images = reactive([
  image,
  img,
  image_13,
  image_6,
  image_11,
  // image_7,
  image_14,
  // image_15,
  // image_12,
])

const giftItems = ref([
  // { text: 'Gift It!', giftImage: celebrate, color: 'bg-rose-800' },
  {
    text: 'Love It!',
    giftImage: bg_5,
    color: '',
    bgImage:
      'https://images.unsplash.com/photo-1606310737718-01c223c7425b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    text: 'Gift It!',
    giftImage: bg_2,
    color: '',
    bgImage:
      'https://images.unsplash.com/photo-1576072320516-24b83088e525?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    text: 'Carry It!',
    giftImage: bg_6,
    color: '',
    bgImage:
      'https://images.unsplash.com/photo-1575110201245-23bee4c5aa62?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    text: 'Sip It!',
    giftImage: bg_4,
    color: '',
    bgImage:
      'https://images.unsplash.com/photo-1545735089-fe9e1e4f4569?q=80&w=1533&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  // { text: '', giftImage: celebrate, color: 'bg-rose-800' },
  // { text: 'Sip It!', giftImage: bottle, color: 'bg-yellow-500' },
  // { text: '', giftImage: toast, color: 'bg-yellow-500' },
  // { text: 'Carry It!', giftImage: bottle4, color: 'bg-teal-500' },
  // { text: 'Love It!', giftImage: bottle5, color: 'bg-blue-500' },
])

const bestSellers = ref([
  { title: 'Jungle Green', image: bottle },
  { title: 'Navy', image: bottle4 },
  { title: 'Shadow', image: bottle5 },
  // { title: 'Wine Red', image: bottle2 },
])
const sendId = (id) => {
  productStore.imageId = id
}

const loadCarousel = ref(false)
const products = ref([])
const closeModal = () => {
  loadCarousel.value = !loadCarousel.value
}
</script>

<template>
  <div>
    <!-- bg-[#E8E8E9] -->
    <div class="">
      <!-- <HomeHero /> -->
      <HomeHeroOne />
    </div>

    <div>
      <HomeBestSellers />
    </div>

    <div class="w-full py-20">
      <div class="max-w-2xl lg:mx-auto mx-5 space-y-10">
        <h2 class="font-bold text-5xl text-center">
          Premium Drinkware products to ensure you get to take us with you on
          any adventure life takes you on
        </h2>
        <div class="">
          <p class="text-[18px] leading-7 text-center">
            Every Ziwa vessel is ingeniously created with you in mind. Whether
            you’re an avid water drinker or a true tea enthusiast, Ziwa products
            integrate seamlessly in your life, proving to be the trusty sidekick
            you never knew you needed.
          </p>
          <div class="flex justify-center pt-10">
            <NuxtLink
              to="/about-us"
              class="py-3 px-6 bg-yellow-400 text-white uppercase rounded-full"
              >Read More</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>

    <section>
      <HomeTakeUsWithU />
    </section>

    <!-- Shop section -->
    <!-- <section
      id="Shop"
      class="py-20 min-h-screen md:bg-[#39519f] md:bg-opacity-5"
    >
      <div class="max-w-6xl mx-auto px-5">
        <h3 class="text-[#39519f] font-semibold">Shop</h3>
        <h2 class="text-gray-900 font-medium text-3xl tracking-tight mb-4">
          Our Bottle Varieties
        </h2>

        <div class="relative">
          <div
            v-if="isLoading"
            class="absolute inset-0 h-full w-full flex items-center justify-center"
          >
            <Spinner />
          </div>
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <template
              v-for="(product, index) in productStore.dbProducts"
              :key="index"
            >
              <div
                v-for="img in product.images"
                :key="img._id"
                class="flex-shrink-0 m-6 md:m-2 relative overflow-hidden bg-blue-200 rounded-lg w-auto md:max-w-xs shadow-lg"
              >
                 [#89CFF0] -->
    <!-- <NuxtLink
                  :to="{
                    name: 'item-slug',
                    params: { slug: product.slug },
                  }"
                  @click="sendId(img._id)"
                > -->
    <!--:class="`bg-${product.bgColor}`" -->
    <!-- <svg
                    class="absolute bottom-0 left-0 mb-8"
                    viewBox="0 0 375 283"
                    fill="none"
                    style="transform: scale(1.5); opacity: 0.1"
                  >
                    <rect
                      x="159.52"
                      y="175"
                      width="152"
                      height="152"
                      rx="8"
                      transform="rotate(-45 159.52 175)"
                      fill="white"
                    />
                    <rect
                      y="107.48"
                      width="152"
                      height="152"
                      rx="8"
                      transform="rotate(-45 0 107.48)"
                      fill="white"
                    />
                  </svg>
                  <div
                    class="relative pt-10 px-10 flex items-center justify-center"
                  >
                    <div
                      class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                      style="
                        background: radial-gradient(black, transparent 60%);
                        transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1);
                        opacity: 0.2;
                      "
                    ></div>
                    <img
                      v-if="product.category === 'big-bottle'"
                      class="relative w-auto h-[250px]"
                      :src="img.url"
                      alt=""
                    />
                    <img
                      v-else-if="product.category === 'tumblers'"
                      class="relative w-auto h-[250px]"
                      :src="img.url"
                      alt=""
                    /> -->

    <!-- h-[450px] no object-cover-->
    <!-- <img
                      v-else
                      class="relative w-full h-[250px] object-cover"
                      :src="img.url"
                      alt=""
                    />
                  </div>
                  <div class="relative text-white px-6 pb-6 mt-6">
                    <span
                      v-if="product.category === 'big-bottle'"
                      class="block opacity-75 -mb-1 text-gray-600 text-xs"
                    >
                      {{ img.color }} {{ img.capacity }} ml Water Bottle
                    </span>
                    <span
                      v-else-if="product.category === 'tumblers'"
                      class="block opacity-75 -mb-1 text-gray-600 text-xs"
                      >{{ img.color }} Tumbler
                      <span v-if="img.capacity === 1183">(40 Oz)</span>
                      <span v-else>(30 Oz)</span>
                    </span>
                    <span
                      v-else
                      class="block opacity-75 -mb-1 text-gray-600 text-xs"
                      >Little Ziwa in {{ img.color }}</span
                    >
                    <div class="flex items-end justify-between"> -->
    <!-- <NuxtLink :to="`/item/${product.slug}`" :image="img._id"> -->

    <!-- <span
                        class="block font-medium text-lg text-gray-800 transform duration-500 ease-in-out hover:scale-105 hover:text-gray-700"
                        >View Details</span
                      >
                      <DiscountComponent
                        v-if="
                          productStore.discountOffer &&
                          product.category === 'big-bottle'
                        "
                        :price="img.price"
                      />
                      <span
                        v-else
                        class="block bg-white rounded-full text-orange-500 text-[11px] font-bold px-1 py-2 leading-none items-center"
                      >
                        {{ useCurrencyFormatter(img.price) }}
                      </span>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>
