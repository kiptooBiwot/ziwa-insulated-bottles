<script setup>
import { format } from 'date-fns'
definePageMeta({
  layout: 'dashboard',
})

const props = defineProps({
  carts: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="py-3">
    <div
      v-if="!carts"
      class="w-full flex items-center justify-center mx-5 lg:mx-auto min-h-[100px]"
    >
      <h3 class="text-3xl text-gray-400 animate-pulse">Loading...</h3>
    </div>
    <div v-else>
      <!-- component -->
      <section class="container px-4 mx-auto">
        <div class="flex flex-col">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle">
              <p class="text-sm mb-5 font-semibold text-rose-500">
                In case a payment is received and an order cannot be traced, the
                customer's cart contents before payment and details can be found
                here.
              </p>
              <div class="overflow-hidden border border-gray-200 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 w-1/6"
                      >
                        <div class="flex items-center gap-x-3">
                          <button class="flex items-center gap-x-2">
                            <span>Order ID</span>
                          </button>
                        </div>
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 w-1/6"
                      >
                        Date
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 w-1/6"
                      >
                        Payment Status
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 w-1/6"
                      >
                        Customer Details
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 w-1/6"
                      >
                        Ordered Product
                      </th>

                      <th scope="col" class="relative py-3.5 px-4 w-1/6">
                        <span
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 w-1/6"
                          >Actions</span
                        >
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="(cart, index) in carts"
                      :key="index"
                      class="hover:bg-gray-50 cursor-pointer"
                    >
                      <td
                        class="px-4 py-4 text-sm font-medium text-gray-700 w-1/6"
                      >
                        <div class="inline-flex items-center gap-x-3">
                          <!-- <input
                                type="checkbox"
                                class="text-blue-500 border-gray-300 rounded"
                              /> -->

                          <span class="text-xs">{{ cart._id }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-4 text-sm text-gray-500 w-1/6">
                        <!-- Jan 6, 2022 -->
                        {{
                          format(new Date(cart.createdAt), 'EEE, MMM dd, yyyy')
                        }}
                      </td>
                      <td
                        class="px-4 py-4 text-sm font-medium text-gray-700 w-1/6"
                      >
                        <div
                          v-if="cart.isPaidFor"
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
                        <div
                          v-else
                          class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-rose-500 bg-rose-100/60"
                        >
                          <Icon
                            name="heroicons:exclamation-circle"
                            class="w-8 h-8"
                          />
                          <h2 class="text-xs text-rose-500 font-normal">
                            Not Paid
                          </h2>
                        </div>
                      </td>
                      <td class="px-4 py-4 text-sm text-gray-500 w-1/6">
                        <div class="flex items-center gap-x-2">
                          <Icon
                            name="material-symbols:account-circle-full"
                            class="w-8 h-8"
                          />
                          <div>
                            <h2 class="text-sm font-medium text-gray-800">
                              <!-- Arthur Melo -->
                              {{
                                cart?.orderedBy?.firstName +
                                ' ' +
                                cart?.orderedBy?.lastName
                              }}
                            </h2>
                            <p class="text-xs font-normal text-gray-600">
                              <!-- authurmelo@example.com -->
                              {{ cart.email }}
                            </p>
                            <p class="text-xs font-normal text-gray-600">
                              <!-- 0723123456 -->
                              {{ cart?.orderedBy?.phoneNumber }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="flex-1 px-4 py-4 text-sm text-gray-500 w-1/6">
                        <!-- Monthly subscription -->
                        {{ cart.products[0]._value.title }}
                        <br />
                        {{ cart.products[0]._value.currentBottleColor }}
                      </td>
                      <td class="px-4 py-4 text-sm w-1/6">
                        <div class="flex items-center gap-x-6">
                          <!-- @click.prevent="showOrderDetails(order._id)" -->
                          <NuxtLink
                            :to="`/dashboard/orders/cart/${cart._id}`"
                            class="text-blue-500 transition-colors duration-200 py-1 px-2 rounded-md hover:text-white hover:bg-green-300 hover:border"
                          >
                            View Details
                          </NuxtLink>
                        </div>
                      </td>
                      <!-- </NuxtLink> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
