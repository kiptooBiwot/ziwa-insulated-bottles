<script setup>
import logo from '~/assets/images/logo/ziwa_logo1.png'
import bg from '~/assets/images/MOK_4902.jpg'
import { required, email, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { client, account } from '~/utils/utils'
import { useUserStore } from '~/stores/user'
// import { sd } from 'appwrite'

definePageMeta({
  layout: 'auth',
})

const router = useRouter()

const userStore = useUserStore()

const credentials = reactive({
  email: '',
  password: '',
})

const signIn = async () => {
  v$.value.$validate()

  if (!v$.value.$error) {
    try {
      // await account.deleteSession('current')

      const response = await account.createEmailSession(
        credentials.email,
        credentials.password
      )

      if (response) {
        // Set the user id as a token to manage authentication
        const token = useCookie('token')

        token.value = response?.userId

        // set a flag in user store to indicate authentication
        userStore.authenticated = true

        const user = await account.get()
        // console.log('User:', user);

        userStore.user = user

        router.push('/dashboard/')
      }
    } catch (error) {
      console.log('ERROR!', error)
      // console.log(error.$message)
    }
  }
}

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(
        'A registered email is required to sign in',
        required
      ),
      email: helpers.withMessage(
        'The email entered is not a valid email',
        email
      ),
    },
    password: {
      required: helpers.withMessage(
        'A password is required to sign in',
        required
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
              Administrator sign in page. Sign in to manage orders and manage
              inventory.
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="text-center">
            <div class="py-4 w-28 bg-[#395A9F] shadow-md rounded-md mx-auto">
              <img :src="logo" alt="" class="w-14 h-auto mx-auto" />
            </div>
            <!-- <h2 class="text-4xl font-bold text-center text-gray-700 ">Brand</h2> -->

            <p class="mt-3 text-gray-500">Sign in to access your account</p>
          </div>

          <div class="mt-8">
            <form>
              <div>
                <label for="email" class="block mb-2 text-sm text-gray-600"
                  >Email Address</label
                >
                <input
                  v-model="credentials.email"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  :class="{
                    'border-red-500 focus:border-red-500': v$.email.$error,
                    'border-[#42d392] ': !v$.email.$invalid,
                  }"
                  @change="v$.email.$touch"
                />
                <span class="text-xs text-red-500" v-if="v$.email.$error">
                  {{ v$.email.$errors[0].$message }}
                </span>
              </div>

              <div class="mt-6">
                <div class="flex justify-between mb-2">
                  <label for="password" class="text-sm text-gray-600"
                    >Password</label
                  >
                  <a
                    href="#"
                    class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                    >Forgot password?</a
                  >
                </div>

                <input
                  v-model="credentials.password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  :class="{
                    'border-red-500 focus:border-red-500': v$.password.$error,
                    'border-[#42d392] ': !v$.password.$invalid,
                  }"
                  @change="v$.password.$touch"
                />
                <span class="text-xs text-red-500" v-if="v$.password.$error">
                  {{ v$.password.$errors[0].$message }}
                </span>
              </div>

              <div class="mt-6">
                <button
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  @click.prevent="signIn"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p class="mt-6 text-sm text-center text-gray-400">
              Don&#x27;t have an account yet?
              <NuxtLink
                to="/signin"
                class="text-blue-500 focus:outline-none focus:underline hover:underline"
                >Sign up </NuxtLink
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
