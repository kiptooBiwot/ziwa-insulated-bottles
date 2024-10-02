<script setup>
import { format, parseISO } from 'date-fns'

definePageMeta({
  layout: 'dashboard',
})

const props = defineProps({
  payments: {
    type: Array,
    required: true,
  },
})

const dayjs = useDayjs()
dayjs.locale = 'en-GB'

// const formattedDate = computed((date) => {
//   // console.log('SINGLE ORDER:', orderStore.singleOrder)
//   if (date) {
//     // console.log('STORE SINGLE ORDER:', orderStore.singleOrder)
//     // const date = orderStore.singleOrder?.payment?.TransactionDate
//     // console.log('DATE:', date)

//     const parsedDate = parseISO(date)
//     const formattedDate = format(
//       new Date(parsedDate),
//       'EEE, MMM dd, yyyy, hh:mmaa'
//     )

//     return formattedDate
//   }
// })

// const formatDate = (date) => {
//   if (date) {
//     const parsedDate = parseISO(date)
//     const formattedDate = format(
//       new Date(parsedDate),
//       'EEE, MMM dd, yyyy, hh:mmaa'
//     )

//     return formattedDate
//   }
// }

function formatDate(dateString) {
  // Create a new Date object from the input string
  const date = dayjs(dateString)

  // Format the date
  return date.format('ddd, MMM DD, YYYY, h:mm A')
}
</script>

<template>
  <div class="w-full">
    <h1 class="text-xl py-5 font-bold text-blue-800">
      Payment History (Paid, Cancelled, Insufficient Funds)
    </h1>

    <div v-for="(payment, index) in payments" :key="index" class="">
      <div
        class="px-6 py-4 border border-gray-300 rounded-lg shadow-md space-y-1 mb-5"
        :class="[
          payment.ResultCode === 0
            ? 'border-l-[20px] border-l-green-500 bg-slate-50'
            : '',
          payment.ResultCode === 1032
            ? 'border-l-[20px] border-l-rose-500 bg-rose-50'
            : '',
          payment.ResultCode === 1
            ? 'border-l-[20px] border-l-yellow-500 bg-yellow-50'
            : '',
          ,
          payment.ResultCode === 1037
            ? 'border-l-[20px] border-l-orange-500 bg-orange-50'
            : '',
          payment.ResultCode === 2001
            ? 'border-l-[20px] border-l-red-500 bg-red-50'
            : '',
        ]"
      >
        <!-- <h2 class="text-xl font-semibold mb-4">
          MPESA CODE {{ payment.MpesaReceiptNumber }}
        </h2> -->
        <!-- {{ payment }} -->
        <div class="w-full flex space-x-3">
          <div class="w-full">
            <h2 class="text-gray-400 font-semibold text-xs">
              Checkout Request ID (The last nine digits should be the customer's
              phone number)
            </h2>
            <p>
              {{ payment.CheckoutRequestID }}
            </p>
          </div>
        </div>
        <hr class="" />
        <div class="w-full flex space-x-3">
          <div class="w-1/2">
            <h2 class="text-gray-400 font-semibold text-xs">
              MPesa Receipt Code
            </h2>
            <p>
              {{ payment.MpesaReceiptNumber }}
            </p>
          </div>
          <div class="w-1/2">
            <h2 class="text-gray-400 font-semibold text-xs">Result Code</h2>
            <p>{{ payment.ResultCode }}</p>
          </div>
        </div>
        <div class="w-full flex space-x-3">
          <div class="w-1/2">
            <h2 class="text-gray-400 font-semibold text-xs">
              MPesa Response Message
            </h2>
            <p>
              {{ payment.ResultDesc }}
            </p>
          </div>
          <div class="w-1/2">
            <h2 class="text-gray-400 font-semibold text-xs">Amount</h2>
            <p>{{ payment.Amount }}</p>
          </div>
        </div>
        <div class="w-full flex space-x-3">
          <div v-if="payment.PhoneNumber" class="w-1/2">
            <h2 class="text-gray-400 font-semibold text-xs">Phone Number</h2>
            <p>
              {{ payment.PhoneNumber }}
            </p>
          </div>
          <div class="w-1/2">
            <h2 class="text-gray-400 font-semibold text-xs">
              Transaction Date & Time
            </h2>
            <p>
              {{ formatDate(payment.createdAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
