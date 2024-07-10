<script setup>
import { useProductStore } from '@/stores/product'
import { useDeliveryStore } from '@/stores/delivery'
import { useToastStore } from '@/stores/toast'

const productStore = useProductStore()
const deliveryStore = useDeliveryStore()
const toast = useToastStore()
const route = useRoute()
const nuxtApp = useNuxtApp()
const router = useRouter()

nuxtApp.$fb.enable()

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

// ADD any new colors here.
// TODO: To change this logic and make it dynamic
const bottleColor = [
  '#1D4D4B',
  '#435A76',
  '#810820', //done
  '#96C0CF',
  '#001541',
  '#000013', //done
  '#A33806',
  '#8D596A',
  '#F1C7EB',
  '#FFC702',
  '#E36D6E',
  '#0C383B',
  '#E6CEE8',
  '#F48760',
  '#F9E3E6',
  '#AEACB1',
  '#050716',
  '#D5E9F0',
  '#F0E7E2',
  '#D8C7BF',
  '#FA01A5',
]

const productImg = ref('')
const productColors = reactive([])
const bottleColorFiltered = reactive([])

// Compare two arrays and display only the product colors available
const availableColors = () => {
  // const bottiColors = productStore.product.images.map((bottleColor) => {
  //   // console.log('BOTTLE COLOR', bottleColor.colorCode)
  //   productColors.value.push(bottleColor.colorCode)
  // })

  productStore.product.images.map((colors) => {
    productColors.push(colors.colorCode)
  })

  if (productColors) {
    const prodColors = productColors.filter(
      (color) => bottleColor.includes(color)
      // console.log('WHAT IS COLOR?', color)
    )

    // const prodColors = bottleColor.filter((color) => {
    //   productColors.value.includes(color)
    // })

    console.log('MATCHING COLORS', prodColors)
    bottleColorFiltered.push(prodColors)
    return prodColors
  }
}

// nextTick(() => router.go())

