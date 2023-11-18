<script setup>
// import logo from '~/assets/images/logo/ziwa-logo.png'
import logo from "~/assets/images/logo/ziwa-logo.png"
import { useProductStore } from '~/stores/product'
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
  <nav :class="{ 'scrolled': !atTopOfPage }" class="w-full fixed inset-x-0 top-0 z-10 py-0 md:pt-2 bg-white border-none">
    <div class="max-w-6xl mx-auto flex items-center px-5 md:px-0">

      <!-- logo -->
      <NuxtLink to="/" class="mr-auto md:w-48 flex-shrink-0">
        <img class="h-16 w-auto" :src="logo" alt="">
      </NuxtLink>

      <div class="flex items-center">
        <div class="hidden md:block">
          <ul class="flex gap-4 font-semibold">
            <li v-for="(link, index) in links" :key="index" class="">
              <NuxtLink :to="`/${link.url}`" class="pb-2 px-3 hover:text-[#395A9F] hover:border-b-2 border-[#395A9F]">
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <!-- <NuxtLink to="/cart">
            <div class="relative px-3 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-7 h-7 ">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <div class="rounded-full w-5 h-5 bg-red-500 absolute right-0 top-0 flex items-center justify-center">
                <span class="text-white text-xs"> -->
          <!-- {{ productStore.cart.length }} -->
          <!-- </span>
              </div>
            </div>
          </NuxtLink> -->
        </div>

        <div ref="target" v-if="isMenuOpen" class="md:hidden">
          <div
            class="absolute -top-7 right-0 block w-full bg-[#39519f] bg-opacity-90 px-5 py-7 min-h-screen rounded-b space-y-8 transform duration-700 ease-in-out">
            <div class="flex justify-between items-center">
              <div>
                <img :src="logo" alt="" class="h-16 w-auto">
              </div>
              <div>
                <svg @click.prevent="isMenuOpen = !isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
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

      <!-- phone number -->
      <div class="ml-auto md:w-auto hidden sm:flex flex-col place-items-end">
        <span class="font-bold md:text-xl">+254 703 968 795</span>
        <span class="font-semibold text-sm text-[#395A9F]">Support 24/7</span>
      </div>

      <!-- buttons -->
      <nav class="contents">
        <ul class="ml-4 xl:w-auto flex items-center justify-end">
          <li class="ml-2 lg:ml-4 relative inline-block">
            <NuxtLink to="/signin" class="">
              <svg class="h-9 lg:h-10 p-2 text-gray-500" aria-hidden="true" focusable="false" data-prefix="far"
                data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <!-- class="svg-inline--fa fa-user fa-w-14 fa-9x" -->
                <path fill="currentColor"
                  d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z">
                </path>
              </svg>
            </NuxtLink>
          </li>
          <li class="ml-2 lg:ml-4 relative inline-block">
            <NuxtLink to="/cart" class="">
              <div class="absolute -top-1 right-0 z-10 bg-yellow-500 text-xs text-white font-bold px-1 py-0.5 rounded-sm">
                {{ productStore.cart.length }}
              </div>
              <svg class="h-9 lg:h-10 p-2 text-gray-500" aria-hidden="true" focusable="false" data-prefix="far"
                data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <!-- class="svg-inline--fa fa-shopping-cart fa-w-18 fa-9x" -->
                <path fill="currentColor"
                  d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z">
                </path>
              </svg>
            </NuxtLink>
          </li>
        </ul>
        <div class="md:hidden pl-2">
          <svg v-if="!isMenuOpen" @click.prevent="isMenuOpen = !isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
          <svg v-else @click.prevent="isMenuOpen = !isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </nav>

      <!-- cart count -->
      <!-- <div class="ml-4 hidden sm:flex flex-col font-bold">
        <span class="text-xs text-gray-400">Your Cart</span>
        <span>$2,650,59</span>
      </div> -->
    </div>

    <hr class="mt-2">
  </nav>
</template>
