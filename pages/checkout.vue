<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'
import { useToastStore } from '@/stores/toast'
import { useVuelidate } from '@vuelidate/core'
import { required, email, alpha, numeric, helpers } from '@vuelidate/validators'
import mpesa from '@/assets/images/lipa-na-mpesa.png'

const productStore = useProductStore()
const toast = useToastStore()
const { mpesaProcessComplete, mpesaProcessCancelled, orderUserId } =
  storeToRefs(productStore)

const formData = ref({
  firstName: '',
  lastName: '',
  // fullName: '',
  subject: 'You have a new product ORDER',
  phoneNumber: '',
  email: '',
  address: '',
  optionalMessage: '',
  cartItems: [],
})

const showMpesaModal = ref(false)

const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage(
        'The first name field is required',
        required
      ),
      alpha: helpers.withMessage('A name must not have numbers', alpha),
    },
    lastName: {
      required: helpers.withMessage(
        'The last name field is required',
        required
      ),
      alpha: helpers.withMessage(
        'Are you okay? A name cannot have numbers',
        alpha
      ),
    },
    phoneNumber: {
      required: helpers.withMessage('A phone number is required', required),
      numeric: helpers.withMessage(
        'Really, is that a phone number? A phone number can only have numbers.',
        numeric
      ),
    },
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
    address: {
      required: helpers.withMessage(
        'We need specific details about your location to deliver your order.',
        required
      ),
    },
  }
})

const v$ = useVuelidate(rules, formData)

const orderSaved = ref(false)
const errors = ref(false)
const success = ref(false)
const waiting = ref(false)

// const getFull = () => {
//   return fullName.value = firstName.value + lastName.value
// }

onMounted(() => {
  productStore.cart.forEach((product) => {
    if (product) {
      formData.value.cartItems.push(product)
    }
  })
})

const isDisabled = computed(() => {
  // const disabled =
  return success.value == true || waiting.value == true
})

let productPriceComputed = computed(() => {
  let total = 0

  productStore.cart.forEach((product) => {
    total += product.value.cumulativeCost
  })

  return total
})

const totalPriceComputed = computed(() => {
  let total = 0
  if (productStore.deliveryCost > 0) {
    total = productPriceComputed.value + productStore.deliveryCost
    return total
  }

  total = productPriceComputed.value

  return total
})

