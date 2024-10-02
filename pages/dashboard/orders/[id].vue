<script setup>
import { useOrderStore } from '@/stores/orders'
import { format, parseISO } from 'date-fns'
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'dashboard',
})

const route = useRoute()
const orderStore = useOrderStore()
const { singleOrder } = storeToRefs(orderStore)

onMounted(async () => {
  await orderStore.getOneOrder(route.params.id)
})

// UnWRap the product Details
const unwrappedProducts = computed(() => {
  return singleOrder.value.products.map(
    (product) => product._rawValue || product._value || product
  )
})

// const products = computed(() => {
//   return orderStore.singleOrder.products.map((product) => unref(product))
// })

const formattedDate = computed(() => {
  // console.log('SINGLE ORDER:', orderStore.singleOrder)
  if (orderStore.singleOrder) {
    // console.log('STORE SINGLE ORDER:', orderStore.singleOrder)
    const date = orderStore.singleOrder?.payment?.TransactionDate
    // console.log('DATE:', date)

    const parsedDate = parseISO(date)
    const formattedDate = format(
      new Date(parsedDate),
      'EEE, MMM dd, yyyy, hh:mmaa'
    )

    return formattedDate
  }
})

const products = computed(() => {
  const rawProducts = orderStore.singleOrder?.products.map((product) =>
    toRaw(product)
  )
  return rawProducts
})
</script>

