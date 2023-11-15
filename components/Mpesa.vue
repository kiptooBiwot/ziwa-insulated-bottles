<script setup>
import { useProductStore } from "@/stores/product";
import { useToastStore } from '@/stores/toast'

const productStore = useProductStore()
const toast = useToastStore()

const props = defineProps({
  amount: {
    type: Number,
    required: true
  },
  mpesaLogo: {
    type: String,
  }
})

const phoneNumber = ref('')
const transactionId = ref('')

const stkPushToPhone = async () => {
  const response = await useFetch('/payment/pushstk', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: {
      amount: 1, //props.amount
      phone: phoneNumber.value
    }
  })

  // console.log('RESPONSE MODAL', response);
  productStore.paymentResponse = response

  toast.add({
    type: 'success',
    message: 'Please check your phone, enter your PIN number to pay for your order.'
  })
}


const confirmMpesaPayment = async () => {
  try {
    const resp = await $fetch(`/payment/${transactionId.value}`, {
      method: 'GET',
      // body: transactionId.value
    })
    console.log('FE RESPONSE', resp);
    if (resp) {
      productStore.paymentDetails = resp
      productStore.mpesaProcessComplete = true
      productStore.orderUserId = resp._id

      toast.add({
        type: 'success',
        message: 'Your payment is well received. Your order is  cued for processing'
      })
    }

    // if (resp == null) {
    // productStore.paymentResponse = null

    // throw createError({
    //   statusCode: 400,
    //   statusMessage: '',
    //   message: 'Payment was not successful. Please try again.'
    // })
    // }

    return resp
  } catch (error) {
    toast.add({
      type: 'error',
      message: 'The M-PESA transaction ID/code is not correct. Please try again.'
    })

  }
}
</script>

<template>
  <div class="overflow-hidden rounded-lg max-w-xl h-auto shadow-2xl pb-10 pt-0 px-7 z-50 bg-white">
    <!-- Amount: {{ useCurrencyFormatter(amount) }} -->
    <div>
      <img :src="mpesaLogo" alt="Lipa Na M-PESA" class="mx-auto w-48 h-auto">
    </div>
    <div v-if="!productStore?.paymentResponse" class="">
      <form action="" method="post" class="max-w-xl space-y-3">
        <div class="flex flex-col gap-2 w-full">
          <label for="phoneNumber" class="text-sm">
            Enter your M-PESA phone number
          </label>
          <input v-model="phoneNumber" type="text" required placeholder="0722123456" class="border rounded-md px-4 py-2">
        </div>
        <p class="text-sm">Amount: <span class="text-blue-500 font-semibold text-base">{{
          useCurrencyFormatter(amount)
        }}</span></p>
        <button
          class="bg-green-500 text-white hover:bg-green-600 hover:text-gray-100 hover:shadow-xl transform duration-500 ease-in-out w-full py-2 rounded-md shadow-lg "
          @click.prevent="stkPushToPhone">Proceed</button>
      </form>
    </div>
    <div v-else class="space-y-5">
      <p class="text-sm text-green-500">Please check your phone, enter your PIN number to pay for your order.</p>
      <p class="text-sm text-rose-500">From your M-PESA payment confirmation message, please enter the Mpesa Transaction
        ID/Code e.g.
        LHG31AA5TX.</p>
      <form action="" class="space-y-5">
        <div class="flex flex-col gap-2 w-full">
          <label for="phoneNumber" class="text-xs">
            Enter your M-PESA Transaction ID/Code from the M-Pesa message
          </label>
          <input v-model="transactionId" type="text" required placeholder="RKC6495TF8"
            class="border rounded-md px-4 py-2">
        </div>
        <button
          class="bg-green-500 text-white hover:bg-green-600 hover:text-gray-100 hover:shadow-xl transform duration-500 ease-in-out w-full py-2 rounded-md shadow-lg"
          @click.prevent="confirmMpesaPayment">Confirm Payment</button>
      </form>
    </div>
  </div>
</template>


<style scoped></style>