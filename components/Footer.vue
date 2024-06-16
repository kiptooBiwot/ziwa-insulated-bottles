<script setup>
import { useGeneralStore } from '@/stores/general'
import products from '~/assets/images/products/products1.png'

const generalStore = useGeneralStore()

const otherLinks = ref([
  { title: 'Wholesale Inquiries', url: 'contact' },
  { title: 'Warranty', url: 'warranty' },
])
</script>

<template>
  <div class="w-full text-white bg-gray-900 body-font">
    <div class="container px-5 pt-20 pb-10 mx-auto grid grid-cols-12">
      <!-- <div class="grid-cols-12"> -->
      <div class="col-span-12 lg:col-span-6 px-5 lg:pr-64 space-y-5">
        <h3 class="text-2xl text-blue-400 font-bold">
          Subscribe to our Newsletter
        </h3>
        <p class="font-normal text-white">
          Subscribe for the latest news and VIP discounts
        </p>

        <div>
          <div class="relative h-11 w-full min-w-[200px]">
            <input
              type="email"
              class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            />
            <label
              class="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-200 peer-focus:after:scale-x-100 peer-focus:after:border-gray-200 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
              Email address
            </label>
            <button
              class="!absolute right-0 top-1 select-none rounded bg-blue-gray-500 py-2 pl-4 pr-0 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
          <!-- <h2 class="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">Social Media
          </h2> -->
          <div class="mt-10 mx-auto">
            <span
              class="inline-flex gap-1 justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start"
            >
              <!-- Facebook -->
              <a
                href="https://www.facebook.com/people/ziwa_ke/100090413036642/"
                target="_blank"
                class="text-white cursor-pointer hover:text-[#39519f] transform duration-500 ease-in-out"
              >
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  ></path>
                </svg>
              </a>
              <!-- Twitter -->
              <a
                href="https://www.tiktok.com/@ziwa_ke"
                target="_blank"
                class="ml-3 text-white cursor-pointer hover:text-[#39519f] transform duration-500 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-7 h-7 fill-white text-white cursor-pointer hover:fill-[#39519f] transform duration-500 ease-in-out"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill=""
                    d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"
                  />
                </svg>
              </a>
              <!-- Instagram -->
              <a
                href="https://www.instagram.com/ziwa_ke/"
                target="_blank"
                class="ml-3 text-white cursor-pointer hover:text-[#39519f] transform duration-500 ease-in-out"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/ziwa-kenya/about/"
                target="_blank"
                class="ml-3 text-white cursor-pointer hover:text-[#39519f] transform duration-500 ease-in-out"
              >
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0"
                  class="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
        <div class="pt-3">
          <NuxtLink to="/" class="mr-auto md:w-48 flex-shrink-0 pt-3">
            <!-- <img class="h-16 w-auto" :src="logo" alt=""> -->
            <h2
              class="text-5xl font-logoFont text-white hover:text-[#395a9f] duration-300 ease-in-out"
            >
              Ziwa<span class="text-xs relative -top-6 font-light">&reg;</span>
            </h2>
          </NuxtLink>
        </div>
      </div>
      <div class="col-span-12 py-10 md:py-0 lg:col-span-3">
        <!-- <h2 class="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">Menu</h2> -->
        <nav class="mb-10 list-none">
          <ul
            class="flex flex-col space-y-4 text-white text-center lg:text-left"
          >
            <li
              v-for="(link, index) in generalStore.newLinks"
              :key="index"
              class="text-white font-medium hover:text-gray-400 hover:underline text-xl transform duration-500 ease-in-out"
            >
              <NuxtLink :to="`${link.url}`">
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-span-12 lg:col-span-3 text-center lg:text-left">
        <div>
          <img
            :src="products"
            alt="products"
            class="mx-auto w-[80%] h-auto object-contain"
          />
        </div>
        <h2
          class="mb-3 font-medium tracking-wide text-blue-400 uppercase text-lg title-font mt-10"
        >
          Other Links
        </h2>
        <nav class="mb-10 list-none">
          <ul class="flex flex-col space-y-4 text-white">
            <li
              v-for="(link, index) in otherLinks"
              :key="index"
              class="text-white hover:text-gray-400 hover:underline text-sm transform duration-500 ease-in-out"
            >
              <NuxtLink :to="`/${link.url}`">
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <!-- </div> -->
    </div>
    <div class="bg-gray-950">
      <div class="container px-5 py-4 mx-auto">
        <p class="text-sm text-white capitalize xl:text-center">
          © {{ new Date().getFullYear() }} All rights reserved
        </p>
      </div>
    </div>
  </div>
</template>
