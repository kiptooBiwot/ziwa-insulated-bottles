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
  { text: 'Love It!', giftImage: bg_5, color: '', bgImage: 'https://images.unsplash.com/photo-1606310737718-01c223c7425b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { text: 'Gift It!', giftImage: bg_2, color: '', bgImage: 'https://images.unsplash.com/photo-1576072320516-24b83088e525?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { text: 'Carry It!', giftImage: bg_6, color: '', bgImage: 'https://images.unsplash.com/photo-1575110201245-23bee4c5aa62?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { text: 'Sip It!', giftImage: bg_4, color: '', bgImage: 'https://images.unsplash.com/photo-1545735089-fe9e1e4f4569?q=80&w=1533&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
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
  <div class="">
    <section id="Home" class="">
      <SwiperHero />
    </section>

    <!-- About US -->
    <section>
      <AboutUs />
    </section>

    <!-- BEST Sellers -->
    <section>
      <div class="w-full bg-[#39519f] bg-opacity-90 py-10">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-white font-medium text-2xl tracking-tight mb-4">Best Sellers</h3>
          <div class="w-full flex justify-between">
            <div v-for="(bestSeller, index) in bestSellers" :key="index"
              class="bg-white group bg-opacity-80 relative rounded-md h-56 w-48 shadow-md flex justify-center items-center hover:bg-opacity-100 transition duration-500 ease-in-out">
              <img :src="bestSeller.image" alt="best sellers"
                class="object-cover absolute h-[80%] transition duration-500 ease-in-out">
              <h5 class="text-sm z-20 absolute bottom-1 font-semibold group-hover:text-gray-900">{{ bestSeller.title }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop section -->
    <section id="Shop" class="py-20 min-h-screen md:bg-[#39519f] md:bg-opacity-5">
      <div class="max-w-6xl mx-auto px-5">
        <h3 class="text-[#39519f] font-semibold">Shop</h3>
        <h2 class="text-gray-900 font-medium text-3xl tracking-tight mb-4">
          Our Bottle Varieties
        </h2>

        <div class="relative">
          <div v-if="isLoading" class="absolute inset-0 h-full w-full flex items-center justify-center">
            <Spinner />
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <template v-for="(product, index) in productStore.dbProducts" :key="index">
              <div v-for="img in product.images" :key="img._id"
                class="flex-shrink-0 m-6 md:m-2 relative overflow-hidden bg-blue-200 rounded-lg w-auto md:max-w-xs shadow-lg">
                <!-- [#89CFF0] -->
                <NuxtLink :to="{
                  name: 'item-slug',
                  params: { slug: product.slug },
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
                    <img v-if="product.category === 'big-bottle'" class="relative w-auto h-[250px]" :src="img.url"
                      alt="" />
                    <img v-else class="relative w-full h-[460px] object-none" :src="img.url" alt="">
                  </div>
                  <div class="relative text-white px-6 pb-6 mt-6">
                    <span v-if="product.category === 'big-bottle'" class="block opacity-75 -mb-1 text-gray-600 text-xs">{{
                      img.color }} Water Bottle
                    </span>
                    <span v-else class="block opacity-75 -mb-1 text-gray-600 text-xs">Little Ziwa in {{ img.color
                    }}</span>
                    <div class="flex items-end justify-between">
                      <!-- <NuxtLink :to="`/item/${product.slug}`" :image="img._id"> -->

                      <span
                        class="block font-medium text-lg text-gray-800 transform duration-500 ease-in-out hover:scale-105 hover:text-gray-700">View
                        Details</span>
                      <DiscountComponent v-if="productStore.discountOffer && product.category === 'big-bottle'"
                        :price="img.price" />
                      <span v-else
                        class="block bg-white rounded-full text-orange-500 text-[11px] font-bold px-1 py-2 leading-none items-center">
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
    </section>

    <section id="" class="py-20 bg-white relative">
      <div class="max-w-6xl mx-auto px-5 xl:px-0">
        <h3 class="text-[#39519f] font-semibold">Stylish</h3>
        <h3 class="text-3xl font-medium text-gray-800 pb-5">
          Take us with you
        </h3>
        <p class="mb-5">We fully understand that great things can happen literally anywhere. That is why we have crafted
          these vessels
          to ensure that they fit in to your daily life with ease so that wherever life takes you, You get to take us with
          you!</p>
        <div class="columns-1 md:columns-3 xl:columns-4 gap-8 space-y-8">
          <template v-for="(imgs, index) in images" :key="index">
            <img :src="imgs" alt="" class="rounded-xl shadow-xl cursor-pointer object-contain"
              @click="loadCarousel = !loadCarousel" />
          </template>
        </div>
      </div>

      <div v-if="loadCarousel"
        class=" inset-0 overflow-y-auto overflow-x-hidden fixed z-50 flex w-full h-screen items-center justify-center"
        @dblclick="loadCarousel = !loadCarousel">
        <!-- <template v-for="(image, index) in images" :key="index"> -->
        <!-- <ImageModal @closeModal="closeModal" :images="images" /> -->
        <ImageSlider @closeModal="closeModal" :images="images" />
        <!-- </template> -->
      </div>
    </section>
  </div>
</template>
