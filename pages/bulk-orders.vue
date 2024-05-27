<script setup>
import { required, email, alpha, numeric, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const formData = reactive({
  fullName: '',
  email: '',
  phoneNumber: '',
  company: '',
  typeOfDrinkware: '',
  quantity: 0,
  preferredColors: '',
  customizationDetails: '',
  address: '',
  preferredDeliveryDate: '',
  additionalNotes: '',
})

const isDisabled = ref(false)
const errors = ref(false)
const success = ref(false)
const waiting = ref(false)

const rules = computed(() => {
  return {
    fullName: {
      required: helpers.withMessage('Your full name is required', required),
    },
    email: {
      required: helpers.withMessage('This email field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
    phoneNumber: {
      required: helpers.withMessage('A phone number is required', required),
      numeric: helpers.withMessage(
        'A phone number can only have numbers.',
        numeric
      ),
    },
    typeOfDrinkware: {
      required: helpers.withMessage(
        'The type of drinkware you want is required',
        required
      ),
    },
    quantity: {
      required: helpers.withMessage(
        'Please enter the quantity of products you want to order',
        required
      ),
    },
    preferredColors: {
      required: helpers.withMessage('Enter the colors you want', required),
    },
    customizationDetails: {
      required: helpers.withMessage(
        'How do you want your drinkware to be customized?',
        required
      ),
    },
    address: {
      required: helpers.withMessage(
        'We need to know the delivery address of your order',
        required
      ),
    },
  }
})

const v$ = useVuelidate(rules, formData)

const submit = async () => {
  try {
    v$.value.$validate()

    if (!v$.value.$error) {

            // After order is saved, send and email to the admin of the order
            if (!v$.value.$error) {
              const result = await $fetch('/api/contac', {
                method: 'POST',
                body: {
                  formData: formData.value,
                  order: resp,
                  paymentDetails: productStore.paymentDetails,
                },
              })

              toast.add({
              type: 'success',
              message: 'Your order is being processed.',
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

              // }
            }
          }
    }
   catch (error) {
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
</script>

<template>
  <div class="w-full">
    <div class="w-full py-10 bg-blue-200">
      <h2 class="text-center text-white font-display font-bold text-3xl">
        Bulk Orders
      </h2>
    </div>
    <div class="max-w-3xl mx-5 lg:mx-auto py-10 space-y-5">
      <p class="leading-7">
        Welcome to Ziwa's Bulk Custom Orders page! Whether it's a corporate
        event, wedding, promotional giveaway, or stocking up for your store,
        we're here to help with our premium, customizable drinkware. Let's make
        your event or brand stand out!
      </p>

      <h2 class="font-bold text-xl font-display">Why Choose Ziwa?</h2>
      <ul class="list-disc space-y-3 ml-3 md:ml-10">
        <li>
          <span class="font-bold font-display">Top-Notch Quality:</span>
          Durable and stylish drinkware.
        </li>
        <li>
          <span class="font-bold font-display">Custom Designs:</span>
          Add your logo, design, or message.
        </li>
        <li>
          <span class="font-bold font-display">Eco-Friendly:</span>
          Perfect for sustainable brands.
        </li>
        <li>
          <span class="font-bold font-display">Great Discounts:</span>
          Awesome prices on bulk orders.
        </li>
      </ul>

      <h2 class="font-bold text-xl font-display">How It Works</h2>

      <ul class="list-disc space-y-3 ml-3 md:ml-10">
        <li>
          <span class="font-bold font-display">Reach Out:</span> Fill out the
          form below with your details.
        </li>
        <li>
          <span class="font-bold font-display">Design Chat:</span> We’ll help
          finalize your custom designs.
        </li>
        <li>
          <span class="font-bold font-display">Quote & Approve:</span> Get a
          quote and approve it to start production.
        </li>
        <li>
          <span class="font-bold font-display">Production & Delivery:</span>
          We’ll produce and deliver your custom drinkware.
        </li>
      </ul>
      <h2 class="font-bold text-xl font-display">What We Need</h2>
      <h4 class="font-bold">Help us get it right by providing:</h4>
      <ol class="list-decimal space-y-3 ml-3 md:ml-10">
        <li>
          <span class="font-bold font-display">Contact Info:</span> Your name,
          email, and phone number.
        </li>
        <li>
          <span class="font-bold font-display">Company:</span> Name of your
          company or organization.
        </li>
        <li>
          <span class="font-bold font-display">Order Details:</span> Type of
          drinkware (e.g., 750ml Bottle, 1L Bottle, etc.).
        </li>
        <li>Quantity needed.</li>
        <li>Preferred colors and designs.</li>
        <li>
          <span class="font-bold font-display">Customization:</span> Upload your
          logo/design files and specify details.
        </li>
        <li>
          <span class="font-bold font-display">Delivery:</span> Shipping address
          and preferred delivery date.
        </li>
        <li>
          <span class="font-bold font-display">Extras:</span> Any other requests
          or notes.
        </li>
      </ol>

      <p class="leading-7">
        Ready to Start? Fill out the form below or contact us directly at
        [email@example.com] or [phone number]. We can't wait to help you create
        something amazing!
      </p>

      <div class="">
        <form
          @submit.prevent="submit(form)"
          class="order-last md:order-first flex flex-col col-span-12 md:col-span-7 border space-y-5 px-5 py-5 rounded-md border-gray-400 text-gray-800"
        >
          <p class="text-sm pt-2">
            Please fill the form below accurately to make your bulk order. Thank
            you.
          </p>
          <hr />
          <div class="md:flex w-full space-y-2 md:gap-5">
            <div class="w-full space-y-2">
              <label for="firstName" class="text-xs">Full Name</label>
              <input
                v-model="formData.fullName"
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                class="py-2 px-4 border border-gray-400 rounded-md placeholder:text-sm w-full"
                :class="{
                  'border-red-500 focus:border-red-500': v$.fullName.$error,
                  'border-[#42d392] ': !v$.fullName.$invalid,
                }"
                @change="v$.fullName.$touch"
              />
              <div>
                <span class="text-xs text-red-500" v-if="v$.fullName.$error">{{
                  v$.fullName.$errors[0].$message
                }}</span>
              </div>
            </div>
          </div>
          <div class="w-full space-y-5">
            <div class="grid w-full space-y-2">
              <label for="email" class="text-xs">Email Address</label>
              <input
                v-model="formData.email"
                id="lastName"
                type="text"
                placeholder="Enter your email address"
                class="py-2 px-4 border border-gray-400 rounded-md placeholder:text-sm"
                :class="{
                  'border-red-500 focus:border-red-500': v$.email.$error,
                  'border-[#42d392] ': !v$.email.$invalid,
                }"
                @change="v$.email.$touch"
              />
              <div>
                <span class="text-xs text-red-500" v-if="v$.email.$error">{{
                  v$.email.$errors[0].$message
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
                class="py-2 px-4 border border-gray-400 rounded-md placeholder:text-sm"
                :class="{
                  'border-red-500 focus:border-red-500': v$.phoneNumber.$error,
                  'border-[#42d392] ': !v$.email.$invalid,
                }"
                @change="v$.phoneNumber.$touch"
              />
              <div>
                <span
                  class="text-xs text-red-500"
                  v-if="v$.phoneNumber.$error"
                  >{{ v$.phoneNumber.$errors[0].$message }}</span
                >
              </div>
            </div>
            <div class="grid w-full space-y-2">
              <label for="company" class="text-xs">Company/Organization</label>
              <input
                v-model="formData.company"
                id="company"
                type="text"
                placeholder="Enter your company or organization"
                class="py-2 px-4 border border-gray-400 rounded-md placeholder:text-sm"
              />
              <!-- :class="{
                  'border-red-500 focus:border-red-500': v$.company.$error,
                  'border-[#42d392] ': !v$.company.$invalid,
                }"
                @change="v$.company.$touch" -->
              <div>
                <!-- <span class="text-xs text-red-500" v-if="v$.company.$error">{{
                  v$.company.$errors[0].$message
                }}</span> -->
              </div>
            </div>
            <div class="grid w-full space-y-2">
              <label for="drinkware" class="text-xs">Type of Drinkware</label>
              <input
                v-model="formData.typeOfDrinkware"
                id="drinkware"
                type="text"
                placeholder="Enter the drinkware you want to order"
                class="py-2 px-4 border border-gray-400 rounded-md placeholder:text-sm"
                :class="{
                  'border-red-500 focus:border-red-500':
                    v$.typeOfDrinkware.$error,
                  'border-[#42d392] ': !v$.typeOfDrinkware.$invalid,
                }"
                @change="v$.typeOfDrinkware.$touch"
              />
              <div>
                <span
                  class="text-xs text-red-500"
                  v-if="v$.typeOfDrinkware.$error"
                  >{{ v$.typeOfDrinkware.$errors[0].$message }}</span
                >
              </div>
            </div>
            <div class="grid w-full space-y-2">
              <label for="quantity" class="text-xs">Quantity</label>
              <input
                v-model="formData.quantity"
                id="quantity"
                type="number"
                placeholder=""
                class="py-2 px-4 border border-gray-400 rounded-md placeholder:text-sm"
                :class="{
                  'border-red-500 focus:border-red-500': v$.quantity.$error,
                  'border-[#42d392] ': !v$.quantity.$invalid,
                }"
                @change="v$.quantity.$touch"
              />
              <div>
                <span class="text-xs text-red-500" v-if="v$.quantity.$error">{{
                  v$.quantity.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="grid w-full space-y-2">
              <label for="colors" class="text-xs">Your Preferred Colors</label>
              <input
                v-model="formData.preferredColors"
                id="colors"
                type="text"
                placeholder="Colors e.g 1 black, 4 Green, 10 gray"
                class="py-2 px-4 border border-gray-400 rounded-md placeholder:text-sm"
                :class="{
                  'border-red-500 focus:border-red-500':
                    v$.preferredColors.$error,
                  'border-[#42d392] ': !v$.preferredColors.$invalid,
                }"
                @change="v$.preferredColors.$touch"
              />
              <div>
                <span
                  class="text-xs text-red-500"
                  v-if="v$.preferredColors.$error"
                  >{{ v$.preferredColors.$errors[0].$message }}</span
                >
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
                class="py-2 px-4 border border-gray-400 rounded-md placeholder:text-sm flex-1"
                :class="{
                  'border-red-500 focus:border-red-500': v$.address.$error,
                  'border-[#42d392] ': !v$.address.$invalid,
                }"
                @change="v$.address.$touch"
              ></textarea>
              <div>
                <span class="text-xs text-red-500" v-if="v$.address.$error">{{
                  v$.address.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="grid w-full space-y-2">
              <label for="details" class="text-xs">Customization Details</label>
              <textarea
                v-model="formData.customizationDetails"
                name="details"
                id=""
                cols="30"
                rows="2"
                placeholder="Type in any additional message or specific instructions you may have"
                class="py-2 px-4 border border-gray-400 rounded-md placeholder:text-sm"
              ></textarea>
            </div>
            <div class="grid w-full space-y-2">
              <label for="date" class="text-xs"
                >Your Preferred Delivery Date</label
              >
              <input
                v-model="formData.preferredDeliveryDate"
                name="date"
                id=""
                type="date"
                placeholder="Type in any additional message or specific instructions you may have"
                class="py-2 px-4 border border-gray-400 rounded-md placeholder:text-sm"
              />
            </div>

            <div class="grid w-full space-y-2">
              <label for="notes" class="text-xs"
                >Additional Notes (Optional)</label
              >
              <textarea
                v-model="formData.additionalNotes"
                name="notes"
                id=""
                cols="30"
                rows="2"
                placeholder="Type in any additional message or specific instructions you may have"
                class="py-2 px-4 border border-gray-400 rounded-md placeholder:text-sm"
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full py-2 px-auto bg-green-500 shadow-md text-white rounded-md hover:bg-green-600 hover:text-gray-100 hover:shadow-lg"
              :disabled="isDisabled"
            >
              <span v-if="!waiting">Make Order</span>
              <span v-else>Processing...</span>
            </button>
          </div>

          <p v-if="errors">
            🔥 Your order was not processed. Kindly try again.
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
