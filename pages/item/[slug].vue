<script setup>
import { useProductStore } from '@/stores/product'
import { useDeliveryStore } from '@/stores/delivery'
import bottle from '~/assets/images/products/bottle1-bg.png'
import bottle2 from '~/assets/images/products/bottle2-bg.png'
import bottle3 from '~/assets/images/products/bottle3-bg.png'
import bottle4 from '~/assets/images/products/bottle4-bg.png'
import bottle5 from '~/assets/images/products/bottle5-bg.png'
import bottle6 from '~/assets/images/products/bottle6-bg.png'
import bottle7 from '~/assets/images/products/bottle7-bg.png'
import bottle8 from '~/assets/images/products/bottle8-bg.png'

const productStore = useProductStore()
const deliveryStore = useDeliveryStore()
const route = useRoute()
// const { currencyFormatter } = useCurrencyFormatter()

const props = defineProps(['image'])

const currentImage = ref('')
const currentBottleColor = ref('')
const customizeBottle = ref(false)

// Calculate delivery fee
const ctyRoute = ref('')
const ctyEstate = ref('')
const cityRoute = ref([])
const estate = ref([])
const deliveryCost = ref(null)
const selectedFont = ref('')
const customName = ref('')

const images = [
  bottle,
  bottle2,
  bottle3,
  bottle4,
  bottle5,
  bottle6,
  bottle7,
  bottle8
]

const bottleColor = [
  '#204E4C',
  '#4C617C',
  '#820B21',
  '#92BCCA',
  '#001D49',
  '#01061A',
  '#A03503',
  '#8A5866',
]
onMounted(() => {
  productStore.getSingleProduct(route.params.slug)
  // changeImage
  currentImage.value = productStore.product.images[2].url
  currentBottleColor.value = productStore.product.images[2].color
})


const priceComputed = computed(() => {
  if (productStore.product.price) {
    return productStore.product.price
  }
  return '0.00'
})

const showImageWithColor = (color) => {

  const productColors = productStore.product.images

  productColors.find((product) => {
    if (product.bottleColor === color) {
      currentBottleColor.value = product.color
      return currentImage.value = product.url
    }
  })
}

// Populate Estate Dropdown
const getEstate = (ctyRoute) => {
  // Reset cityRoute array
  cityRoute.value = []

  if (ctyRoute) {
    deliveryStore.route.find((item) => {
      if (item.name === ctyRoute) {
        return cityRoute.value = item
      }
    })
  }
}

const setDeliveryFees = (ctyEstate) => {
  if (ctyEstate) {
    cityRoute.value.estate.find((item) => {
      if (item.estateName === ctyEstate) {
        return deliveryCost.value = item.cost
      }
    })
  }
}


const closeModal = () => {
  return customizeBottle.value = !customizeBottle.value
}

const selectedProduct = ref({})

const addToCart = () => {
  selectedProduct.value = {
    title: productStore.product.title,
    price: productStore.product.price,
    capacity: productStore.product.capacity,
    currentImage: currentImage.value,
    currentBottleColor: currentBottleColor.value,
    ctyRoute: ctyRoute.value,
    ctyEstate: ctyEstate.value,
    deliveryCost: deliveryCost.value,
    selectedFont: productStore.selectedFont,
    customName: productStore.customName,
    customizationFee: productStore.customizationFee,
    productId: productStore.product.productId
  }

  productStore.cart.push(selectedProduct)
  navigateTo('/cart')
}

const isInCart = computed(() => {
  let res = false
  productStore.cart.forEach(prod => {
    if (prod.productId === selectedProduct.productId) {
      res = true
    }
  })
  return res
})

</script>

