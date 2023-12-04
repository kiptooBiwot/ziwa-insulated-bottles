<script setup>
import { useProductStore } from '@/stores/product'
import { useDeliveryStore } from '@/stores/delivery'
import { useToastStore } from '@/stores/toast'

const productStore = useProductStore()
const deliveryStore = useDeliveryStore()
const toast = useToastStore()
const route = useRoute()

const currentImage = ref(null)

const currentBottleColor = ref('')
const currentPrice = ref(0)
const currentCapacity = ref('')
const currentColorCode = ref('')

const customizeBottle = ref(false)

// Calculate delivery fee
const ctyRoute = ref('')
const ctyEstate = ref('')
const cityRoute = ref([])
const estate = ref([])
const deliveryCost = ref(0)
const selectedFont = ref('')
const customName = ref('')

const productImg = ref('')
// const v$ = useVuelidate(rules, { ctyRoute, ctyEstate })

// const images = [
//   bottle,
//   bottle2,
//   bottle3,
//   bottle4,
//   bottle5,
//   bottle6,
//   bottle7,
//   bottle8
// ]

const bottleColor = [
  '#1D4D4B',
  '#435A76',
  '#810820', //done
  '#96C0CF',
  '#001541',
  '#000013', //done
  '#A33806',
  '#8D596A',
]

onMounted(() => {
  productStore.getSingleProduct(route.params.slug)

  if (productStore.imageId) {
    const id = productStore.imageId
    // productStore.customName = ''

    productStore.product.images.filter((image) => {
      if (image._id === id) {
        // console.log('IMAGE:', image);
        productStore.selectedProduct = image

        productImg.value = productStore.selectedProduct
        // currentBottleColor.value = image.color
        // currentImage.value = image.url
        // currentPrice.value = image.price
        // currentCapacity.value = image.capacity
      }
    })

    // currentBottleColor.value = img[0].color
    // currentImage.value = img[0].url
    // currentPrice.value = img[0].price
    // currentCapacity.value = img[0].capacity
  }
})
// changeImage


const priceComputed = computed(() => {
  if (productImg.value.price) {
    return productImg.value.price
  }
  return 0.00
})


const showImageWithColor = (color) => {
  const productColors = productStore.product.images

  productColors.find((product) => {
    if (product.colorCode === color) {
      productStore.selectedProduct = product

      productImg.value = productStore.selectedProduct
      // currentBottleColor.value = product.color
      // currentImage.value = product.url
      // currentPrice.value = product.price
      // currentCapacity.value = product.capacity
    }
  })
}




const closeModal = () => {
  return customizeBottle.value = !customizeBottle.value
}

const selectedProduct = ref({})

// console.log('PRICE:', priceComputed.value);
// console.log('Customization fees:', productStore.customizationFee);