<template>
  <div v-if="orderStore.singleOrder" class="">
    <section class="text-gray-600 body-font">
      <div class="container px-0 md:px-5 py-0 mx-auto">
        <div
          class="p-5 bg-white flex mx-auto border-b mb-10 border-gray-200 rounded-lg sm:flex-row flex-col"
        >
          <div
            class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0 mx-auto"
          >
            <Icon name="heroicons:user-16-solid" class="h-20 w-20" />
          </div>
          <div class="flex-grow sm:text-left mt-6 sm:mt-0">
            <h1
              class="text-blue-700 text-2xl title-font font-bold mb-2 text-center"
            >
              Customer Order
            </h1>

            <div class="font-bold text-gray-800 space-y-3 mt-5">
              <div class="w-full flex space-x-3">
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    First Name
                  </h2>
                  <p>{{ orderStore?.singleOrder?.orderedBy?.firstName }}</p>
                </div>
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">Last Name</h2>
                  <p>{{ orderStore?.singleOrder?.orderedBy?.lastName }}</p>
                </div>
              </div>
              <div class="w-full flex space-x-3">
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    Mobile Number
                  </h2>
                  <p>{{ orderStore?.singleOrder?.orderedBy?.phoneNumber }}</p>
                </div>
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">Email</h2>
                  <p>{{ orderStore?.singleOrder?.orderedBy?.email }}</p>
                </div>
              </div>
              <div class="w-full flex space-x-3">
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">Address</h2>
                  <p>{{ orderStore?.singleOrder?.orderedBy?.address }}</p>
                </div>
                <div
                  v-if="orderStore?.singleOrder?.orderedBy?.optionalMessage"
                  class="w-1/2"
                >
                  <h2 class="text-gray-400 font-semibold text-xs">
                    Optional Message
                  </h2>
                  <p>
                    {{ orderStore?.singleOrder?.orderedBy?.optionalMessage }}
                  </p>
                </div>
              </div>
              <hr class="border-gray-200" />
              <div class="w-full flex space-x-3">
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    Delivery Route
                  </h2>
                  <p>{{ orderStore?.singleOrder?.deliveryRoute }}</p>
                </div>
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    Delivery Area
                  </h2>
                  <p>{{ orderStore?.singleOrder?.deliveryLocation }}</p>
                </div>
              </div>
              <div class="w-full flex space-x-3">
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    Delivery Cost
                  </h2>
                  <p>
                    <span class="text-sm">KSH.</span>
                    {{ orderStore?.singleOrder?.deliveryCost }}
                  </p>
                </div>
                <div v-if="orderStore?.singleOrder?.isPaidFor" class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    Payment Status
                  </h2>
                  <div
                    v-if="orderStore?.singleOrder?.isPaidFor"
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

                    <h2 class="text-sm font-normal text-emerald-500">Paid</h2>
                  </div>
                </div>
              </div>
              <hr class="border-gray-200" />

              <div class="w-full flex space-x-3">
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    MPesa Receipt Number / Code
                  </h2>
                  <p>
                    {{ orderStore?.singleOrder?.payment?.MpesaReceiptNumber }}
                  </p>
                </div>
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">Amount</h2>
                  <p>
                    <span class="text-sm">KSH.</span>
                    {{ orderStore?.singleOrder?.payment?.Amount }}
                  </p>
                </div>
              </div>

              <div class="w-full flex space-x-3">
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    Transaction Phone Number
                  </h2>
                  <p>
                    {{ orderStore?.singleOrder?.payment?.PhoneNumber }}
                  </p>
                </div>
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    Transaction Date & Time
                  </h2>
                  <p>
                    {{ formattedDate }}
                  </p>
                </div>
              </div>

              <div class="w-full flex space-x-3">
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    MPesa Response Message
                  </h2>
                  <p>
                    {{ orderStore?.singleOrder?.payment?.ResultDesc }}
                  </p>
                </div>
                <!-- <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    Amount
                  </h2>
                  <p>{{ order?.payment?.Amount }}</p>
                </div> -->
              </div>
              <hr class="" />
              <div v-if="unwrappedProducts">
                <h2 class="font-bold text-blue-500 py-5">
                  Number of products ordered {{ unwrappedProducts.length }}
                </h2>
                <div
                  v-for="(product, index) in unwrappedProducts"
                  :key="index"
                  class="mb-6 md:bg-gray-50"
                >
                  <div
                    class="py-10 px-1 md:px-10 space-y-3 md:rounded-md md:shadow-md"
                  >
                    <h2
                      v-if="unwrappedProducts.length > 1"
                      class="font-bold text-orange-500 text-base"
                    >
                      Product Number: {{ index + 1 }}
                    </h2>

                    <div class="w-full flex space-x-3">
                      <div class="w-1/2">
                        <h2 class="text-gray-400 font-semibold text-xs">
                          Product Color
                        </h2>
                        <p>
                          {{ product.currentBottleColor }}
                        </p>
                      </div>
                      <!-- <div class="w-1/2">
                        <h2 class="text-gray-400 font-semibold text-xs">
                          Price
                        </h2>
                        <p>
                          {{ product.price }}
                        </p>
                      </div> -->
                    </div>
                    <div class="w-full flex space-x-3">
                      <div class="w-1/2">
                        <h2 class="text-gray-400 font-semibold text-xs">
                          Product Name
                        </h2>
                        <p>
                          {{ product.title }}
                        </p>
                      </div>
                      <div class="w-1/2">
                        <h2 class="text-gray-400 font-semibold text-xs">
                          Price
                        </h2>
                        <p>
                          {{ product.price }}
                        </p>
                      </div>
                    </div>
                    <div class="w-full flex space-x-3">
                      <div class="w-1/2">
                        <h2 class="text-gray-400 font-semibold text-xs">
                          Product Capacity
                        </h2>
                        <p>{{ product.capacity }} milliliters</p>
                      </div>
                      <div class="w-1/2">
                        <h2 class="text-gray-400 font-semibold text-xs">
                          Order Status (Order or Pre-Order)
                        </h2>
                        <p>
                          {{ product.inStock ? 'Order' : 'Pre-Order' }}
                        </p>
                      </div>
                    </div>
                    <hr class="border-gray-200" />
                    <h2 class="font-bold text-base text-blue-500">
                      Product Customization Details
                    </h2>
                    <div class="w-full flex space-x-3">
                      <div class="w-1/2">
                        <h2 class="text-gray-400 font-semibold text-xs">
                          Selected Font
                        </h2>
                        <p>
                          {{ product.selectedFont || 'Not Indicated' }}
                        </p>
                      </div>
                      <div class="w-1/2">
                        <h2 class="text-gray-400 font-semibold text-xs">
                          Custom Name:
                        </h2>
                        <p>
                          {{ product.customName || 'Not Indicated' }}
                        </p>
                      </div>
                    </div>
                    <div class="w-full flex space-x-3">
                      <div class="w-1/2">
                        <h2 class="text-gray-400 font-semibold text-xs">
                          Name Printing Position
                        </h2>
                        <p>
                          {{ product.textPosition || 'Not Indicated' }}
                        </p>
                      </div>
                      <div class="w-1/2">
                        <h2 class="text-gray-400 font-semibold text-xs">
                          Customizaiton Fee:
                        </h2>
                        <p>
                          {{ product.customizationFee }}
                        </p>
                      </div>
                    </div>
                    <div class="w-full flex space-x-3">
                      <div class="w-1/2">
                        <h2 class="text-gray-400 font-semibold text-xs">
                          Total Cost (Product Plus Customization)
                        </h2>
                        <p>
                          {{ product.cumulativeCost }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- {{ order }} -->
            </div>
          </div>
        </div>
      </div>

      <!-- NEXT CARD -->
    </section>

    <!-- <div class="max-w-xl mx-auto bg-white rounded-md shadow-lg">
      <div class="bg-green-200 w-full rounded-t-md p-5">
        <h4>Customer Details</h4>
      </div>
      <div class="p-5">
        {{ order }}
      </div>
    </div> -->
  </div>

  <div v-else class="w-full min-h-screen flex items-center justify-center">
    <h3 class="text-3xl font-semibold text-gray-400 animate-pulse">
      Loading....
    </h3>
  </div>
</template>