<template>
  <div class="relative py-36 md:py-40">
    <div class="max-w-6xl mx-auto px-5 xl:px-0">
      <h2 class="text-gray-900 font-semibold text-3xl md:text-4xl pb-5">Product Details
      </h2>
      <div v-if="productStore.product" class="md:flex gap-10 justify-between mx-auto w-full">
        <div class="md:w-[40%] mb-7 md:mb-0">

          <div
            class="flex-shrink-0 md:m-6 relative overflow-hidden bg-[#89CFF0] rounded-xl max-w-sm shadow-lg w-full pb-10">
            <!-- [#89CFF0] -->
            <!-- :class="`bg-${product.bgColor}`" -->
            <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
              style="transform: scale(1.5); opacity: 0.1;">
              <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
              <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
            </svg>
            <div class="relative pt-10 px-10 flex items-center justify-center">
              <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                style="background: radial-gradient(black, transparent 60%); transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1); opacity: 0.2;">
              </div>
              <img v-if="currentImage"
                class="relative rounded-lg object-fit w-auto h-[300px] md:h-[400px] mx-auto transition duration-700 ease-in-out"
                :src="currentImage" alt="">
            </div>
          </div>

          <!-- <div class="w-full py-10 bg-[#89CFF0] rounded-xl">
            <img v-if="currentImage" :src="currentImage"
              class="rounded-lg object-fit w-auto h-[300px] md:h-[400px] mx-auto transition duration-700 ease-in-out"
              alt="">
          </div> -->
          <!-- <div v-if="images[0] !== ''" class="flex items-center justify-center mt-2">
            <div v-for="image in images" :key="image">
              <img :src="image" @mouseover="currentImage = image" @click="currentImage = image" width="70"
                class="rounded-md object-fit border-[3px] cursor-pointer transition duration-300 ease-in-out"
                :class="currentImage === image ? 'border-[#39519f]' : ''" alt="">
            </div>
          </div> -->
          <div class="md:hidden">
            <h3 class="text-lg text-gray-800 py-3">Choose the Bottle Color</h3>
            <div class="flex gap-2">
              <div v-for="color in bottleColor" :key="color"
                class="w-9 h-9 rounded-full border-[3px] cursor-pointer transition duration-300 ease-in-out hover:border-[#39519f]"
                :style="{ 'backgroundColor': color }" @mouseover="showImageWithColor(color)"
                @click="showImageWithColor(color)">
              </div>
            </div>
          </div>
        </div>
        <div class="md:w-[60%] space-y-2 text-sm">
          <h2 class="text-gray-900 text-3xl font-semibold">{{ currentBottleColor }} {{ productStore.product.capacity }}
            Water Bottle</h2>
          <hr class="">
          <div v-html="productStore.product.productDescription" class="space-y-3">
          </div>
          <div class="space-y-1">
            <h2 class="text-xl">Features</h2>
            <ul v-for="feature in productStore.product.productFeatures" :key="feature" class="pl-10 text-sm ">
              <div class="flex items-center gap-4 space-y-3">
                <Icon :name="feature.icon" color="" class="w-6 h-6" />
                <li class="flex items-center">{{ feature.description }}</li>
              </div>
            </ul>
          </div>
          <!-- <div v-html="productStore.product.productDesc"></div> -->
          <hr>
          <div class="hidden md:block">
            <h3 class="text-lg text-gray-800 py-3">Choose the Bottle Color</h3>
            <div class="flex gap-2">
              <div v-for="color in bottleColor" :key="color"
                class="w-10 h-10 rounded-full border-[3px] cursor-pointer transition duration-300 ease-in-out hover:border-[#39519f]"
                :style="{ 'backgroundColor': color }" @mouseover="showImageWithColor(color)"
                @click="showImageWithColor(color)">
              </div>
            </div>
          </div>
          <hr class="hidden md:block">
          <div class="space-y-3">
            <div class="flex items-center justify-start gap-2 my-2">
              <h2 class="text-xs text-gray-800">Price:</h2>
              <div class="text-2xl font-semibold text-gray-800">
                {{ useCurrencyFormatter(priceComputed) }}
              </div>
              <!-- <span class="bg-[#f5f5f5] border text-[#c08562] text-[9px] font-semibold px-1.5 rounded-sm">On Offer</span> -->
            </div>
            <hr>
            <h3 class=" font-medium text-lg text-gray-800 ">
              Delivery Fees Calculator
            </h3>
            <div class="block space-y-5 md:space-y-0 md:flex border rounded-sm w-full gap-5 p-4">
              <div class="flex flex-col gap-2 w-full">
                <label>Select your Route</label>
                <select v-model="ctyRoute" @change="getEstate(ctyRoute)" name="" id=""
                  class="py-3 px-4 border placeholder:text-sm  rounded-md">
                  <option value="" disabled selected>Select your delivery route</option>
                  <option :value="route.name" v-for="(route, index) in deliveryStore.route" :key="index">{{ route.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col gap-2 w-full">
                <label for="">Select your estate</label>
                <select v-model="ctyEstate" name="" id="" class="py-3 px-4 border placeholder:text-sm  rounded-md"
                  :class="[!cityRoute ? disabled : '']" @change="setDeliveryFees(ctyEstate)">
                  <option value="" disabled selected>Select your estate</option>
                  <option :value="estate.estateName" v-for="(estate, i) in cityRoute.estate" :key="i">
                    {{ estate.estateName }}
                  </option>
                </select>
              </div>

            </div>
            <p v-if="ctyRoute && ctyEstate" class="font-medium">The delivery fees to {{ ctyRoute }} - {{ ctyEstate }} is
              <span class="text-lg text-red-500">{{
                useCurrencyFormatter(deliveryCost) }}</span>
            </p>
            <!-- <p class="text-[#009a66] text-xs font-semibold pt-1">
            Free shipping
          </p> -->
            <hr>
            <h3 v-if="productStore.customizedBottle" class=" font-medium text-lg text-gray-800 ">
              Your Bottle Customization
            </h3>
            <p v-if="productStore.customizedBottle">The name to be printed will be <span class="text-lg font-medium">{{
              productStore.customName }}</span> and the
              Font selected: <span class="text-lg font-medium">{{
                productStore.selectedFont
              }}</span> </p>
            <hr v-if="productStore.customizedBottle">
            <button @click="customizeBottle = !customizeBottle"
              class="px-6 w-full py-3 text-white text-lg font-semibold shadow-md rounded bg-purple-600">Customize
              your bottle</button>
            <button @click="addToCart"
              class="px-6 w-full py-3  text-white text-lg font-semibold shadow-md rounded bg-green-500">
              <div v-if="isInCart">Add Another Bottle to Cart</div>
              <div v-else>Add to Cart</div>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="w-full">
        <div class="flex items-center justify-center w-full h-full">
          <div class="flex justify-center items-center space-x-1 text-xl text-[#39519f]">

            <svg fill='none' class="w-8 h-8 text-[#39519f] animate-spin" viewBox="0 0 32 32"
              xmlns='http://www.w3.org/2000/svg'>
              <path clip-rule='evenodd'
                d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                fill='currentColor' fill-rule='evenodd' />
            </svg>


            <div>Loading ...</div>
          </div>
        </div>
      </div>
      <div v-if="customizeBottle"
        class="abolute inset-0 overflow-y-auto overflow-x-hidden fixed z-50 flex w-full h-screen items-center justify-center">
        <CustomizeModal @closeModal="closeModal" :bottle="currentBottleColor" :slug="route.params.slug" />
      </div>
      <div v-if="customizeBottle" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>

  </div>
</template>


<style scoped></style>