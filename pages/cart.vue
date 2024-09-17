<script setup>
// import { useDeliveryStore } from '@/stores/delivery'
import { useProductStore } from '@/stores/product'
import notFound from '@/assets/images/feeling_blue.svg'
import mpesa from '@/assets/images/lipa-na-mpesa.png'
import { useCouponStore } from '@/stores/coupons'
import { useDeliveryStore } from '@/stores/delivery'
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/stores/toast'
import { useVuelidate } from '@vuelidate/core'
import { required, email, alpha, numeric, helpers } from '@vuelidate/validators'

const productStore = useProductStore()
const deliveryStore = useDeliveryStore()
const couponStore = useCouponStore()
const { validatedCoupon } = storeToRefs(couponStore)
const toast = useToastStore()

const isHover = ref(false)
const isSelected = ref(false)
const showMpesaModal = ref(false)
const couponCode = ref('')

// Calculate delivery fee
const ctyRoute = ref('')
const ctyEstate = ref('')
const cityRoute = ref([])
const estate = ref([])
const deliveryCost = ref(0)

const formData = ref({
  ctyRoute: '',
  ctyEstate: '',
  // cityRoute: '',
  // estate: '',
  // deliveryCost: '',
})

const rules = computed(() => {
  return {
    // formData: {
    ctyRoute: {
      required: helpers.withMessage(
        ' Your route or town is required.',
        required
      ),
    },
    ctyEstate: {
      required: helpers.withMessage(
        'Your estate or town is required.',
        required
      ),
    },
    // },
  }
})

const v$ = useVuelidate(rules, formData)

let productPriceComputed = computed(() => {
  let total = 0

  productStore.cart.forEach((product) => {
    total += product.value.cumulativeCost
  })

  return total
})

watch(validatedCoupon, () => {
  getDiscountedCouponPrice
  totalPriceComputed
})

const getDiscountedCouponPrice = computed(() => {
  let total = 0

  if (couponStore?.validatedCoupon?.discount) {
    if (couponStore.validatedCoupon.discountType == 'percentage') {
      total =
        productPriceComputed.value -
        (productPriceComputed.value * couponStore.validatedCoupon.discount) /
          100
    } else if (couponStore?.validatedCoupon?.discountType == 'fixed') {
      total =
        productPriceComputed.value - couponStore?.validatedCoupon?.discount
    }
  }

  return total
})

const totalPriceComputed = computed(() => {
  let total = 0
  if (productStore.deliveryCost > 0) {
    if (couponStore?.validatedCoupon?.discount) {
      total = getDiscountedCouponPrice.value + productStore.deliveryCost
    } else {
      total = productPriceComputed.value + productStore.deliveryCost
    }
  }

  return total
})

// Populate Estate Dropdown
const getEstate = (ctyRoute) => {
  // Reset cityRoute array
  // cityRoute.value = []
  productStore.deliveryRoute = []

  if (ctyRoute) {
    deliveryStore.route.find((item) => {
      if (item.name === ctyRoute) {
        return (productStore.deliveryRoute = item)
        // return cityRoute.value = item
      }
    })
  }
}

const setDeliveryFees = (ctyEstate) => {
  if (ctyEstate) {
    productStore.deliveryRoute.estate.find((item) => {
      if (item.estateName === ctyEstate) {
        productStore.deliveryLocation = ctyEstate
        return (productStore.deliveryCost = item.cost)

        // return productStore.deliveryCost
        // return productStore.deliveryCost = item.cost
      }
    })
  }
}

const removeDeliveryFees = () => {
  if (productStore.deliveryCost > 0) {
    productStore.deliveryCost = 0
    // ctyEstate.value = ''
    // ctyRoute.value = ''
    formData.value.ctyEstate = ''
    formData.value.ctyRoute = ''
  }
}

const goToCheckout = () => {
  v$.value.$validate()

  if (!v$.value.$error) {
    if (productStore.cart.length > 0) {
      return navigateTo('/checkout')
    }
  }
}

