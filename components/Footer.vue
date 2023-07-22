<script setup>
import logo from '@/assets/images/logo/ziwa_logo1.png'

const links = reactive([
  { title: 'Home', url: '#Home' },
  { title: 'About', url: 'about-us' },
  { title: 'Shop', url: '#Shop' },
  { title: 'Contact', url: '#Contact' },
])
</script>

<template>
  <footer class="w-full text-white bg-gray-900 body-font">
    <div
      class="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
      <div class="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
        <img :src="logo" alt="" class="w-12 h-auto pb-5 mx-auto">
        <p class="mt-2 text-sm text-center">Insulated Water Bottle</p>

      </div>
      <div class="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
        <div class="w-full px-4 lg:w-1/3 md:w-1/2">
          <h2 class="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">Menu</h2>
          <nav class="mb-10 list-none">
            <ul class="flex flex-col space-y-3 text-white">
              <li v-for="(link, index) in links" :key="index"
                class="text-gray-500 hover:text-gray-200 transform duration-500 ease-in-out">
                <RouterLink :to="`/${link.url}`">
                  {{ link.title }}
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
        <div class="w-full px-4 lg:w-1/3 md:w-1/2">
          <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-100 uppercase title-font">Contact</h2>
          <nav class="mb-10 list-none">
            <!-- <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-900">Send a Message</a>
            </li>
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-900">Request a Quote</a>
            </li> -->
            <li
              class="mt-3 flex gap-2 text-gray-500 cursor-pointer hover:text-gray-100 transform duration-500 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>


              <a class="">+254 703 968
                795</a>
            </li>
            <li
              class="mt-3 flex gap-2 text-gray-500 cursor-pointer hover:text-gray-100 transform duration-500 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>



              <a class="">info@ziwa.co.ke</a>
            </li>
          </nav>
        </div>
        <!-- <div class="w-full px-4 lg:w-1/3 md:w-1/2">
          <h2 class="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Support</h2>
          <nav class="mb-10 list-none">
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-900">Contact Support</a>
            </li>
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-900">Help Resources</a>
            </li>
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-900">Release Updates</a>
            </li>
          </nav>
        </div> -->
        <div class="w-full px-4 lg:w-1/3 md:w-1/2">
          <h2 class="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">Social Media
          </h2>
          <div class="mt-4 mx-auto">
            <span class="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
              <!-- Facebook -->
              <a href="https://www.facebook.com/people/ziwa_ke/100090413036642/" target="_blank"
                class="text-white cursor-pointer hover:text-[#39519f] transform duration-500 ease-in-out">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6"
                  viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <!-- Twitter -->
              <a href="/" class="ml-3 text-white cursor-pointer hover:text-[#39519f] transform duration-500 ease-in-out">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6"
                  viewBox="0 0 24 24">
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                  </path>
                </svg>
              </a>
              <!-- Instagram -->
              <a href="https://www.instagram.com/ziwa_ke/" target="_blank"
                class="ml-3 text-white cursor-pointer hover:text-[#39519f] transform duration-500 ease-in-out">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  class="w-6 h-6" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a href="/" class="ml-3 text-white cursor-pointer hover:text-[#39519f] transform duration-500 ease-in-out">
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="0" class="w-6 h-6" viewBox="0 0 24 24">
                  <path stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z">
                  </path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
          <!-- <nav class="mb-10 list-none">
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-900">Terms &amp; Privacy</a>
            </li>
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-900">Pricing</a>
            </li>
            <li class="mt-3">
              <a class="text-gray-500 cursor-pointer hover:text-gray-900">FAQ</a>
            </li>
          </nav> -->
        </div>

      </div>
    </div>
    <div class="bg-gray-950">
      <div class="container px-5 py-4 mx-auto">
        <p class="text-sm text-white capitalize xl:text-center">© {{ new Date().getFullYear() }} All rights reserved </p>
      </div>
    </div>
  </footer>
</template>


<style scoped></style>