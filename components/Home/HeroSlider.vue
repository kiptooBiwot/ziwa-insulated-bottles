<script setup>
const props = defineProps({
  christmasHero: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div>
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :effect="'creative'"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <!-- <SwiperSlide v-for="slide in 10" :key="slide">
        <strong>{{ slide }}</strong>
      </SwiperSlide> -->

      <SwiperSlide
        v-for="(item, index) in christmasHero"
        :key="index"
        class="min-h-screen"
      >
        <div
          class="bg-contain bg-center w-full flex items-center justify-center"
          :class="[item.height === 'full' ? 'h-screen' : 'h-[500px]']"
          :style="`background-image: url(${item.image})`"
        >
          <div
            class="absolute inset-0 bg-black bg-opacity-40"
            :class="[item.height === 'full' ? 'h-screen' : 'h-[500px]']"
          ></div>
          <div
            class="text-center text-white max-w-3xl mx-5 lg:mx-auto space-y-5 z-0"
          >
            <div class="mb-4">
              <h1 class="text-5xl md:text-8xl text-white font-normal mb-1">
                {{ item.title }}
              </h1>
              <p v-if="item.subHeading" class="text-base font-heading italic">
                {{ item.subHeading }}
              </p>
            </div>
            <p class="text-lg md:text-2xl font-body leading-relaxed">
              {{ item.description }}
            </p>

            <div class="py-5" :class="[item.showButton ? 'block' : 'hidden']">
              <NuxtLink
                :to="item.toUrl"
                class="py-6 px-9 bg-[#8B2927] text-white rounded-full shadow-sm cursor-pointer uppercase hover:shadow-lg hover:bg-[#8B292F] font-bold"
              >
                Pre-Order Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