const addToCart = () => {
  // v$.value.$validate()

  // if (!v$.value.$error) {
  // let total = productStore.product.price + deliveryCost.value + productStore.customizationFee
  let total = 0
  total = productImg.value.price + productStore.customizationFee

  console.log('TOTAL:', total);

  selectedProduct.value = {
    title: productStore.product.title,
    price: productImg.value.price,
    capacity: productImg.value.capacity,
    currentImage: productImg.value.url,
    currentBottleColor: productImg.value.color,
    // ctyRoute: ctyRoute.value,
    // ctyEstate: ctyEstate.value,x
    // deliveryCost: deliveryCost.value,
    selectedFont: productStore.selectedFont,
    customName: productStore.customName,
    textPosition: productStore.textPosition,
    customizationFee: productStore.customizationFee,
    productId: productStore.product._id,
    cumulativeCost: total
  }

  productStore.cart.push(selectedProduct)

  toast.add({
    type: 'success',
    message: 'Good choice. The product was added to the cart.',
    timeout: 5000
  })

  // Reset customization
  productStore.selectedFont = ''
  productStore.customName = ''
  productStore.textPosition = ''
  productStore.customizationFee = 0
  productStore.customizedBottle = false

  navigateTo('/cart')
}
// }

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
  <div class="relative py-36 md:py-25">
    <div class="max-w-6xl mx-auto px-5 xl:px-0">
      <h2 class="text-gray-900 font-semibold text-3xl md:text-4xl pb-2">Product Details
      </h2>
      <!-- <hr class="md:w-[280px] border-1 border-gray-300"> -->
      <div v-if="productStore.product" class="md:flex gap-10 justify-between mx-auto w-full">
        <div class="md:w-[40%] mb-7 md:mb-0">

          <div
            class="flex-shrink-0 md:m-6 relative overflow-hidden bg-blue-200 rounded-xl max-w-sm shadow-lg w-full pb-10">
            <!-- [#89CFF0] bg-[#89CFF0] -->
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
              <img v-if="productImg.url"
                class="relative rounded-lg object-fit w-auto h-[300px] md:h-[400px] mx-auto transition duration-700 ease-in-out"
                :src="productImg.url" alt="">
            </div>
          </div>
          <div class="md:hidden">
            <h3 class="text-lg text-gray-800 py-3">Choose the Bottle Color</h3>
            <div class="flex gap-2">
              <!-- <template v-for="product in productStore.product" :key="product._id"> -->
              <div v-for="color in bottleColor" :key="color"
                class="w-9 h-9 rounded-full border-[3px] cursor-pointer transition duration-300 ease-in-out hover:border-[#39519f]"
                :style="{ 'backgroundColor': color }" @mouseover="showImageWithColor(color)"
                @click="showImageWithColor(color)">
                <!-- {{ color }} -->
              </div>
              <!-- </template> -->
            </div>
          </div>
        </div>
        <div class="md:w-[60%] space-y-2 text-sm">
          <!-- <template v-for="image in productStore.product" :key="image._id"> -->
          <h2 class="text-gray-900 text-3xl font-semibold">{{ productImg.color }} [{{ productImg.capacity }} ml]
            Water Bottle</h2>
          <hr class="">
          <div v-html="productStore.product.description" class="space-y-3">
          </div>
          <div v-if="productStore.product" class="space-y-1">
            <h2 class="text-xl">Features</h2>
            <ul v-for="feature in productStore.product.features" :key="feature" class="pl-10 text-sm ">
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
            <!-- <h3 class=" font-medium text-lg text-gray-800 ">
              Delivery Fees Calculator
            </h3>
            <div class="block space-y-5 md:space-y-0 md:flex border rounded-sm w-full gap-5 p-4">
              <div class="flex flex-col gap-2 w-full">
                <label>Select your Route</label>
                <select v-model="ctyRoute" @change="getEstate(ctyRoute)" name="" id=""
                  class="py-3 px-4 border placeholder:text-sm  rounded-md" :class="{
                    'border-red-500 focus:border-red-500': v$.ctyRoute.$error,
                    'border-[#42d392] ': !v$.ctyRoute.$invalid,
                  }">
                  <option value="" disabled selected>Select your delivery route</option>
                  <option :value="route.name" v-for="(route, index) in deliveryStore.route" :key="index">{{ route.name
                  }}
                  </option>
                </select>
                <div>
                  <span class="text-xs text-red-500" v-if="v$.ctyRoute.$error">
                    {{ v$.ctyRoute.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="flex flex-col gap-2 w-full">
                <label for="">Select your estate</label>
                <select v-model="ctyEstate" name="" id="" class="py-3 px-4 border placeholder:text-sm  rounded-md" :class="{
                  'border-red-500 focus:border-red-500': v$.ctyEstate.$error,
                  'border-[#42d392] ': !v$.ctyEstate.$invalid,
                }" @change="setDeliveryFees(ctyEstate)">
                  <option value="" disabled selected>Select your estate</option>
                  <option :value="estate.estateName" v-for="(estate, i) in cityRoute.estate" :key="i">
                    {{ estate.estateName }}
                  </option>
                </select>
                <div>
                  <span class="text-xs text-red-500" v-if="v$.ctyEstate.$error">
                    {{ v$.ctyEstate.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div> -->
            <!-- <p v-if="ctyRoute && ctyEstate" class="font-medium">The delivery fees to {{ ctyRoute }} - {{ ctyEstate }} is
              <span class="text-lg text-red-500">{{
                useCurrencyFormatter(deliveryCost) }}</span>
            </p> -->
            <!-- <p class="text-[#009a66] text-xs font-semibold pt-1">
              Free shipping
            </p> -->
            <!-- <hr> -->
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
              class="px-6 w-full py-3 text-white text-sm font-semibold uppercase shadow-md rounded bg-purple-600">Customize
              for Ksh.400</button>
            <button @click="addToCart"
              class="px-6 w-full py-3  text-white text-sm uppercase font-semibold shadow-md rounded bg-green-500">
              <div v-if="isInCart">Add Another Bottle to Cart</div>
              <div v-else>Add to Cart</div>
            </button>
          </div>
          <!-- </template> -->
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
        class="absoute inset-0 overflow-y-auto overflow-x-hidden fixed z-50 flex w-full h-screen items-center justify-center">
        <CustomizeModal @closeModal="closeModal" :bottle="productImg.color" :slug="route.params.slug" />
      </div>
      <div v-if="customizeBottle" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>

  </div>
</template>


<style scoped></style>