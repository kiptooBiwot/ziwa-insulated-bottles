<script setup>

import { useProductStore } from '@/stores/product'
import notFound from '@/assets/images/feeling_blue.svg'

const productStore = useProductStore()

const isHover = ref(false)
const isSelected = ref(false)


</script>

<template>
  <div class="w-full">
    <div class="max-w-6xl mx-auto mt-[75px] py-20">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-semibold mb-4">Shopping Cart({{ productStore.cart.length }})</h1>
        <div v-if="productStore.cart.length > 0" class="md:flex gap-4 justify-between mx-auto w-full">
          <div class="md:w-[65%]">
            <div class="bg-white rounded-lg p-1">
              <NuxtLink to="/item/ziwa-insulatecd-water-bottle" class="underlined text-blue-500">
                Add another bottle to cart
              </NuxtLink>
            </div>

            <div id="Items" class="bg-white rounded-lg shadow-sm p-4 mt-0">
              <div v-for="product in productStore.cart" :key="product.id">
                <!-- :selectArray='selectedArray' -->
                <CartItem :product='product' @selectedRadio='selectedRadioFunc' />
              </div>
            </div>
          </div>

          <div class="md:hidden block my-4" />

          <div class="md:w-[35%]">
            <div id="summary" class="bg-white rounded-lg p-4">
              <div class="text-2xl font-extrabold mb-2">Summary</div>
              <div class="flex items-center justify-between my-4">
                <div class="font-semibold">Total</div>
                <div class="text-2xl font-semibold">
                  Ksh.<span class="font-extrabold">{{ totalPriceComputed }}</span>
                </div>
              </div>

              <button @click="goToCheckout"
                class="flex items-center justify-center bg-[#fd374f] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4">
                Checkout
              </button>
            </div>

            <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
              <div class="text-lg font-semibold mb-2">Payment methods</div>
              <div class="flex items-center justify-start gap-8 my-4">
                <div v-for="card in cards" :key=card>
                  <img :src="card" class="h-6" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="w-full h-auto flex items-center justify-center">
            <div class="flex-col gap-10">
              <img :src="notFound" alt="" class="w-[400px] mx-auto h-auto object-cover">
              <h1 class="text-2xl mt-10 text-center font-medium text-gray-800">Your cart is empty!</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped></style>