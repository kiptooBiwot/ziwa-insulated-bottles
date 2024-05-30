<script setup>
import { useGeneralStore } from '@/stores/general'
import { useProductStore } from '~/stores/product'
// import { onClickOutside } from '@vueuse/core'
// import { useRoute } from '.nuxt/vue-router'

const generalStore = useGeneralStore()
const productStore = useProductStore()
// const router = useRoute()

const isMobileMenuOpen = ref(false)

const showMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const openPage = (id) => {
  // console.log('WE ARE HERE ALREADY!', myObject)
  // console.log('ID:', myObject.id)

  productStore.imageId = id
  isMobileMenuOpen.value = false
  // navigateTo(myObject.url)
  // router.push(`/${submenu.url}`)
  // console.log('THEN AT THE END!')
}

// const goToBulk = (url) => {
//   navigateTo(url)
//   isMobileMenuOpen.value = false
// }
</script>

<template>
  <div class="py-7 w-full bg-white">
    <div class="max-w-7xl lg:mx-auto mx-5 flex items-center justify-between">
      <div>
        <!-- {{ generalStore.leftLinks }} -->
        <ul class="gap-5 hidden lg:flex">
          <li v-for="(link, index) in generalStore.leftLinks" :key="index">
            <template v-if="link.type === 'link'">
              <!-- :to="link.url" -->
              <!-- @click="goToBulk(link.url)" -->
              <NuxtLink :to="link.url" class="cursor-pointer">
                {{ link.title }}
              </NuxtLink>
            </template>

            <template v-else-if="link.type === 'dropdown'">
              <div
                :key="index"
                class="relative"
                v-if="link.children.length > 0"
              >
                <NuxtLink
                  @click="link.isOpen = !link.isOpen"
                  class="flex items-center cursor-pointer transition duration-500 ease-in-out"
                >
                  {{ link.title }}
                  <span v-if="link.type === 'dropdown'"
                    ><Icon
                      v-if="!link.isOpen"
                      name="heroicons:chevron-down-20-solid"
                      class="w-5 h-5"
                    />
                    <Icon
                      v-else
                      name="heroicons:chevron-up-20-solid"
                      class="w-5 h-5"
                    />
                  </span>
                </NuxtLink>

                <div
                  v-if="link.isOpen"
                  @click="link.isOpen = !link.isOpen"
                  class="absolute -left-10 mt-8 w-[400px] origin-top-right bg-white border border-gray-200 border-t-0 last:border-0 divide-y divide-gray-100 rounded-b-md shadow-lg transition duration-500 ease-in-out z-20"
                >
                  <div class="p-3">
                    <div
                      v-for="(submenu, index) in link.children"
                      :key="index"
                      class="flex flex-col space-y-4 p-2 text-xs text-gray-400 hover:bg-blue-100 border-b border-gray-200 cursor-pointer"
                    >
                      <!-- :to="submenu.url" @click="openPage(submenu.id)" -->
                      <NuxtLink :to="`/shop/${submenu.category}`">
                        <div
                          class="flex items-center justify-between text-[#4b4c4e] text-[20px] font-bold"
                        >
                          <div class="flex items-center gap-5">
                            <img
                              :src="submenu.imageUrl"
                              alt=""
                              class="h-16 w-auto object-cover"
                            />
                            {{ submenu.title }}
                          </div>

                          <div>
                            <Icon
                              name="heroicons:chevron-right-20-solid"
                              class="w-5 h-5"
                            />
                          </div>
                        </div>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </li>
        </ul>

        <!-- Mobile Menu -->
        <div class="block lg:hidden">
          <Icon
            @click="showMobileMenu"
            name="heroicons:bars-3-20-solid"
            class="relative w-6 h-6"
          />

          <div ref="target" v-if="isMobileMenuOpen" class="md:hidden">
            <div
              class="absolute top-0 right-0 block w-full bg-[#39519f] bg-opacity-90 px-5 py-7 min-h-screen rounded-b z-20 space-y-8 transform duration-700 ease-in-out"
            >
              <div class="flex justify-between items-center">
                <div>
                  <!-- <img :src="logo" alt="" class="h-16 w-auto"> -->
                </div>
                <div>
                  <svg
                    @click.prevent="showMobileMenu"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <ul class="space-y-12 text-white">
                <!-- <li v-for="link in links" :key="link.title" @click.prevent="isMenuOpen = !isMenuOpen"
                class="text-lg text-center font-medium "> -->
                <li
                  v-for="(link, index) in generalStore.leftLinks"
                  :key="index"
                >
                  <template v-if="link.type === 'link'">
                    <!-- :to="link.url" -->
                    <NuxtLink
                      @click="showMobileMenu"
                      :to="link.url"
                      class="cursor-pointer"
                    >
                      {{ link.title }}
                    </NuxtLink>
                  </template>

                  <template v-else-if="link.type === 'dropdown'">
                    <div
                      :key="index"
                      class="relative"
                      v-if="link.children.length > 0"
                    >
                      <NuxtLink
                        @click="link.isOpen = !link.isOpen"
                        class="flex items-center cursor-pointer transition duration-500 ease-in-out"
                      >
                        {{ link.title }}
                        <span v-if="link.type === 'dropdown'"
                          ><Icon
                            v-if="!link.isOpen"
                            name="heroicons:chevron-down-20-solid"
                            class="w-5 h-5"
                          />
                          <Icon
                            v-else
                            name="heroicons:chevron-up-20-solid"
                            class="w-5 h-5"
                          />
                        </span>
                      </NuxtLink>

                      <div
                        v-if="link.isOpen"
                        @click="link.isOpen = !link.isOpen"
                        class="absolute -left-10 mt-8 w-[400px] origin-top-right bg-[#39519f] bg-opacity-90 border border-t-0 last:border-0 divide-y divide-gray-100 rounded-b-md shadow-lg transition duration-500 ease-in-out z-20"
                      >
                        <div class="p-3">
                          <div
                            v-for="(submenu, index) in link.children"
                            :key="index"
                            class="flex flex-col space-y-4 p-2 text-xs text-white border-b border-gray-200 cursor-pointer"
                          >
                            <!-- :to="submenu.url" -->
                            <!-- @click="openPage(submenu.id)" -->
                            <NuxtLink
                              @click="showMobileMenu"
                              :to="`/shop/${submenu.category}`"
                            >
                              <div
                                class="flex items-center justify-between text-white text-[20px] font-bold"
                              >
                                <div class="flex items-center gap-5">
                                  <img
                                    :src="submenu.imageUrl"
                                    alt=""
                                    class="h-16 w-auto object-cover"
                                  />
                                  {{ submenu.title }}
                                </div>

                                <div>
                                  <Icon
                                    name="heroicons:chevron-right-20-solid"
                                    class="w-5 h-5"
                                  />
                                </div>
                              </div>
                            </NuxtLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </li>

                <hr class="text-white" />

                <ul class="space-y-12 text-white">
                  <!-- <li v-for="link in links" :key="link.title" @click.prevent="isMenuOpen = !isMenuOpen"
                class="text-lg text-center font-medium "> -->
                  <li
                    v-for="link in generalStore.rightLinks"
                    :key="link.title"
                    @click.prevent="showMobileMenu"
                    class=""
                  >
                    <NuxtLink :to="link.url">
                      {{ link.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- LOGO -->
      <div>
        <ZiwaLogo />
      </div>

      <!-- Third Links -->
      <div>
        <!-- {{ generalStore.rightLinks }} -->
        <ul class="flex gap-5">
          <li
            v-for="(link, index) in generalStore.rightLinks"
            :key="index"
            class="hidden lg:flex"
          >
            <NuxtLink :to="link.url" class="">
              {{ link.title }}
            </NuxtLink>
          </li>

          <!-- material-symbols:shopping-cart-outline-rounded -->
          <NuxtLink to="/cart">
            <div class="flex gap-1 text-lg">
              {{ productStore.cart.length }}
              <Icon
                name="material-symbols:shopping-cart-outline-rounded"
                class="w-7 h-7 text-gray-600"
              />
            </div>
          </NuxtLink>
        </ul>
      </div>
    </div>
  </div>
</template>
