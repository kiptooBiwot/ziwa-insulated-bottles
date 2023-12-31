<script setup>
import { useProductStore } from "@/stores/product";
import { useToastStore } from '@/stores/toast'
import { useGeneralStore } from "@/stores/general";
import { storeToRefs } from "pinia";

const productStore = useProductStore()
const toast = useToastStore()
let { transactionData } = storeToRefs(useGeneralStore())

const isLoading = ref(false)

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

// Validate the transaction 
const validateTransaction = (data) => {
  let payload = data.value
  // console.log('FE PAYLOAD:', payload);
  // console.log('VALIDATE TRANSACTION')
  const checkStatus = async () => {
    try {

      const data = await $fetch('/payment/validate', {
        method: 'POST',
        body: {
          MerchantRequestID: payload.MerchantRequestID
        }
        // body: transactionId.value
      })

      // console.log('VERIFICATION RESP:', data);
      if (data) {
        transactionData = true
        const transaction = data
        // console.log('Transaction', transaction);

        switch (transaction.ResultCode) {
          case 0:
            productStore.paymentResponse = transaction
            productStore.paymentDetails = transaction
            productStore.mpesaProcessComplete = true
            // productStore.orderUserId = resp._id

            toast.add({
              type: 'success',
              message: 'Your payment is well received. Your order is  cued for processing.'
            })
            break;
          case 1032:
            // console.log('Transaction cancelled by the user');
            toast.add({
              type: 'error',
              message: 'You cancelled the transaction. Please, try again.'
            })
            break;
          case 2001:
            // console.log('The initiator info. is invalid');
            toast.add({
              type: 'error',
              message: 'You entered a wrong PIN. Please try again.'
            })
            break;
          default:
            // console.log('Transaction failed')
            toast.add({
              type: 'error',
              message: 'Payment is not complete. Please try again.'
            })
            await checkStatus()
            break;
        }
      }
      isLoading.value = false
    }
    catch (error) {
      // console.log('FETCH ERROR CATCH', error);
      isLoading.value = false
      toast.add({
        type: 'error',
        message: error.message
      })
    }
  }

  setTimeout(checkStatus, 30000);
}

const stkPushToPhone = async () => {
  isLoading.value = true
  try {
    const response = await useFetch('/payment/pushstk', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: {
        amount: props.amount, //1,
        phone: phoneNumber.value
      }
    })

    toast.add({
      type: 'success',
      message: 'Please check your phone, enter your PIN number to pay for your order.'
    })

    // console.log('RESPONSE MODAL', response);
    // productStore.paymentResponse = response
    if (response.data) {
      // Watch for transactionData when it turns to true run this
      // Transaction data will be true when there's any kind of callback response.
      // watch(() => transactionData.value, async () => {

      // if (transactionData.value) {
      validateTransaction(response.data)
      // }
      // })

    }

  } catch (error) {
    isLoading.value = false
    toast.add({
      type: 'error',
      message: `Push STK error, ${error}`
    })
  }
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
          class="bg-green-500 text-white hover:bg-green-600 hover:text-gray-100 hover:shadow-xl transform duration-500 ease-in-out w-full py-2 rounded-md shadow-lg"
          :class="[isLoading ? 'bg-green-300 hover:bg-green-300 cursor-not-allowed ' : null]" :disabled="isLoading"
          @click.prevent="stkPushToPhone">
          <span v-if="isLoading">
            <Icon name="gg:spinner-two-alt" class="w-6 h-6 fill-white animate-spin mr-3" />
          </span><span>Proceed</span>
        </button>
      </form>
    </div>
    <!-- <div v-else class="space-y-5">
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
    </div> -->
  </div>
</template>


<style scoped></style>