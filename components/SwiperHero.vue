<script setup>
import heroImg from '@/assets/images/hero_img-no-bg.png'
import heroImg1 from '@/assets/images/hero/MOK_4815-removebg.png'
import heroImg2 from '@/assets/images/hero/MOK_4820-removebg.png'
import heroImg3 from '@/assets/images/hero/MOK_4829-removebg.png'
import heroImg4 from '@/assets/images/hero/MOK_4835-removebg.png'
import heroImg5 from '@/assets/images/hero/MOK_4886-removebg.png'
import heroImg6 from '@/assets/images/hero/MOK_4910-removebg.png'

const heroItems = ref([
  { title: 'Hydration Meets Insulation', subtitle: 'Ziwa insulated water bottle', img: heroImg },
  { title: 'Elevate your Travel Game', subtitle: 'Comfortable grip bottle', img: heroImg1 },
  { title: 'Are you Active in Sports?', subtitle: 'Hydrate at your convenience', img: heroImg2 },
  { title: 'Hanging Out With Friends?', subtitle: 'Carry the Ziwa insulated bottle with you', img: heroImg3 },
  // { title: '', img: heroImg4 },
  // { title: '2. Second thing goes here.' },
  // { title: '3. Third thing goes here.' },
  // { title: '4. Fourth thing goes here.' },
  // { title: '5. Fifth thing goes here.' },
])
</script>

<template>
  <div class="w-full bg-white relative min-h-screen inset-0 overflow-x-hidden">
    <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination, SwiperNavigation]" :slides-per-view="1"
      :loop="true" :effect="'creative'" :pagination="true" :navigation="false" :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }" :creative-effect="{
  prev: {
    shadow: false,
    translate: ['-100%', 0, -1],
  },
  next: {
    translate: ['100%', 0, 0],
  },
}">
      <SwiperSlide v-for="(item, index) in heroItems" :key="index">
        <div class=" grid grid-cols-1 md:grid-cols-2 md:h-screen">
          <div
            class="space-y-5 flex-1 w-[90%] md:mx-16 mx-auto h-full flex items-center justify-center mt-[80px] pb-10 md:pb-0  md:mt-0 ">
            <div class="block space-y-4 md:space-y-8 mb-10 md:mb-0">
              <h1 class="text-5xl md:text-6xl xl:text-7xl lg:leading-loose font-display font-extrabold text-gray-700">
                {{ item.title }}
                <!-- Stay <br> Refreshed, <br><span class="text-[#395A9F]">Stay Hydrated.</span> -->
              </h1>
              <h3 class="text-base lg:text-2xl font-semibold text-[#395A9F] font-display">
                {{ item.subtitle }}
                <!-- Discover the Ultimate Insulated Water Bottles -->
              </h3>

              <div>
                <NuxtLink to="#Shop">
                  <button
                    class="border-gray-300 border py-3 px-6 rounded-sm text-gray-700 hover:bg-[#395a9f] hover:border-[#395a9f] hover:text-white hover:shadow-lg transform duration-500 ease-in-out">Shop
                    Now</button>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="flex-1 h-full flex items-center justify-center bg-[#395A9F] bg-opacity-10 py-0 md:pb-0">
            <img :src="item.img" alt="" class="w-auto px-5 py-0 md:px-0 md:py-0 md:w-auto h-full mx-auto object-cover">
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