const submit = async () => {
  try {
    v$.value.$validate()

    if (!v$.value.$error) {
      // Validate the form save userInfo to the database
      // const saveUser = async () => {
      const response = await $fetch('/user/newUser', {
        method: 'POST',
        body: formData.value,
      })

      productStore.orderUserId = response._id

      // Initiate M-PESA PAYMENT
      const loadMpesaModal = () => {
        showMpesaModal.value = true
      }

      loadMpesaModal()

      watch(
        () => mpesaProcessComplete.value,
        async () => {
          if (mpesaProcessComplete.value) {
            showMpesaModal.value = false
            // console.log('MPESA PROCESS COMPLETE?', mpesaProcessComplete?.value);

            // Get User Id and append it to an order
            const order = {
              deliveryRoute: productStore.deliveryRoute.name,
              deliveryLocation: productStore.deliveryLocation,
              deliveryCost: productStore.deliveryCost,
              isPaidFor: true,
              products: formData.value.cartItems,
              orderedBy: productStore.orderUserId,
              payment: productStore.paymentDetails._id,
            }
            const resp = await $fetch('/order/newOrder', {
              method: 'POST',
              body: order,
            })

            // console.log('ORDER DATA', resp)

            orderSaved.value = true

            toast.add({
              type: 'success',
              message: 'Your order is being processed.',
            })

            // After order is saved, send and email to the admin of the order

            if (!v$.value.$error && orderSaved.value) {
              const result = await $fetch('/api/contact', {
                method: 'POST',
                body: {
                  formData: formData.value,
                  order: resp,
                  paymentDetails: productStore.paymentDetails,
                },
              })

              // if (pending) {
              //   waiting.value = true
              // }
              // console.log('RESULT:', result);

              // if (result) {
              errors.value = false
              success.value = true
              waiting.value = false
              formData.value = {
                name: '',
                email: '',
                subject: '',
                message: '',
              }
              ;(productStore.customName = ''),
                (productStore.selectedFont = ''),
                (productStore.textPosition = ''),
                (productStore.customizationFee = 0),
                (productStore.customizedBottle = false),
                (productStore.selectedProduct = null),
                (productStore.dbProducts = []),
                (productStore.product = null),
                (productStore.cart = []),
                // product detail page id to select product color & image
                (productStore.imageId = ''),
                // destination: {
                (productStore.deliveryRoute = []),
                (productStore.deliveryLocation = ''),
                (productStore.deliveryCost = 0),
                (productStore.orderUserId = ''),
                (productStore.mpesaProcessComplete = false),
                (productStore.paymentResponse = null),
                (productStore.paymentDetails = null)

              productStore.mpesaProcessComplete = false

              // }
            }
          } else if (mpesaProcessCancelled.value) {
            showMpesaModal.value = false

            toast.add({
              type: 'error',
              message: 'Your payment was not successful. Please try again.',
            })

            errors.value = true
            success.value = false
            waiting.value = false
            formData.value = {
              name: '',
              email: '',
              subject: '',
              message: '',
            }
            ;(productStore.customName = ''),
              (productStore.selectedFont = ''),
              (productStore.textPosition = ''),
              (productStore.customizationFee = 0),
              (productStore.customizedBottle = false),
              (productStore.selectedProduct = null),
              (productStore.dbProducts = []),
              (productStore.product = null),
              (productStore.cart = []),
              // product detail page id to select product color & image
              (productStore.imageId = ''),
              // destination: {
              (productStore.deliveryRoute = []),
              (productStore.deliveryLocation = ''),
              (productStore.deliveryCost = 0),
              (productStore.orderUserId = ''),
              (productStore.mpesaProcessComplete = false),
              (productStore.paymentResponse = null),
              (productStore.paymentDetails = null)

            productStore.mpesaProcessCancelled = false
          }
        }
      )
    }
  } catch (error) {
    // console.log(error);
    toast.add({
      type: 'error',
      message:
        'You payment was received successfully, but an error occurred while processing your order.',
    })
    // throw createError({
    //   statusCode: 400,
    //   statusMessage: 'An error occurred'
    // })
  }
}

// v$.value.$validate()
// if (!v$.value.$error && productStore.cart.length > 0) {
//   try {

//     const { pending, data, refresh } = await useFetch('/api/contact', {
//       method: 'POST',
//       body: formData
//     })

//     if (pending) {
//       waiting.value = true
//     }

//     if (data.value.statusCode === 200) {
//       errors.value = false
//       success.value = true
//       waiting.value = false
//       formData.value = {
//         name: '',
//         email: '',
//         subject: '',
//         message: ''
//       }

//       productStore.cart = []
//     }
//   } catch (error) {
//     // console.log('ERROR', error)
//     errors.value = true
//     success.value = false
//     waiting.value = false
//   }
// }

// }
</script>