onMounted(() => {
  productStore.getSingleProduct(route.params.slug)

  if (productStore.imageId) {
    const id = productStore.imageId
    // productStore.customName = ''

    productStore.product.images.filter((image) => {
      if (image._id === id) {
        // console.log('IMAGE:', image)
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

  availableColors()

  // console.log('AVAILABLE COLORS:', availableColors())
})
// changeImage

const priceComputed = computed(() => {
  if (productImg.value.price) {
    return productImg.value.price
  }
  return 0.0
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
  return (customizeBottle.value = !customizeBottle.value)
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

  // console.log('TOTAL:', total);

  selectedProduct.value = {
    title: productStore.product.title,
    price: productImg.value.price,
    capacity: productImg.value.capacity,
    currentImage: productImg.value.url,
    currentBottleColor: productImg.value.color,
    inStock: productImg.value.inStock,
    // ctyRoute: ctyRoute.value,
    // ctyEstate: ctyEstate.value,x
    // deliveryCost: deliveryCost.value,
    selectedFont: productStore.selectedFont,
    customName: productStore.customName,
    textPosition: productStore.textPosition,
    customizationFee: productStore.customizationFee,
    productId: productStore.product._id,
    cumulativeCost: total,
  }

  productStore.cart.push(selectedProduct)

  toast.add({
    type: 'success',
    message: 'Good choice. The product was added to the cart.',
    timeout: 5000,
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
  productStore.cart.forEach((prod) => {
    if (prod.productId === selectedProduct.productId) {
      res = true
    }
  })
  return res
})
</script>

<template>
  <div class="relative">
    <div class="bg-[#BFDBFE] py-10">
      <div class="max-w-6xl mx-auto px-5 xl:px-0">
        <h2 class="text-gray-900 font-semibold text-3xl md:text-4xl pb-2">
          Product Details
        </h2>
        <!-- <hr class="md:w-[280px] border-1 border-gray-300"> -->
        <div
          v-if="productStore.product"
          class="md:flex gap-10 justify-between mx-auto w-full"
        >
          <div class="md:w-[40%] mb-7 md:mb-0">
            <div
              class="flex-shrink-0 md:m-6 relative overflow-hidden bg-blue-200 rounded-xl max-w-sm shadow-lg w-full pb-10"
            >
              <!-- [#89CFF0] bg-[#89CFF0] -->
              <!-- :class="`bg-${product.bgColor}`" -->
              <div
                v-if="!productImg.inStock"
                class="absolute top-2 left-2 bg-rose-500 text-white text-sm px-3 py-1 font-bold rounded"
              >
                Sold Out
              </div>
              <svg
                class="absolute bottom-0 left-0 mb-8"
                viewBox="0 0 375 283"
                fill="none"
                style="transform: scale(1.5); opacity: 0.1"
              >
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
              <div
                class="relative pt-10 px-10 flex items-center justify-center"
              >
                <div
                  class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style="
                    background: radial-gradient(black, transparent 60%);
                    transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1);
                    opacity: 0.2;
                  "
                ></div>
                <template v-if="productStore.product.category === 'big-bottle'">
                  <img
                    v-if="productImg.url"
                    class="relative rounded-lg object-fit w-auto h-[300px] md:h-[400px] mx-auto transition duration-700 ease-in-out"
                    :src="productImg.url"
                    alt=""
                  />
                </template>
                <template
                  v-else-if="productStore.product.category === 'tumblers'"
                >
                  <img
                    v-if="productImg.url"
                    class="relative rounded-lg object-fit w-auto h-[300px] md:h-[400px] mx-auto transition duration-700 ease-in-out"
                    :src="productImg.url"
                    alt=""
                  />
                </template>
                <template v-else>
                  <img
                    v-if="productImg.url"
                    class="relative rounded-lg object-none w-auto h-[450px] md:h-[450px] mx-auto transition duration-700 ease-in-out"
                    :src="productImg.url"
                    alt=""
                  />
                </template>
              </div>
            </div>
            <div class="md:hidden">
              <h3 class="text-lg text-gray-800 py-3">
                Choose the Bottle's Color
              </h3>
              <div class="flex gap-2">
                <!-- <template v-for="product in productStore.product" :key="product._id"> -->
                <template v-for="color in bottleColorFiltered[0]" :key="color">
                  <!-- :style="[availableColors.includes(color) ? { backgroundColor: color } : 'null']" -->
                  <div
                    class="w-6 h-6 rounded-full border-[1px] cursor-pointer flex-shrink-0 flex-wrap transition duration-300 ease-in-out hover:border-[#39519f]"
                    :style="{ backgroundColor: color }"
                    @mouseover="showImageWithColor(color)"
                    @click="showImageWithColor(color)"
                  >
                    <!-- {{ color }} -->
                  </div>
                  <!-- COLOR: {{ color }} -->
                </template>
                <!-- </template> -->
              </div>
            </div>
          </div>
          <div class="md:w-[60%] space-y-2 text-sm">
            <!-- <template v-for="image in productStore.product" :key="image._id"> -->
            <h2 class="text-gray-900 text-3xl font-semibold">
              <!-- {{ productImg.color }} [{{ productImg.capacity }} ml] Water Bottle -->
              {{ productImg.color }} <br />
              {{ productStore.product.title }}
            </h2>
            <hr class="" />
            <div
              v-html="productStore.product.description"
              class="space-y-3 leading-6"
            ></div>
            <div v-if="productStore.product" class="space-y-1">
              <h2 class="text-xl">Features</h2>
              <ul
                v-for="feature in productStore.product.features"
                :key="feature"
                class="pl-10 text-sm"
              >
                <div class="space-y-3">
                  <ul class="list-disc">
                    <li class="">{{ feature.description }}</li>
                  </ul>
                </div>
              </ul>
            </div>
            <hr />
            <div class="hidden md:block">
              <h3 class="text-lg text-gray-800 py-3">
                Choose the Bottle Color
              </h3>
              <div class="flex gap-2">
                <div
                  v-for="color in bottleColorFiltered[0]"
                  :key="color"
                  class="w-10 h-10 flex-shrink-0 rounded-full border-[3px] cursor-pointer transition duration-300 ease-in-out hover:border-[#39519f]"
                  :style="{ backgroundColor: color }"
                  @mouseover="showImageWithColor(color)"
                  @click="showImageWithColor(color)"
                ></div>
              </div>
            </div>

            <hr class="hidden md:block" />
            <div class="flex py-5">
              <p>
                <span
                  class="uppercase font-display text-sm font-bold mr-10 lg:mr-20"
                  >Material</span
                >
                304 Stainless Steel
              </p>
            </div>
            <!-- <hr class="hidden md:block" /> -->
            <div class="space-y-3">
              <div class="flex items-center justify-start gap-2 my-2">
                <h2 class="text-xs text-gray-800">Price:</h2>
                <div class="text-2xl font-semibold text-gray-800">
                  {{ useCurrencyFormatter(priceComputed) }}
                </div>
                <!-- <span class="bg-[#f5f5f5] border text-[#c08562] text-[9px] font-semibold px-1.5 rounded-sm">On Offer</span> -->
              </div>
              <hr />
              <div v-if="!productImg.inStock" class="text-rose-500">
                <h3 class="font-display font-bold text-rose-500">
                  Product Out of Stock (Pre-order)
                </h3>
                <p>*Perks of pre-ordering</p>
                <ul class="list-disc ml-5">
                  <li>Free name engraving (Customization)</li>
                  <li>Extra Straws and straw covers</li>
                </ul>
              </div>
              <hr v-if="!productImg.inStock" />
              <h3
                v-if="productStore.customizedBottle"
                class="font-medium text-lg text-gray-800"
              >
                Your Bottle Customization
              </h3>
              <p v-if="productStore.customizedBottle">
                The name to be printed will be
                <span class="text-lg font-medium">{{
                  productStore.customName
                }}</span>
                and the Font selected:
                <span class="text-lg font-medium">{{
                  productStore.selectedFont
                }}</span>
              </p>
              <hr v-if="productStore.customizedBottle" />
              <!-- v-if="productStore.product.category === 'big-bottle'" -->
              <!-- :disabled="!productImg.inStock" -->
              <button
                @click="customizeBottle = !customizeBottle"
                class="px-6 w-full py-3 text-white text-sm font-semibold uppercase shadow-md rounded bg-purple-600"
              >
                <span
                  v-if="
                    productStore.product.category === 'big-bottle' ||
                    'kids-bottle' ||
                    'tumblers'
                  "
                  >Customize for Free</span
                >
                <span v-else>Customize for Ksh.400</span>
              </button>
              <button
                @click="addToCart"
                class="px-6 w-full py-3 text-white text-sm uppercase font-semibold shadow-md rounded bg-green-500"
              >
                <div v-if="isInCart">
                  <span v-if="productImg.inStock"
                    >Add Another Bottle to Cart</span
                  >
                  <span v-else>Pre-Order this Product</span>
                </div>
                <div v-else>
                  <span v-if="productImg.inStock">Add to Cart</span>
                  <span v-else>Pre-order this Product</span>
                </div>
              </button>
            </div>
            <!-- </template> -->
          </div>
        </div>
        <div v-else class="w-full min-h-screen">
          <div class="flex items-center justify-center w-full h-full">
            <div
              class="flex justify-center items-center space-x-1 text-xl text-[#39519f]"
            >
              <svg
                fill="none"
                class="w-8 h-8 text-[#39519f] animate-spin"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                  fill="currentColor"
                  fill-rule="evenodd"
                />
              </svg>
              <div>Loading ...</div>
            </div>
          </div>
        </div>
        <div
          v-if="customizeBottle"
          class="inset-0 overflow-y-auto overflow-x-hidden fixed z-50 flex w-full h-screen items-center justify-center"
        >
          <CustomizeModal
            @closeModal="closeModal"
            :productDetails="productStore?.product"
            :bottle="productImg.color"
            :slug="route.params.slug"
          />
        </div>
        <div
          v-if="customizeBottle"
          class="opacity-25 fixed inset-0 z-40 bg-black"
        ></div>
      </div>
    </div>
    <div class="max-w-6xl mx-5 lg:mx-auto">
      <h2 class="text-center my-10 font-display font-bold text-3xl">
        Frequently bought together
      </h2>
      <div class="max-w-5xl mx-5 lg:mx-auto">
        <div
          class="w-full lg:w-3/4 mx-auto bg-slate-100 md:pl-10 pt-10 pb-5 rounded-md shadow-sm mb-10"
        >
          <div class="flex items-center justify-between">
            <img
              src="/images/bottle1-bg.png"
              alt=""
              class="object-cover w-[80px] md:w-[100px] h-auto"
            />
            <div class="text-xl font-bold">+</div>
            <img
              src="/images/jungle-green-40.png"
              alt=""
              class="object-cover w-[120px] md:w-[150px] h-auto"
            />
            <div class="text-xl font-bold">+</div>
            <img
              src="/images/kids-navy.png"
              alt=""
              class="object-cover w-[180px] md:w-[200px] h-auto"
            />
          </div>
          <div class="flex items-center justify-center mt-10">
            <button
              class="py-2 px-6 text-xs font-bold rounded-full bg-gray-600 text-white shadow-lg"
            >
              Total Price: KSH. 5,100/=
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
