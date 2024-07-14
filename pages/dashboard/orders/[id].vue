<script setup>
import { useOrderStore } from '@/stores/orders'

definePageMeta({
  layout: 'dashboard',
})

const route = useRoute()
const orderStore = useOrderStore()

const order = ref({})

onMounted(async () => {
  const singleOrder = await orderStore.getOneOrder(route.params.id)
  console.log('SINGLE ORDER:', singleOrder)
  order.value = singleOrder
})
</script>

<template>
  <div v-if="order" class="">
    <section class="text-gray-600 body-font">
      <div class="container px-0 md:px-5 py-10 md:py-24 mx-auto">
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
              Customer Details
            </h1>
            <p class="leading-relaxed text-base">
              Here are the personal details of the customer:
            </p>

            <div class="md:flex font-bold text-gray-800 space-y-3 mt-5">
              <div class="w-full md:w-1/2 flex space-x-3">
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    First Name
                  </h2>
                  <p>{{ order.orderedBy.firstName }}</p>
                </div>
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">Last Name</h2>
                  <p>{{ order.orderedBy.lastName }}</p>
                </div>
              </div>
              <div class="w-full md:w-1/2 flex space-x-3">
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    Mobile Number
                  </h2>
                  <p>{{ order.orderedBy.phoneNumber }}</p>
                </div>
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">Email</h2>
                  <p>{{ order.orderedBy.email }}</p>
                </div>
              </div>
              <div class="w-full md:w-1/2 flex space-x-3">
                <div class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">Address</h2>
                  <p>{{ order.orderedBy.address }}</p>
                </div>
                <div v-if="order.orderedBy.optionalMessage" class="w-1/2">
                  <h2 class="text-gray-400 font-semibold text-xs">
                    Optional Message
                  </h2>
                  <p>{{ order.orderedBy.optionalMessage }}</p>
                </div>
              </div>
            </div>

            {{ order }}
            <a class="mt-3 text-indigo-500 inline-flex items-center"
              >Learn More
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
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
