<script setup>
import { useProductStore } from '~/stores/product'
import logo from '~/assets/images/logo/ziwa_logo1.png'
import { onClickOutside } from '@vueuse/core'


const productStore = useProductStore()

const links = reactive([
  { title: 'Home', url: '#Home' },
  { title: 'About', url: 'about-us' },
  { title: 'Shop', url: '#Shop' },
  { title: 'Contact', url: '#Contact' },
])

const atTopOfPage = ref(true)
const isMenuOpen = ref(false)
const target = ref(null)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  if (window.scrollY > 100) {
    // console.log('Scroll over 100')
    if (atTopOfPage.value) atTopOfPage.value = false
  } else {
    if (!atTopOfPage.value) atTopOfPage.value = true
    // console.log('Scroll back to top');
  }
}

onClickOutside(target, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <nav :class="{ 'scrolled': !atTopOfPage }" class="w-full fixed inset-x-0 top-0 z-10 pt-7 pb-5 bg-[#395A9F]">

    <div class="relative flex justify-between max-w-6xl items-center mx-auto px-5 xl:px-0">
      <div class="flex gap-20 items-center">
        <RouterLink to="/">
          <img :src="logo" alt="" class="h-16 w-auto">
        </RouterLink>
      </div>
      <div class="flex items-center gap-5">
        <div class="hidden md:block">
          <ul class="flex gap-4 text-white">
            <li v-for="(link, index) in links" :key="index">
              <RouterLink :to="`/${link.url}`">
                {{ link.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <NuxtLink to="/cart">
            <div class="relative px-3 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-7 h-7 text-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <div class="rounded-full w-5 h-5 bg-red-500 absolute right-0 top-0 flex items-center justify-center">
                <span class="text-white text-xs">
                  {{ productStore.cart.length }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="md:hidden">
          <svg v-if="!isMenuOpen" @click.prevent="isMenuOpen = !isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
          <svg v-else @click.prevent="isMenuOpen = !isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

        </div>
        <div ref="target" v-if="isMenuOpen" class="md:hidden">
          <div
            class="absolute -top-7 right-0 block w-full bg-[#39519f] bg-opacity-95 px-5 py-7 min-h-screen rounded-b space-y-8  transform duration-700 ease-in-out">
            <div class="flex justify-between items-center">
              <div>
                <img :src="logo" alt="" class="h-16 w-auto">
              </div>
              <div>
                <svg @click.prevent="isMenuOpen = !isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <ul class="space-y-12 text-white">
              <li v-for="link in links" :key="link.title" @click.prevent="isMenuOpen = !isMenuOpen"
                class="text-lg text-center font-medium ">
                <RouterLink :to="`/${link.url}`">
                  {{ link.title }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="relative flex justify-between max-w-6xl items-center mx-auto px-5 xl:px-0">
      <div class="flex gap-20 items-center">
        <RouterLink to="/">
          <img :src="logo" alt="" class="h-16 w-auto">
        </RouterLink>
      </div>
      <div class="flex gap-10 items-center">
        <div class="hidden md:block">
          <ul class="flex gap-8 text-white font-body">
            <li v-for="link in links" :key="link.title">
              <RouterLink :to="`/${link.url}`">
                {{ link.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <div class="relative px-3 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-8 h-8 text-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

            <div class="rounded-full w-5 h-5 bg-red-500 absolute right-0 top-0 flex items-center justify-center">
              <span class="text-white text-xs">
                {{ productStore.cart.length }}
              </span>
            </div>
          </div>
        </div>
        <div class="md:hidden">
          <svg v-if="!isMenuOpen" @click.prevent="isMenuOpen = !isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
          <svg v-else @click.prevent="isMenuOpen = !isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

        </div>
      </div>
      <div ref="target" v-if="isMenuOpen" class="md:hidden">
        <ul class="absolute right-0 block w-[250px] bg-white px-10 py-5 rounded-b space-y-8 mt-[40px]">
          <li v-for="link in links" :key="link.title" class="" @click.prevent="isMenuOpen = !isMenuOpen">
            <RouterLink :to="link.url">
              {{ link.title }}
            </RouterLink>
          </li>
        </ul>
      </div>


    </div> -->
  </nav>
</template>

<style scoped>
nav.scrolled {
  /* background: white; */
  @apply shadow-lg;
  @apply bg-[#395A9F];
  @apply py-2;
  @apply transform duration-500 ease-in-out;
  /* border-bottom: 0px; */
}
</style>
<style scoped></style>