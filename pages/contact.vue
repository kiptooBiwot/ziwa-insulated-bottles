<script setup>
import contactUs from '@/assets/images/contact-us.jpg'
import { useVuelidate } from '@vuelidate/core'
import { required, email, alpha, numeric, helpers } from '@vuelidate/validators'
import { useToastStore } from "@/stores/toast";

const toast = useToastStore()

const contactDetails = reactive({
  fullName: '',
  email: '',
  mobileNumber: '',
  contactMessage: ''
})

const emailSent = ref(false)

const rules = computed(() => {
  return {
    fullName: {
      required: helpers.withMessage('Your name is required', required)
    },
    email: {
      required: helpers.withMessage('Your email is required', required),
      email: helpers.withMessage('Invalid email format', email)
    },
    mobileNumber: {
      required: helpers.withMessage('A phone number is required', required),
      numeric: helpers.withMessage('A phone number can only have numbers', numeric)
    },
    contactMessage: {
      required: helpers.withMessage('Please enter your message', required)
    }
  }

})

const v$ = useVuelidate(rules, contactDetails)

const sendEmail = async () => {

  v$.value.$validate()

  if (!v$.value.$error) {
    try {
      const response = await $fetch('/api/send-email', {
        method: 'POST',
        body: {
          fullName: contactDetails.fullName,
          email: contactDetails.email,
          mobileNumber: contactDetails.mobileNumber,
          message: contactDetails.contactMessage
        }
      })

      if (response.statusCode === 200) {
        toast.add({
          type: 'success',
          message: 'Your message was received. We will reach out to you as soon as possible',
          timeout: 6000
        })

        emailSent.value = true
      }
    } catch (error) {
      toast.add({
        type: 'error',
        message: 'An error occurred, please try again later.',
        timeout: 6000
      })
    }

    // contactDetails.fullName = ''
    // contactDetails.mobileNumber = ''
    // contactDetails.email = ''
    // contactDetails.contactMessage = ''
  }

  // const response = await $fetch('/api')
}
</script>

<template>
  <div class="w-full py-24 min-h-screen">
    <div class="max-w-6xl mx-auto py-5">
      <h3 class="px-5 lg:px-0 text-2xl font-semibold">
        Contact Us
      </h3>
    </div>
    <div class="grid grid-cols-1 max-w-4xl lg:max-w-full lg:grid-cols-2">
      <div>
        <img
          src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbnRhY3QlMjB1c3xlbnwwfHwwfHx8MA%3D%3D"
          alt="" class="object-contain w-full h-full">
      </div>
      <div class="p-5">
        <div v-if="!emailSent" class="w-full md:w-[80%] mx-auto space-y-5">
          <h5 class="text-lg">Fill in the form below to drop us a message</h5>

          <form action="" class="space-y-3" @submit.prevent="sendEmail">
            <div class=" flex flex-col">
              <label for="fullName" class="text-xs">
                Full Name
              </label>
              <input v-model="contactDetails.fullName" type="text" name="fullName" placeholder="John Doe"
                class="py-2 px-4 border rounded-md w-full text-sm" :class="{
                  'border-red-500 focus:border-red-500': v$.fullName.$error,
                  'border-[#42d392] ': !v$.fullName.$invalid,
                }" @change="v$.fullName.$touch">
              <div>
                <span class="text-xs text-red-500" v-if="v$.fullName.$error">{{
                  v$.fullName.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="flex flex-col">
              <label for="email" class="text-xs">
                Email address
              </label>
              <input v-model="contactDetails.email" type="email" name="email" placeholder="johndoe@gmail.com"
                class="py-2 px-4 border rounded-md w-full text-sm" :class="{
                  'border-red-500 focus:border-red-500': v$.fullName.$error,
                  'border-[#42d392] ': !v$.email.$invalid,
                }" @change="v$.email.$touch">
              <div>
                <span class="text-xs text-red-500" v-if="v$.email.$error">{{
                  v$.email.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="flex flex-col">
              <label for="mobileNumber" class="text-xs">
                Mobile Number
              </label>
              <input v-model="contactDetails.mobileNumber" type="text" name="mobileNumber" placeholder="+254722000000"
                class="py-2 px-4 border rounded-md w-full text-sm" :class="{
                  'border-red-500 focus:border-red-500': v$.mobileNumber.$error,
                  'border-[#42d392] ': !v$.mobileNumber.$invalid,
                }" @change="v$.mobileNumber.$touch">
              <div>
                <span class="text-xs text-red-500" v-if="v$.mobileNumber.$error">{{
                  v$.mobileNumber.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="flex flex-col">
              <label for="message" class="text-xs">
                Message
              </label>
              <textarea v-model="contactDetails.contactMessage" name="message" id="" cols="30" rows="5"
                placeholder="Type in your message" class="py-2 px-4 border rounded-md w-full text-sm" :class="{
                  'border-red-500 focus:border-red-500': v$.contactMessage.$error,
                  'border-[#42d392] ': !v$.contactMessage.$invalid,
                }" @change="v$.contactMessage.$touch">
              </textarea>
              <div>
                <span class="text-xs text-red-500" v-if="v$.contactMessage.$error">{{
                  v$.contactMessage.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div>
              <button type="submit"
                class="py-3 px-6 w-full text-white bg-green-500 uppercase text-sm rounded-md hover:bg-gree-600 hover:shadow-lg hover:text-gray-200">Submit</button>
            </div>
          </form>
        </div>

        <div v-else class="w-full md:w-[80%] mx-auto space-y-5">
          <div class="w-full bg-green-100 px-10 py-5 rounded-md">
            <h3 class="text-green-700 font-bold text-xl pb-3">Your message was received</h3>
            <p class="text-green-500">Your message is well received. Thank you for reaching out to us. We will get back to
              you as soon as possible. </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