<template>
  <div class="bg-slate-50">
    <div class="max-w-6xl mx-auto pt-10 pb-20 h-auto px-5 xl:px-0">
      <h1 v-if="!success" class="text-2xl font-medium">Checkout</h1>

      <div
        v-if="!success"
        class="grid grid-cols-1 md:grid-cols-12 gap-7 mt-5 pb-20"
      >
        <form
          @submit.prevent="submit(form)"
          class="order-last md:order-first flex flex-col col-span-12 md:col-span-7 border space-y-5 px-5 py-5 rounded-md border-gray-800 text-gray-800"
        >
          <p class="text-sm pt-2">
            Please fill the form below accurately to complete your order. Thank
            you.
          </p>
          <hr />
          <div class="md:flex w-full space-y-2 md:gap-5">
            <div class="w-full space-y-2">
              <label for="firstName" class="text-xs">First Name</label>
              <input
                v-model="formData.firstName"
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm w-full"
                :class="{
                  'border-red-500 focus:border-red-500': v$.firstName.$error,
                  'border-[#42d392] ': !v$.firstName.$invalid,
                }"
                @change="v$.firstName.$touch"
              />
              <!-- <Icon v-if="!v$.firstName.$invalid || v$.firstName.$error"
                  class="absolute right-2 h-full text-xl text-green-500"
                  :class="{ 'text-green-500': !v$.firstName.$invalid, 'text-yellow-500': v$.firstName.$error }"
                  :name="`heroicons-solid:${!v$.firstName.$error ? 'check-circle' : 'exclamation'}`" /> -->
              <div>
                <span class="text-xs text-red-500" v-if="v$.firstName.$error">{{
                  v$.firstName.$errors[0].$message
                }}</span>
              </div>
            </div>

            <div class="grid w-full space-y-2">
              <label for="lastName" class="text-xs">Last Name</label>
              <input
                v-model="formData.lastName"
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm"
                :class="{
                  'border-red-500 focus:border-red-500': v$.lastName.$error,
                  'border-[#42d392] ': !v$.lastName.$invalid,
                }"
                @change="v$.lastName.$touch"
              />
              <!-- <Icon v-if="!v$.lastName.$invalid || v$.lastName.$error"
                  class="absolute right-2 h-full text-xl text-green-500"
                  :class="{ 'text-green-500': !v$.lastName.$invalid, 'text-yellow-500': v$.lastName.$error }"
                  :name="`heroicons-solid:${!v$.lastName.$error ? 'check-circle' : 'exclamation'}`" /> -->

              <div>
                <span class="text-xs text-red-500" v-if="v$.lastName.$error">{{
                  v$.lastName.$errors[0].$message
                }}</span>
              </div>
            </div>
          </div>
          <div class="w-full space-y-5">
            <div class="grid w-full space-y-2">
              <label for="mobileNumber" class="text-xs"
                >Mobile Phone Number</label
              >
              <input
                v-model="formData.phoneNumber"
                id="mobileNumber"
                type="text"
                placeholder="Enter your mobile phone number"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm"
                :class="{
                  'border-red-500 focus:border-red-500': v$.phoneNumber.$error,
                  'border-[#42d392] ': !v$.email.$invalid,
                }"
                @change="v$.phoneNumber.$touch"
              />
              <!-- <Icon v-if="!v$.phoneNumber.$invalid || v$.phoneNumber.$error"
                  class="absolute right-2 h-full text-xl text-green-500"
                  :class="{ 'text-green-500': !v$.phoneNumber.$invalid, 'text-yellow-500': v$.phoneNumber.$error }"
                  :name="`heroicons-solid:${!v$.phoneNumber.$error ? 'check-circle' : 'exclamation'}`" /> -->
              <div>
                <span
                  class="text-xs text-red-500"
                  v-if="v$.phoneNumber.$error"
                  >{{ v$.phoneNumber.$errors[0].$message }}</span
                >
              </div>
            </div>
            <div class="grid w-full space-y-2">
              <label for="email" class="text-xs">Email</label>
              <input
                v-model="formData.email"
                id="email"
                type="text"
                placeholder="Enter your email address"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm"
                :class="{
                  'border-red-500 focus:border-red-500': v$.email.$error,
                  'border-[#42d392] ': !v$.email.$invalid,
                }"
                @change="v$.email.$touch"
              />
              <!-- <Icon v-if="!v$.email.$invalid || v$.email.$error" class="absolute right-2 h-full text-xl text-green-500"
                  :class="{ 'text-green-500': !v$.email.$invalid, 'text-yellow-500': v$.email.$error }"
                  :name="`heroicons-solid:${!v$.email.$error ? 'check-circle' : 'exclamation'}`" /> -->

              <div>
                <span class="text-xs text-red-500" v-if="v$.email.$error">{{
                  v$.email.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="grid w-full space-y-2">
              <label for="address" class="text-xs">Physical Location</label>
              <textarea
                v-model="formData.address"
                name="address"
                id=""
                cols="30"
                rows="2"
                placeholder="Donholm, Old Donholm Avenue 12. House Number 123"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm flex-1"
                :class="{
                  'border-red-500 focus:border-red-500': v$.address.$error,
                  'border-[#42d392] ': !v$.address.$invalid,
                }"
                @change="v$.address.$touch"
              ></textarea>
              <!-- <Icon v-if="!v$.address.$invalid || v$.address.$error"
                  class="absolute right-2 h-full text-xl text-green-500"
                  :class="{ 'text-green-500': !v$.address.$invalid, 'text-yellow-500': v$.address.$error }"
                  :name="`heroicons-solid:${!v$.address.$error ? 'check-circle' : 'exclamation'}`" /> -->

              <div>
                <span class="text-xs text-red-500" v-if="v$.address.$error">{{
                  v$.address.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="grid w-full space-y-2">
              <label for="optionalMessage" class="text-xs"
                >Additional Message (Optional)</label
              >
              <textarea
                v-model="formData.optionalMessage"
                name="optionalMessage"
                id=""
                cols="30"
                rows="2"
                placeholder="Type in any additional message or specific instructions you may have"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm"
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full py-2 px-auto bg-green-500 shadow-md text-white rounded-md hover:bg-green-600 hover:text-gray-100 hover:shadow-lg"
              :disabled="isDisabled"
            >
              <span v-if="!waiting">Process</span>
              <span v-else>Processing...</span>
            </button>
          </div>

          <p v-if="errors">
            🔥 Your order was not processed. Kindly try again.
          </p>
        </form>

        <div
          class="order-1 md:order-last col-span-12 md:col-span-5 bg-white shadow-sm rounded-md py-10 px-7"
        >
          <h3 class="text-2xl font-extrabold mb-2 text-gray-700">
            Order Summary
          </h3>
          <!-- <div class="text-2xl font-extrabold mb-2">Summary</div> -->
          <div class="space-y-1">
            <div
              v-if="productStore.deliveryCost > 0"
              class="flex items-center justify-between"
            >
              <div class="font-medium text-sm">Delivery fees</div>
              <div class="text-xl font-semibold">
                <span class="font-semibold text-sm">{{
                  useCurrencyFormatter(productStore.deliveryCost)
                }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="font-medium text-sm">
                Cumulative water bottle cost
              </div>
              <div class="text-xl font-semibold">
                <span class="font-semibold text-sm">{{
                  useCurrencyFormatter(productPriceComputed)
                }}</span>
              </div>
            </div>
          </div>
          <hr class="my-4" />
          <div class="flex items-center justify-between my-4">
            <div class="font-semibold">Total</div>
            <div
              v-if="productStore.deliveryCost > 0"
              class="text-xl font-semibold"
            >
              <span class="font-bold">{{
                useCurrencyFormatter(totalPriceComputed)
              }}</span>
            </div>
            <div v-else class="text-xl font-semibold">
              <span class="font-bold">
                {{ useCurrencyFormatter(productPriceComputed) }}</span
              >
            </div>
          </div>
          <hr class="border-gray-700" />
          <!-- <div v-for="(product, index) in productStore.cart" :key="index"> -->
          <!-- :selectArray='selectedArray' @selectedRadio='selectedRadioFunc' -->
          <!-- <CartItem :product='product' :index="index" /> -->
          <!-- </div> -->
        </div>
      </div>
      <div
        v-else
        class="w-full max-w-3xl mx-auto border border-green-500 text-green rounded-md py-10 px-10 space-y-5 text-center"
      >
        <p class="text-2xl">
          📩 Your order is well received! We are processing your order.
        </p>
        <p class="text-xl">
          If you have any questions don't hesitate to reach out to us on
          <span class="text-orange-500">+254-701-939-883</span>
        </p>
      </div>
    </div>

    <div
      v-if="showMpesaModal"
      class="inset-0 overflow-y-auto overflow-x-hidden fixed z-50 flex w-full h-screen items-center justify-center"
    >
      <Mpesa :amount="totalPriceComputed" :mpesaLogo="mpesa" />
    </div>
    <div
      v-if="showMpesaModal"
      class="opacity-25 fixed inset-0 z-10 bg-black"
    ></div>
  </div>
</template>

<style scoped></style>
