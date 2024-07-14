<script setup>
import { useOrderStore } from '@/stores/orders'
import { format } from 'date-fns'

const orderStore = useOrderStore()

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const tabs = ['Completed Orders', 'Incomplete Orders', 'Payments', 'Others']

const selectedTab = ref(tabs[0])
const allOrders = ref([])

// Fetch all orders on mounted
onMounted(async () => {
  await orderStore.getAllOrders()
})
</script>

<template>
  <div class="min-h-screen">
    <h2 class="font-bold text-xl py-3">Dashboard</h2>

    <div class="flex flex-row gap-0 flex-wrap">
      <div class="mb-10 w-full max-w-full flex-shrink px-2 sm:w-1/2 lg:w-1/4">
        <div class="h-full rounded-xl bg-white shadow-2xl">
          <div
            x-data="{ tooltips: false }"
            class="relative px-6 pt-6 text-sm font-semibold"
          >
            Total Orders
            <div
              x-on:mouseover="tooltips = true"
              x-on:mouseleave="tooltips = false"
              class="text-green-500 ltr:float-right rtl:float-left"
            >
              +12%
              <div
                class="absolute bottom-full top-auto mb-3"
                x-show.transition.origin.top="tooltips"
                style="display: none"
              >
                <div
                  class="z-40 -mb-1 w-32 rounded-lg bg-black p-2 text-center text-sm leading-tight text-white shadow-lg"
                >
                  Since last month
                </div>
                <div
                  class="absolute bottom-0 -mb-2 w-1 -rotate-45 transform bg-black p-1 ltr:ml-6 rtl:mr-6"
                ></div>
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between px-6 py-4">
            <div
              class="relative h-14 w-14 self-center rounded-full bg-rose-500 text-center text-pink-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-cart3 absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </div>
            <h2 class="self-center text-3xl font-bold">421</h2>
          </div>
          <div class="px-6 pb-6">
            <a class="text-sm hover:text-indigo-500" href="#">View more...</a>
          </div>
        </div>
      </div>
      <div class="mb-10 w-full max-w-full flex-shrink px-2 sm:w-1/2 lg:w-1/4">
        <div class="h-full rounded-xl bg-white shadow-2xl">
          <div
            x-data="{ tooltips: false }"
            class="relative px-6 pt-6 text-sm font-semibold"
          >
            Total Sales
            <div
              x-on:mouseover="tooltips = true"
              x-on:mouseleave="tooltips = false"
              class="text-green-500 ltr:float-right rtl:float-left"
            >
              +15%
              <div
                class="absolute bottom-full top-auto mb-3"
                x-show.transition.origin.top="tooltips"
                style="display: none"
              >
                <div
                  class="z-40 -mb-1 w-32 rounded-lg bg-black p-2 text-center text-sm leading-tight text-white shadow-lg"
                >
                  Since last month
                </div>
                <div
                  class="absolute bottom-0 -mb-2 w-1 -rotate-45 transform bg-black p-1 ltr:ml-6 rtl:mr-6"
                ></div>
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between px-6 py-4">
            <div
              class="relative h-14 w-14 self-center rounded-full bg-yellow-500 text-center text-yellow-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-credit-card absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"
                ></path>
                <path
                  d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"
                ></path>
              </svg>
            </div>
            <h2 class="self-center text-3xl font-bold"><span>$</span>31K</h2>
          </div>
          <div class="px-6 pb-6">
            <a class="text-sm hover:text-indigo-500" href="#">View more...</a>
          </div>
        </div>
      </div>
      <div class="mb-10 w-full max-w-full flex-shrink px-2 sm:w-1/2 lg:w-1/4">
        <div class="h-full rounded-xl bg-white shadow-2xl">
          <div
            x-data="{ tooltips: false }"
            class="relative px-6 pt-6 text-sm font-semibold"
          >
            New Customers
            <div
              x-on:mouseover="tooltips = true"
              x-on:mouseleave="tooltips = false"
              class="text-pink-500 ltr:float-right rtl:float-left"
            >
              -5%
              <div
                class="absolute bottom-full top-auto mb-3"
                x-show.transition.origin.top="tooltips"
                style="display: none"
              >
                <div
                  class="z-40 -mb-1 w-32 rounded-lg bg-black p-2 text-center text-sm leading-tight text-white shadow-lg"
                >
                  Since last month
                </div>
                <div
                  class="absolute bottom-0 -mb-2 w-1 -rotate-45 transform bg-black p-1 ltr:ml-6 rtl:mr-6"
                ></div>
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between px-6 py-4">
            <div
              class="relative h-14 w-14 self-center rounded-full bg-green-500 text-center text-green-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-person absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                ></path>
              </svg>
            </div>
            <h2 class="self-center text-3xl font-bold">1.2K</h2>
          </div>
          <div class="px-6 pb-6">
            <a class="text-sm hover:text-indigo-500" href="#">View more...</a>
          </div>
        </div>
      </div>
      <div class="mb-10 w-full max-w-full flex-shrink px-2 sm:w-1/2 lg:w-1/4">
        <div class="h-full rounded-xl bg-white shadow-2xl">
          <div
            x-data="{ tooltips: false }"
            class="relative px-6 pt-6 text-sm font-semibold"
          >
            Users Online
            <span
              class="mt-1 h-2 w-2 animate-pulse rounded-full bg-green-500 ltr:float-right rtl:float-left"
            ></span>
          </div>
          <div class="flex flex-row justify-between px-6 py-4">
            <div
              class="relative h-14 w-14 self-center rounded-full bg-indigo-500 text-center text-indigo-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-people absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                ></path>
              </svg>
            </div>
            <h2 class="self-center text-3xl font-bold">602</h2>
          </div>
          <div class="px-6 pb-6">
            <a class="text-sm hover:text-indigo-500" href="#">View more...</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div
      v-if="!orderStore.allOrders"
      class="w-full h-full flex items-center justify-center"
    >
      <h3 class="gray-400 font-xl animate-pulse">Loading...</h3>
    </div>
    <div v-else class="w-full mx-auto p-4 bg-white rounded-md shadow-xl">
      <div class="flex flex-col sm:flex-row">
        <div class="flex p-2 space-x-4 bg-white rounded-lg shadow-md">
          <!-- :class="{
              'text-blue-500 border-b-2 border-blue-500': selectedTab === tab,
              'text-gray-500 border-b-2 border-transparent':
                selectedTab !== tab,
            }" -->
          <!-- class="py-2 px-4 focus:outline-none" -->
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="selectedTab = tab"
            :class="{ 'bg-blue-500 text-white': selectedTab === tab }"
            class="flex py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300"
          >
            {{ tab }}
          </button>
        </div>
      </div>
      <div class="py-4 px-4">
        <div v-if="selectedTab === 'Completed Orders'">
          <!-- Table below the dashboard -->

          <DashboardCompletedOrders :orders="orderStore.allOrders" />

          <section class="container px-0 mx-auto">
            <div class="flex flex-col">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                  class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
                >
                  <div
                    class="overflow-hidden border border-gray-200 md:rounded-lg"
                  >
                    <table
                      class="min-w-full table-fixed border-collapse border border-gray-300"
                    >
                      <thead
                        class="min-w-full table-fixed border-collapse border border-gray-300"
                      >
                        <tr>
                          <th class="w-1/6 border border-gray-300 p-2">
                            Order ID
                          </th>
                          <th class="w-1/6 border border-gray-300 p-2">Date</th>
                          <th class="w-1/6 border border-gray-300 p-2">
                            Payment Status
                          </th>
                          <th class="w-1/6 border border-gray-300 p-2">
                            Customer Details
                          </th>
                          <th class="w-1/6 border border-gray-300 p-2">
                            Ordered Product
                          </th>
                          <th class="w-1/6 border border-gray-300 p-2">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="border border-gray-300 p-2 break-words">
                            12345
                          </td>
                          <td class="border border-gray-300 p-2 break-words">
                            2024-07-13
                          </td>
                          <td class="border border-gray-300 p-2 break-words">
                            Paid
                          </td>
                          <td class="border border-gray-300 p-2 break-words">
                            John Doe, john@example.com
                          </td>
                          <td class="border border-gray-300 p-2 break-words">
                            Product Name with a very long description that
                            should wrap inside the cell.
                          </td>
                          <td class="border border-gray-300 p-2 break-words">
                            Edit | Delete
                          </td>
                        </tr>
                        <tr>
                          <td class="border border-gray-300 p-2 break-words">
                            12346
                          </td>
                          <td class="border border-gray-300 p-2 break-words">
                            2024-07-14
                          </td>
                          <td class="border border-gray-300 p-2 break-words">
                            Pending
                          </td>
                          <td class="border border-gray-300 p-2 break-words">
                            Jane Smith, jane@example.com
                          </td>
                          <td class="border border-gray-300 p-2 break-words">
                            Another Product with a long description to test
                            wrapping.
                          </td>
                          <td class="border border-gray-300 p-2 break-words">
                            Edit | Delete
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- OLD TABLE -->

                  <div
                    class="overflow-hidden border border-gray-200 md:rounded-lg"
                  >
                    <table
                      class="min-w-full table-fixed border-collapse border border-gray-300"
                    >
                      <!-- <thead>
                        <tr>
                          <th class="w-1/4 border border-gray-300 p-2">
                            Header 1
                          </th>
                          <th class="w-1/4 border border-gray-300 p-2">
                            Header 2
                          </th>
                          <th class="w-1/4 border border-gray-300 p-2">
                            Header 3
                          </th>
                          <th class="w-1/4 border border-gray-300 p-2">
                            Header 4
                          </th>
                        </tr>
                      </thead> -->
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <div class="flex items-center gap-x-3">
                              <!-- <input
                                type="checkbox"
                                class="text-blue-500 border-gray-300 rounded"
                              /> -->
                              <button class="flex items-center gap-x-2">
                                <span>Order ID</span>
                              </button>
                            </div>
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Date
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Payment Status
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Customer Details
                          </th>

                          <th
                            scope="col"
                            class="px-4 flex-1 w-16 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Ordered Product
                          </th>

                          <th scope="col" class="relative py-3.5 px-4">
                            <span class="">Actions</span>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="(order, index) in orderStore.allOrders"
                          :key="index"
                          class="hover:bg-blue-100 cursor-pointer"
                        >
                          <NuxtLink to="order._id">
                            <td
                              class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                            >
                              <div class="inline-flex items-center gap-x-3">
                                <!-- <input
                                type="checkbox"
                                class="text-blue-500 border-gray-300 rounded"
                              /> -->

                                <span>{{
                                  order?.payment?.MpesaReceiptNumber
                                }}</span>
                              </div>
                            </td>
                            <td
                              class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap"
                            >
                              <!-- Jan 6, 2022 -->
                              {{
                                format(
                                  new Date(order.createdAt),
                                  'EEE MMM dd, yyyy'
                                )
                              }}
                            </td>
                            <td
                              class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                            >
                              <div
                                v-if="order.isPaidFor"
                                class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>

                                <h2 class="text-sm font-normal">Paid</h2>
                              </div>
                            </td>
                            <td
                              class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap"
                            >
                              <div class="flex items-center gap-x-2">
                                <Icon
                                  name="material-symbols:account-circle-full"
                                  class="w-8 h-8"
                                />
                                <div>
                                  <h2 class="text-sm font-medium text-gray-800">
                                    <!-- Arthur Melo -->
                                    {{
                                      order?.orderedBy?.firstName +
                                      ' ' +
                                      order?.orderedBy?.lastName
                                    }}
                                  </h2>
                                  <p class="text-xs font-normal text-gray-600">
                                    <!-- authurmelo@example.com -->
                                    {{ order?.orderedBy?.email }}
                                  </p>
                                  <p class="text-xs font-normal text-gray-600">
                                    <!-- 0723123456 -->
                                    {{ order?.orderedBy?.phoneNumber }}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td
                              class="flex-1 w-16 px-4 py-4 text-sm text-gray-500 whitespace-nowrap"
                            >
                              <!-- Monthly subscription -->
                              {{ order.products[0]._value.title }}
                              <br />
                              {{ order.products[0]._value.currentBottleColor }}
                            </td>
                            <td class="px-4 py-4 text-sm whitespace-nowrap">
                              <div class="flex items-center gap-x-6">
                                <button
                                  class="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                                >
                                  View More
                                </button>
                              </div>
                            </td>
                          </NuxtLink>
                        </tr>
                      </tbody>
                    </table>

                    <!-- <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <div class="flex items-center gap-x-3">-->
                    <!-- <input
                                type="checkbox"
                                class="text-blue-500 border-gray-300 rounded"
                              /> -->
                    <!-- <button class="flex items-center gap-x-2">
                                <span>Order ID</span>
                              </button>
                            </div>
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Date
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Payment Status
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Customer Details
                          </th>

                          <th
                            scope="col"
                            class="px-4 flex-1 w-16 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Ordered Product
                          </th>-->

                    <!-- <th scope="col" class="relative py-3.5 px-4">
                            <span class="">Actions</span>
                          </th> -->
                    <!-- </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr
                          v-for="(order, index) in orderStore.allOrders"
                          :key="index"
                          class="hover:bg-blue-100 cursor-pointer"
                        >
                          <NuxtLink to="order._id">
                            <td
                              class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                            >
                              <div class="inline-flex items-center gap-x-3">-->
                    <!-- <input
                                type="checkbox"
                                class="text-blue-500 border-gray-300 rounded"
                              /> -->

                    <!--<span>{{
                                  order?.payment?.MpesaReceiptNumber
                                }}</span>
                              </div>
                            </td>
                            <td
                              class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap"
                            >-->
                    <!-- Jan 6, 2022 -->
                    <!-- {{
                                format(
                                  new Date(order.createdAt),
                                  'EEE MMM dd, yyyy'
                                )
                              }} -->
                    <!--</td>
                            <td
                              class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                            >
                              <div
                                v-if="order.isPaidFor"
                                class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>

                                <h2 class="text-sm font-normal">Paid</h2>
                              </div>
                            </td>
                            <td
                              class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap"
                            >
                              <div class="flex items-center gap-x-2">
                                <Icon
                                  name="material-symbols:account-circle-full"
                                  class="w-8 h-8"
                                />
                                <div>
                                  <h2 class="text-sm font-medium text-gray-800">-->
                    <!-- Arthur Melo -->
                    <!-- {{
                                      order?.orderedBy?.firstName +
                                      ' ' +
                                      order?.orderedBy?.lastName
                                    }}
                                  </h2>
                                  <p class="text-xs font-normal text-gray-600"> -->
                    <!-- authurmelo@example.com -->
                    <!-- {{ order?.orderedBy?.email }} -->
                    <!-- </p>
                                  <p class="text-xs font-normal text-gray-600"> -->
                    <!-- 0723123456 -->
                    <!-- {{ order?.orderedBy?.phoneNumber }}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td
                              class="flex-1 w-16 px-4 py-4 text-sm text-gray-500 whitespace-nowrap"
                            > -->
                    <!-- Monthly subscription -->
                    <!-- {{ order.products[0]._value.title }}
                              <br />
                              {{ order.products[0]._value.currentBottleColor }}
                            </td> -->
                    <!-- <td class="px-4 py-4 text-sm whitespace-nowrap">
                            <div class="flex items-center gap-x-6">

                              <button
                                class="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                              >
                                View More
                              </button>
                            </div>
                          </td> -->
                    <!--</NuxtLink>
                        </tr>
                      </tbody>
                    </table> -->
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between mt-6">
              <a
                href="#"
                class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 rtl:-scale-x-100"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>

                <span> previous </span>
              </a>

              <div class="items-center hidden md:flex gap-x-3">
                <a
                  href="#"
                  class="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                  >1</a
                >
                <a
                  href="#"
                  class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >2</a
                >
                <a
                  href="#"
                  class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >3</a
                >
                <a
                  href="#"
                  class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >...</a
                >
                <a
                  href="#"
                  class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >12</a
                >
                <a
                  href="#"
                  class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >13</a
                >
                <a
                  href="#"
                  class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >14</a
                >
              </div>

              <a
                href="#"
                class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <span> Next </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 rtl:-scale-x-100"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </section>
        </div>
        <div v-if="selectedTab === 'Incomplete Orders'">Content for Tab 2</div>
        <div v-if="selectedTab === 'Payments'">Content for Tab 3</div>
        <div v-if="selectedTab === 'Others'">Content for Tab 4</div>
      </div>
    </div>
  </div>
</template>
