<script setup>
import { useProductStore } from '@/stores/product'
import { useVuelidate } from '@vuelidate/core'
import { required, email, alpha, numeric, helpers } from '@vuelidate/validators'



const productStore = useProductStore()

const formData = ref({
  firstName: '',
  lastName: '',
  // fullName: '',
  subject: 'You have a new product ORDER',
  phoneNumber: '',
  email: '',
  address: '',
  optionalMessage: '',
  cartItems: []
})

const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage('The first name field is required', required),
      alpha: helpers.withMessage('A name must not have numbers', alpha),
    },
    lastName: {
      required: helpers.withMessage('The last name field is required', required),
      alpha: helpers.withMessage('Are you okay? A name cannot have numbers', alpha),
    },
    phoneNumber: {
      required: helpers.withMessage('A phone number is required', required),
      numeric: helpers.withMessage('Really, is that a phone number? A phone number can only have numbers.', numeric),
    },
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
    address: {
      required: helpers.withMessage('We need specific details about your location to deliver your order.', required),
    }
  }
})

const v$ = useVuelidate(rules, formData)



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

const submit = async (form) => {

  v$.value.$validate()
  if (!v$.value.$error && productStore.cart.length > 0) {
    try {
      const { pending, data, refresh } = await useFetch('/api/contact', {
        method: 'POST',
        body: formData
      })

      if (pending) {
        waiting.value = true
      }

      if (data.value.statusCode === 200) {
        errors.value = false
        success.value = true
        waiting.value = false
        formData.value = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }

        productStore.cart = []
      }
    } catch (error) {
      // console.log('ERROR', error)
      errors.value = true
      success.value = false
      waiting.value = false
    }
  }

}
</script>

<template>
  <div class="bg-gray-50">
    <div class="max-w-6xl mx-auto pt-40 min-h-screen px-5 xl:px-0">
      <h1 v-if="!success" class="text-2xl font-medium">Checkout</h1>

      <div v-if="!success" class="grid grid-cols-1 md:grid-cols-12 gap-7 mt-5 pb-20">
        <form @submit.prevent="submit(form)"
          class="order-last md:order-first flex flex-col col-span-7 border space-y-5 px-5 py-5 rounded-md border-gray-800 text-gray-800">
          <p class="text-sm  pt-2">Please fill the form below accurately to complete your order. Thank you.
          </p>
          <hr>
          <div class="md:flex w-full space-y-2 md:gap-5">
            <div class="w-full space-y-2">
              <label for="firstName" class="text-xs">Frist Name</label>
              <input v-model="formData.firstName" id="firstName" type="text" placeholder="Enter your first name"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm w-full" :class="{
                  'border-red-500 focus:border-red-500': v$.firstName.$error,
                  'border-[#42d392] ': !v$.firstName.$invalid,
                }" @change="v$.firstName.$touch">
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
              <input v-model="formData.lastName" id="lastName" type="text" placeholder="Enter your last name"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm" :class="{
                  'border-red-500 focus:border-red-500': v$.lastName.$error,
                  'border-[#42d392] ': !v$.lastName.$invalid,
                }" @change="v$.lastName.$touch">
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
              <label for="mobileNumber" class="text-xs">Mobile Phone Number</label>
              <input v-model="formData.phoneNumber" id="mobileNumber" type="text"
                placeholder="Enter your mobile phone number"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm" :class="{
                  'border-red-500 focus:border-red-500': v$.phoneNumber.$error,
                  'border-[#42d392] ': !v$.email.$invalid,
                }" @change="v$.phoneNumber.$touch">
              <!-- <Icon v-if="!v$.phoneNumber.$invalid || v$.phoneNumber.$error"
                  class="absolute right-2 h-full text-xl text-green-500"
                  :class="{ 'text-green-500': !v$.phoneNumber.$invalid, 'text-yellow-500': v$.phoneNumber.$error }"
                  :name="`heroicons-solid:${!v$.phoneNumber.$error ? 'check-circle' : 'exclamation'}`" /> -->
              <div>
                <span class="text-xs text-red-500" v-if="v$.phoneNumber.$error">{{
                  v$.phoneNumber.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="grid w-full space-y-2">
              <label for="email" class="text-xs">Email</label>
              <input v-model="formData.email" id="email" type="text" placeholder="Enter your email address"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm" :class="{
                  'border-red-500 focus:border-red-500': v$.email.$error,
                  'border-[#42d392] ': !v$.email.$invalid,
                }" @change="v$.email.$touch">
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
              <textarea v-model="formData.address" name="address" id="" cols="30" rows="2"
                placeholder="Donholm, Old Donholm Avenue 12. House Number 123"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm flex-1" :class="{
                  'border-red-500 focus:border-red-500': v$.address.$error,
                  'border-[#42d392] ': !v$.address.$invalid,
                }" @change="v$.address.$touch"></textarea>
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
              <label for="optionalMessage" class="text-xs">Additional Message (Optional)</label>
              <textarea v-model="formData.optionalMessage" name="optionalMessage" id="" cols="30" rows="2"
                placeholder="Type in any additional message or specific instructions you may have"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm"></textarea>
            </div>
          </div>

          <div>
            <button type="submit"
              class="w-full py-2 px-auto bg-green-500 shadow-md text-white rounded-md hover:bg-green-600 hover:text-gray-100 hover:shadow-lg"
              :disabled="isDisabled"><span v-if="!waiting">Process</span> <span v-else>Processing...</span></button>
          </div>

          <p v-if="errors">🔥 Your order was not processed. Kindly try again.</p>
        </form>


        <div class="order-1 md:order-last col-span-5 bg-white shadow-sm rounded-md py-5 px-4">
          <h3 class="text-xl text-gray-800 font-medium">Order Summary</h3>
          <div v-for="(product, index) in productStore.cart" :key="index">
            <!-- :selectArray='selectedArray' @selectedRadio='selectedRadioFunc' -->
            <CartItem :product='product' :index="index" />
          </div>
        </div>
      </div>
      <div v-else
        class="w-full max-w-3xl mx-auto border border-green-500 text-green rounded-md py-10 px-10 space-y-5 text-center">
        <p class="text-2xl">📩 Your order is well received! We will get back to you concerning your order.</p>
        <p class="text-xl">If you have any questions don't hesitate to reach out to us on <span
            class="text-orange-500">+254-703-968-795</span>
        </p>
      </div>
    </div>
  </div>
</template>


<style scoped></style>