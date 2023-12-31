<script setup>
import logo from "~/assets/images/logo/ziwa_logo1.png";
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from "@vuelidate/core";
import { v4 as uuidv4 } from "uuid"
import { client, account } from "~/utils/utils"

definePageMeta({
  layout: 'auth'
})
const signUp = async () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    // const newUser = await account.create(uuidv4(), credentials.email, credentials.password, credentials.name)

    // console.log('New User:', newUser)
    // Handle responses success and failure
  }
}

const credentials = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Your name is required', required),
      // alpha: helpers.withMessage('A name cannot have numbers')
    },
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: minLength(6),
    },
    confirmPassword: {
      required: helpers.withMessage('The password confirmation field is required', required), sameAs: helpers.withMessage("Passwords don't match. Please try again.", sameAs(credentials.password)),
    },
  };
});

const v$ = useVuelidate(rules, credentials) 
</script>

<template>
  <!-- component -->
  <div class="bg-white ">
    <div class="flex justify-center h-screen">
      <div class="hidden bg-cover lg:block lg:w-2/3"
        style="background-image: url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)">
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-white">Ziwa Insulated Bottles</h2>

            <p class="max-w-xl mt-3 text-gray-300">
              Please register to create an account. This is for authorized users only.
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center w-full max-w-md  px-6 mx-auto lg:w-2/6 overflow-x-hidden overflow-scroll">
        <div class="flex-1 ">
          <div class="text-center">

            <div class="py-4 w-28 bg-[#395A9F] shadow-md rounded-md mx-auto">
              <img :src=logo alt="" class="w-14 h-auto mx-auto">
            </div>
            <!-- <h2 class="text-4xl font-bold text-center text-gray-700 ">Brand</h2> -->

            <p class="mt-3 text-gray-500 ">Sign up to create an account</p>
          </div>

          <div class="mt-8">
            <form class="space-y-2">
              <div>
                <label for="email" class="block mb-2 text-sm text-gray-600 ">Full name</label>
                <input v-model="credentials.name" type="text" name="name" id="name" placeholder="John Doe"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 placeholder:text-sm bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  :class="{ 'border-red-500 focus:border-red-500': v$.name.$error, 'border-[#42d392] ': !v$.name.$invalid, }"
                  @change="v$.name.$touch" />
                <span class="text-xs text-red-500" v-if="v$.name.$error">
                  {{ v$.name.$errors[0].$message }}
                </span>
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm text-gray-600 ">Email Address</label>
                <input v-model="credentials.email" type="email" name="email" id="email" placeholder="example@example.com"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 placeholder:text-sm bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  :class="{ 'border-red-500 focus:border-red-500': v$.email.$error, 'border-[#42d392] ': !v$.email.$invalid, }"
                  @change="v$.email.$touch" />
                <span class="text-xs text-red-500" v-if="v$.email.$error">
                  {{ v$.email.$errors[0].$message }}
                </span>
              </div>

              <div>
                <div class="flex justify-between mb-2">
                  <label for="password" class="text-sm text-gray-600 ">Password</label>
                  <!-- <a href="#" class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot
                    password?</a> -->
                </div>

                <input v-model="credentials.password" type="password" name="password" id="password"
                  placeholder="Your Password"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 placeholder:text-sm bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  :class="{ 'border-red-500 focus:border-red-500': v$.password.$error, 'border-[#42d392] ': !v$.password.$invalid, }"
                  @change="v$.password.$touch" />
                <span class="text-xs text-red-500" v-if="v$.password.$error">
                  {{ v$.password.$errors[0].$message }}
                </span>
              </div>

              <div>
                <div class="flex justify-between mb-2">
                  <label for="password" class="text-sm text-gray-600 ">Confirm Password</label>
                  <!-- <a href="#" class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot
                    password?</a> -->
                </div>

                <input v-model="credentials.confirmPassword" type="password" name="password" id="password"
                  placeholder="Repeat the password above"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 placeholder:text-sm bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  :class="{ 'border-red-500 focus:border-red-500': v$.confirmPassword.$error, 'border-[#42d392] ': !v$.confirmPassword.$invalid, }"
                  @change="v$.confirmPassword.$touch" />
                <span class="text-xs text-red-500" v-if="v$.confirmPassword.$error">
                  {{ v$.confirmPassword.$errors[0].$message }}
                </span>
              </div>

              <div>
                <button
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  @click.prevent="signUp">
                  Register
                </button>
              </div>

            </form>

            <p class="mt-6 text-sm text-center text-gray-400">Do you have an account? <NuxtLink to="/signin"
                class="text-blue-500 focus:outline-none focus:underline hover:underline">Sign in
              </NuxtLink>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
