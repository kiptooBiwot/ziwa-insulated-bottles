<script setup>
import logo from '~/assets/images/logo/ziwa_logo1.png'
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { v4 as uuidv4 } from 'uuid'
import { client, account } from '~/utils/utils'
import { useToastStore } from '~/stores/toast'

definePageMeta({
  layout: 'auth',
})

const router = useRouter()
const toast = useToastStore()

const signUp = async () => {
  try {
    v$.value.$validate()
    if (!v$.value.$error) {
      const newUser = await account.create(
        uuidv4(),
        credentials.email,
        credentials.password,
        credentials.name
      )

      if (newUser) {
        toast.add({
          type: 'success',
          message: 'Your account was created successfully. Log in to proceed.',
          timeout: 5000,
        })

        router.push('/signin')
      }
      // Handle responses success and failure
    }
  } catch (error) {
    toast.add({
      type: 'error',
      message: error,
      timeout: 5000,
    })
  }
}

const credentials = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
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
      required: helpers.withMessage(
        'The password confirmation field is required',
        required
      ),
      sameAs: helpers.withMessage(
        "Passwords don't match. Please try again.",
        sameAs(credentials.password)
      ),
    },
  }
})

const v$ = useVuelidate(rules, credentials)
</script>

<template>
  <!-- component -->
  <div class="bg-white">
    <div class="flex justify-center h-screen">
      <div
        class="hidden bg-cover lg:block lg:w-2/3"
        style="
          background-image: url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
        "
      >
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-white">
              Ziwa Insulated Bottles
            </h2>

            <p class="max-w-xl mt-3 text-gray-300">
              Please register to create an account. This is for authorized users
              only.
            </p>
          </div>
        </div>
      </div>

      <div
        class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 overflow-x-hidden overflow-scroll"
      >
        <div class="flex-1">
          <div class="text-center">
            <div class="py-4 w-28 bg-[#395A9F] shadow-md rounded-md mx-auto">
              <img :src="logo" alt="" class="w-14 h-auto mx-auto" />
            </div>
            <!-- <h2 class="text-4xl font-bold text-center text-gray-700 ">Brand</h2> -->

            <!-- <p class="mt-3 text-gray-500">Sign up to create an account</p> -->
          </div>

          <div class="space-y-10">
            <img src="/images/not-found.svg" alt="" class="w-full" />
            <h3
              class="text-center font-semibold font-display text-xl text-[#395A9F]"
            >
              Oops! Not Found
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