const applyCoupon = async () => {
  try {
    if (couponCode.value) {
      const response = await couponStore.applyCoupon(couponCode.value)

      // console.log(response.statusCode)

      if (response.statusCode !== 400) {
        toast.add({
          type: 'success',
          message: 'Your Coupon code is valid. The discount has been applied.',
          timeout: 5000,
        })
      } else {
        toast.add({
          type: 'error',
          message: "The entered coupon either doesn't exist or is expired!",
          timeout: 5000,
        })
      }
    }
  } catch (error) {
    console.log(error)
    // Coupon not found or expired
    toast.add({
      type: 'error',
      message: error,
      timeout: 5000,
    })
  }
}
</script>

<template>
  <div class="w-full relative">
    <div class="absolute inset-0 bg-gray-50 -z-10"></div>
    <div class="max-w-6xl mx-auto pt-10 py-20 -z-10">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-semibold mb-4">
          Shopping Cart({{ productStore.cart.length }})
        </h1>
        <div
          v-if="productStore.cart.length > 0"
          class="md:flex gap-4 justify-between mx-auto w-full"
        >
          <div class="md:w-[65%]">
            <div class="bg-white rounded-lg p-1">
              <NuxtLink
                :to="`/item/${productStore?.product?.slug}`"
                class="underlined text-blue-500"
              >
                Add another bottle to cart
              </NuxtLink>
            </div>

            <div id="Items" class="bg-white rounded-lg shadow-sm p-4 mt-0">
              <div v-for="(product, index) in productStore.cart" :key="index">
                <!-- :selectArray='selectedArray' @selectedRadio='selectedRadioFunc' -->
                <CartItem :product="product" :index="index" />
              </div>
            </div>
          </div>

          <div class="md:hidden block my-4" />

          <div class="md:w-[35%]">
            <div id="summary" class="bg-white rounded-lg p-4">
              <!-- TODO:  add options for persons who don't need delivery services-->

              <div class="py-7">
                <h3 class="font-bold py-2 text-lg text-gray-600">
                  Delivery Fees Calculator
                </h3>
                <div
                  class="flex flex-col md:space-y-0 border rounded-md w-full gap-5 p-4 space-y-2"
                >
                  <div class="grid space-y-1">
                    <label for="" class="text-xs"
                      >Select your Route if around Nairobi or Upcountry</label
                    >
                    <select
                      v-model="formData.ctyRoute"
                      @change="getEstate(formData.ctyRoute)"
                      name=""
                      id=""
                      class="py-2 px-4 text-sm border placeholder:text-sm bg-white rounded-md"
                      :class="{
                        'border-red-500 focus:border-red-500':
                          v$.ctyRoute.$error,
                        'border-[#42d392] ': !v$.ctyRoute.$invalid,
                      }"
                    >
                      <option value="" disabled selected>
                        Select your delivery route/estate or Town
                      </option>
                      <option
                        :value="route.name"
                        v-for="(route, index) in deliveryStore.route"
                        :key="index"
                      >
                        {{ route.name }}
                      </option>
                    </select>
                    <div>
                      <span
                        class="text-xs text-red-500"
                        v-if="v$.ctyRoute.$error"
                      >
                        <!-- This field is required -->
                        {{ v$.ctyRoute.$errors[0].$message }}
                      </span>
                    </div>
                    <!-- @change="v$.firstName.$touch" -->
                  </div>
                  <div class="grid space-y-1">
                    <label for="" class="text-xs">Select your estate</label>
                    <select
                      v-model="formData.ctyEstate"
                      name=""
                      id=""
                      class="py-2 px-4 text-sm border bg-white placeholder:text-sm rounded-md"
                      @change="setDeliveryFees(formData.ctyEstate)"
                      :class="{
                        'border-red-500 focus:border-red-500':
                          v$.ctyEstate.$error,
                        'border-[#42d392] ': !v$.ctyEstate.$invalid,
                      }"
                    >
                      <option value="" disabled selected>
                        Select your estate
                      </option>
                      <option
                        :value="estate.estateName"
                        v-for="(estate, i) in productStore.deliveryRoute.estate"
                        :key="i"
                      >
                        {{ estate.estateName }}
                      </option>
                    </select>
                    <div>
                      <span
                        class="text-xs text-red-500"
                        v-if="v$.ctyEstate.$error"
                      >
                        <!-- This field is required -->
                        {{ v$.ctyEstate.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    productStore.deliveryLocation &&
                    productStore.deliveryCost > 0
                  "
                  class="flex justify-center items-center"
                >
                  <div>
                    <p class="text-sm mt-4">
                      The delivery fees to
                      <span class="font-semibold text-rose-500">
                        {{ productStore.deliveryRoute.name }}
                        -
                        {{ productStore.deliveryLocation }}
                      </span>
                      is
                      <span class="font-bold text-rose-500">{{
                        useCurrencyFormatter(productStore.deliveryCost)
                      }}</span>
                    </p>
                  </div>
                  <div>
                    <button
                      class="bg-orange-500 py-1 px-1 text-white text-xs rounded shadow-md hover:bg-orange-400 hover:shadow-lg transition duration-300 ease-in-out"
                      @click.prevent="removeDeliveryFees"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <hr class="pb-4" />
              <div class="text-2xl font-extrabold mb-2">Summary</div>
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
                <!-- v-if="couponStore?.validatedCoupon?.discount" -->
                <div class="flex items-center justify-between">
                  <div
                    class="font-medium text-sm"
                    :class="[
                      couponStore?.validatedCoupon?.discount
                        ? 'line-through text-rose-500'
                        : '',
                    ]"
                  >
                    Cumulative water bottle cost
                  </div>
                  <div class="text-xl font-semibold">
                    <span
                      class="font-semibold text-sm"
                      :class="[
                        couponStore?.validatedCoupon?.discount
                          ? 'line-through text-rose-500'
                          : '',
                      ]"
                      >{{ useCurrencyFormatter(productPriceComputed) }}</span
                    >
                  </div>
                </div>
                <div
                  class="flex items-center justify-between"
                  :class="[
                    couponStore?.validatedCoupon?.discount ? 'block' : 'hidden',
                  ]"
                >
                  <div class="font-medium text-sm">
                    Discounted by coupon cost
                  </div>
                  <div class="text-xl font-semibold">
                    <span class="font-semibold text-sm">{{
                      useCurrencyFormatter(getDiscountedCouponPrice)
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
              <hr class="my-4" />
              <!-- v-model="couponCode" -->
              <div class="block flex-1">
                <label for="" class="text-xs">Enter your coupon code</label>
                <div class="flex gap-4">
                  <input
                    v-model.trim="couponCode"
                    placeholder="Enter coupon code"
                    class="flex-1 py-2 px-4 text-sm border placeholder:text-sm bg-white rounded-md"
                  />
                  <button
                    @click="applyCoupon"
                    class="bg-yellow-500 text-white hover:bg-yellow-400 hover:text-yellow-100 text-xs uppercase px-2 py-0 rounded-md shadow-sm"
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
              <!-- <p v-if="discount">Discount applied: {{ discountValue }}</p> -->

              <button
                @click="goToCheckout"
                class="flex items-center justify-center bg-green-500 w-full text-white text-[16px] font-semibold p-3 rounded-md shadow-sm mt-4"
              >
                Checkout
              </button>
            </div>

            <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
              <div class="text-lg font-semibold mb-2">
                Available Payment methods
              </div>
              <!-- <p class="text-sm">Payment methods to be added soon.</p> -->
              <div class="flex items-center justify-start gap-8 my-1">
                <!-- <div v-for="card in cards" :key=card> -->
                <img :src="mpesa" class="h-20 w-auto shadow-sm" alt="" />
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="w-full h-auto flex items-center justify-center">
            <div class="flex-col gap-10">
              <img
                :src="notFound"
                alt=""
                class="w-[400px] mx-auto h-auto object-cover"
              />
              <h1 class="text-2xl mt-10 text-center font-medium text-gray-800">
                Your cart is empty!
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <Teleport to="body"> -->
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
    <!-- </Teleport> -->
  </div>
</template>

<style scoped></style>
