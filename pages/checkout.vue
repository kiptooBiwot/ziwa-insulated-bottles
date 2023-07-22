<script setup>
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()

// const form = ref({
//   name: 'Ziwa Website',
//   email: 'website@info.com',
//   subject: 'You have a new ORDER',
//   message: 'A new message test on Nuxt 3 and Nodemailer!'
// })

const formData = ref({
  firstName: 'Kiptoo',
  lastName: 'biwot',
  // fullName: '',
  subject: 'You have a new ORDER',
  phoneNumber: '0987654321',
  email: 'mail@mail.com',
  address: 'Upper Elgon view Road',
  optionalMessage: 'Optinal',
  cartItems: []
})

const errors = ref(false)
const succsess = ref(false)
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

const submit = async (form) => {
  try {
    waiting.value = true
    // getFull()
    const { pending, data, refresh } = await useFetch('/api/contact', {
      method: 'POST',
      body: formData
    })
    // console.log('MAIL rESponse', response)
    if (pending) {
      waiting.value = true
    }

    if (data) {
      console.log('DATA on frontend - response', data);
      errors.value = false
      succsess.value = true
      waiting.value = false
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }

      productStore.cart = []
    }
    // if (response) {


    // }
  } catch (error) {
    errors.value = true
    succsess.value = false
    waiting.value = false
  }

}
</script>

<template>
  <div class="bg-gray-50">
    <div class="max-w-6xl mx-auto pt-40 min-h-screen px-5 xl:px-0">
      <h1 class="text-2xl font-medium">Checkout</h1>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-7 mt-5 pb-20">
        <form action="" @submit.prevent="submit(form)"
          class="order-last md:order-first flex flex-col col-span-7 border space-y-5 px-5 py-5 rounded-md border-gray-800 text-gray-800">
          <p class="text-sm  pt-2">Please fill the form below accurately to complete your order. Thank you.
          </p>
          <hr>
          <div class="md:flex w-full space-y-2 md:gap-5">
            <div class="grid w-full space-y-2">
              <label for="firstName" class="text-xs">Frist Name</label>
              <input v-model="formData.firstName" id="firstName" type="text" placeholder="Enter your first name"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm">
            </div>
            <div class="grid w-full space-y-2">
              <label for="lastName" class="text-xs">Last Name</label>
              <input v-model="formData.lastName" id="lastName" type="text" placeholder="Enter your last name"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm">
            </div>
          </div>
          <div class="w-full space-y-5">
            <div class="grid w-full space-y-2">
              <label for="mobileNumber" class="text-xs">Mobile Phone Number</label>
              <input v-model="formData.phoneNumber" id="mobileNumber" type="text"
                placeholder="Enter your mobile phone number"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm">
            </div>
            <div class="grid w-full space-y-2">
              <label for="email" class="text-xs">Email</label>
              <input v-model="formData.email" id="email" type="text" placeholder="Enter your email address"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm">
            </div>
            <div class="grid w-full space-y-2">
              <label for="address" class="text-xs">Physical Location</label>
              <textarea v-model="formData.address" name="address" id="" cols="30" rows="2"
                placeholder="Donholm, Old Donholm Avenue 12. House Number 123"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm"></textarea>
            </div>
            <div class="grid w-full space-y-2">
              <label for="optionalMessage" class="text-xs">Additional Message (Optional)</label>
              <textarea v-model="formData.optionalMessage" name="optionalMessage" id="" cols="30" rows="2"
                placeholder="Type in any additional message or specific instructions you may have"
                class="py-2 px-4 border border-gray-800 rounded-md placeholder:text-sm"></textarea>
            </div>
          </div>

          <div>
            <button type="submit" class="w-full py-2 px-auto bg-green-500 text-white rounded-md"><span
                v-if="!waiting">Process</span> <span v-else>Processing...</span></button>
          </div>

          <p v-if="errors">🔥 There were some errors.</p>
          <p v-if="succsess">📩 Email sent!</p>
        </form>

        <div class="order-1 md:order-last col-span-5 bg-white shadow-sm rounded-md py-5 px-4">
          <h3 class="text-xl text-gray-800 font-medium">Order Summary</h3>
          <div v-for="(product, index) in productStore.cart" :key="index">
            <!-- :selectArray='selectedArray' @selectedRadio='selectedRadioFunc' -->
            <CartItem :product='product' :index="index" />
          </div>
        </div>
      </div>
      <!-- <form @submit.prevent="submit(form)" class="flex flex-col space-y-5 py-20">
        <div class="input-wrapper flex flex-col max-w-sm">
          <label for="email">E-Mail:</label>
          <input required v-model="form.email" type="email" name="email" class="py-2 px-4 border rounded-md" />
        </div>
        <div class="input-wrapper flex flex-col max-w-sm">
          <label for="name">Name</label>
          <input required v-model="form.name" type="text" name="name" class="py-2 px-4 border rounded-md" />
        </div>
        <div class="input-wrapper flex flex-col max-w-sm">
          <label for="subject">Subject</label>
          <input v-model="form.subject" type="text" name="subject" class="py-2 px-4 border rounded-md" />
        </div>
        <div class="input-wrapper flex flex-col max-w-sm">
          <label for="message">Message</label>
          <textarea required v-model="form.message" type="text" name="message"
            class="py-2 px-4 border rounded-md"></textarea>
        </div>
        <button type="submit" class="bg-green-500 text-white px-6 py-3 rounded-sm max-w-sm shadow-sm">
          <template v-if="waiting">Sending...</template>
          <template v-if="!waiting">Send</template>
        </button>
        <p v-if="errors">🔥 There were some errors.</p>
        <p v-if="succsess">📩 Email sent!</p>
      </form> -->
    </div>
  </div>
</template>


<style scoped></style>