<script setup>
import logo from '/assets/images/logo/ziwa_logo1.png'
import { useGeneralStore } from '~/stores/general'

const generalStore = useGeneralStore()
// const { isOpen } = useSidebar();
const activeClass = ref(
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
)
const inactiveClass = ref(
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'
)
const showSubmenu = ref(false)
// TODO: Take isOpen to state level soon
// const isOpen = generalStore.isOpen
</script>

<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="generalStore.isOpen ? 'block' : 'hidden'"
      @click="generalStore.isOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
    ></div>
    <!-- End Backdrop -->

    <div
      :class="
        generalStore.isOpen
          ? 'translate-x-0 ease-out'
          : '-translate-x-full ease-in'
      "
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 md:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <img :src="logo" alt="Ziwa Logo" class="w-12" />

          <!-- <span class="mx-2 text-2xl font-semibold text-white">Ziwa</span> -->
        </div>
      </div>

      <nav class="mt-10">
        <p class="pl-4 text-xs font-semibold mb-4 text-gray-400">GENERAL</p>
        <NuxtLink
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]"
          to="/dashboard"
        >
          <Icon name="ic:round-dashboard" class="w-5 h-5" />
          <span class="mx-4">Dashboard</span>
        </NuxtLink>
        <p class="pl-4 my-4 text-xs font-semibold mb-4 text-gray-400">
          Manage Application
        </p>

        <NuxtLink
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'UIElements' ? activeClass : inactiveClass]"
          to="/dashboard/coupons"
        >
          <Icon name="ic:sharp-view-list" class="w-5 h-5" />
          <span class="mx-4">Coupons</span>
        </NuxtLink>

        <NuxtLink
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'UIElements' ? activeClass : inactiveClass]"
          to="/dashboard"
        >
          <Icon name="ic:sharp-view-list" class="w-5 h-5" />
          <span class="mx-4">Orders</span>
        </NuxtLink>

        <!-- <NuxtLink
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Tables' ? activeClass : inactiveClass]"
          to="#"
        >
          <Icon name="ic:twotone-create-new-folder" class="w-5 h-5" />

          <span class="mx-4">Manage Products</span>
        </NuxtLink> -->

        <NuxtLink
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Forms' ? activeClass : inactiveClass]"
          to="/dashboard"
        >
          <Icon name="ic:baseline-supervisor-account" class="w-6 h-6" />
          <span class="mx-4">Users</span>
        </NuxtLink>

        <div
          class="relative first-line:flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Forms' ? activeClass : inactiveClass]"
          to=""
        >
          <button
            type="button"
            class="flex items-center"
            @click="showSubmenu = !showSubmenu"
          >
            <Icon name="ic:twotone-create-new-folder" class="w-5 h-5" />
            <span
              class="flex-1 ml-3 text-left whitespace-nowrap"
              sidebar-toggle-item
              >Manage Products</span
            >
            <Icon name="ic:baseline-keyboard-arrow-down" class="w-6 h-6" />
          </button>
          <div
            id="dropdown-example"
            class="absolute right-0 ml-10 pl-8 pr-4 w-full text-xs rounded-md py-2 space-y-2 transform transition duration-500 ease-in-out"
            :class="[
              showSubmenu
                ? 'translate-y-0 ease-out block transition duration-300'
                : '-translate-y-full hidden ease-in transition duration-300',
            ]"
          >
            <!-- {{ showSubmenu }} -->
            <!-- to="/dashboard" -->
            <NuxtLink
              to="/dashboard/products/all-products"
              class="flex items-center w-full p-2 text-sm font-normal text-gray-300 transition duration-75 rounded-lg group hover:bg-gray-100 hover:text-gray-900 pl-11"
            >
              List All Products
            </NuxtLink>
            <!-- to="/dashboard" -->
            <NuxtLink
              to="/dashboard/products/new-product"
              class="flex items-center w-full p-2 text-sm font-normal text-gray-300 transition duration-75 rounded-lg group hover:bg-gray-100 hover:text-gray-900 pl-11"
            >
              Add New Product
            </NuxtLink>
            <!-- to="/dashboard" -->
            <NuxtLink
              to="/dashboard/products/add-category"
              class="flex items-center w-full p-2 text-sm font-normal text-gray-300 transition duration-75 rounded-lg group hover:bg-gray-100 hover:text-gray-900 pl-11"
            >
              Add New Category
            </NuxtLink>
            <!-- <NuxtLink to="">
              <a href="#"
                class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Invoice</a>
            </NuxtLink> -->
          </div>
        </div>

        <!-- <NuxtLink class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Cards' ? activeClass : inactiveClass]" to="/cards">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fill-rule="evenodd"
              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              clip-rule="evenodd" />
          </svg>

          <span class="mx-4">Cards</span>
        </NuxtLink> -->

        <!-- <NuxtLink class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Modal' ? activeClass : inactiveClass]" to="/modal">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>

          <span class="mx-4">Modal</span>
        </NuxtLink>
        <NuxtLink class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Chart' ? activeClass : inactiveClass]" to="/charts">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>

          <span class="mx-4">Charts</span>
        </NuxtLink>
        <NuxtLink class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Blank' ? activeClass : inactiveClass]" to="/blank">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>

          <span class="mx-4">Blank</span>
        </NuxtLink>
        <p class="pl-4 text-xs my-2 font-semibold mb-4 text-gray-400">About</p>
        <a target="_blank" class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Blank' ? activeClass : inactiveClass]" href="https://github.com/tal7aouy">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z">
            </path>
          </svg>

          <span class="mx-4">Github</span>
        </a> -->
      </nav>
    </div>
  </div>
</template>
