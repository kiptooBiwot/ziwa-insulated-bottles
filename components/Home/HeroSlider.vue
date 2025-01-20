<script setup>
const props = defineProps({
  christmasHero: {
    type: Array,
    required: true,
  },
})

// Reactive state to hold the current screen width
const screenWidth = ref(window.innerWidth)

// Update screen width on resize
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

// Add and remove event listener on component mount and unmount
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth)
})

// Computed property to get the correct image based on screen width
const getBackgroundImage = (item) => {
  return computed(() => {
    return screenWidth.value <= 768 ? item.mobileImage : item.image
  })
}

// Computed property to set height based on screen width
const getImageHeight = (item) => {
  return computed(() => {
    return screenWidth.value <= 768
      ? '800px'
      : item.height === 'full'
      ? '100vh'
      : '415px'
  })
}
</script>

<template>
  <div>
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :effect="'creative'"
      :autoplay="{
        delay: 3000,
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
        class="h-auto"
      >
        <div
          class="bg-cover bg-no-repeat lg:bg-cover bg-center w-full flex items-center justify-center"
          :style="`background-image: url(${
            getBackgroundImage(item).value
          }); height: ${getImageHeight(item).value}`"
        >
          <!-- :class="[item.height === 'full' ? 'h-screen' : 'h-[415px]']"
          :style="`background-image: url(${getBackgroundImage(item).value})`" -->
          <div
            class="absolute inset-0 md:bg-black md:bg-opacity-30"
            :style="`height: ${getImageHeight(item).value}`"
          ></div>
          <!-- :class="[item.height === 'full' ? 'h-screen' : 'h-[415px]']" -->
          <div
            class="text-center text-white max-w-3xl mx-5 lg:mx-auto space-y-5 z-0"
          >
            <div class="mb-4">
              <h1 class="text-5xl md:text-8xl text-white font-script mb-1">
                {{ item.title }}
              </h1>
              <p v-if="item.subHeading" class="text-base font-heading italic">
                {{ item.subHeading }}
              </p>
            </div>
            <div>
              <p class="text-lg md:text-2xl font-body leading-relaxed">
                {{ item.description }}
              </p>
            </div>

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
