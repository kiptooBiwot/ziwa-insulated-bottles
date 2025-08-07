<script setup>
import { useProductStore } from '../../stores/product'

definePageMeta({
  layout: 'default',
})

const productStore = useProductStore()
const router = useRoute()

// const filteredProduct = ref(null)
// const isLoading = ref(false)

onMounted(async () => {
  // console.log(router.params.category)
  productStore.getProductCategory(router.params.category)
})

const sendId = (id) => {
  productStore.imageId = id
}
</script>

<template>
  <div class="min-h-screen">
    <div
      v-if="productStore.isLoading"
      class="w-full min-h-screen flex items-center justify-center"
    >
      <Spinner />
    </div>
    <div v-else class="w-full py-0">
      <div v-if="productStore.filteredProduct" class="w-6xl lg:mx-auto mx-5">
        <!-- <section
          class="bg-cover relative"
          style="background-image: url(/images/xmas-bg.jpg)"
        >
          <div class="absolute inset-0 bg-[#B80D1A] bg-opacity-20"></div>
          <div class="max-w-6xl mx-auto flex justify-center">
            <img
              v-if="router.params.category === 'big-bottle'"
              src="/images/xmas-ziwa-bottle.jpeg"
              alt=""
              class="object-contain w-80 shadow-md h-auto"
            />
            <img
              v-else-if="router.params.category === 'tumblers'"
              src="/images/xmass-ziwa-tumbler.jpeg"
              alt=""
              class="object-contain w-80 rounded-lg shadow-md h-auto"
            />
            <img
              v-else
              src="/images/xmas-ziwa-tumber-pic.jpeg"
              alt=""
              class="object-contain w-96 rounded-lg shadow-md h-auto"
            />
          </div>
        </section> -->
        <!-- Shop section -->
        <section
          id="Shop"
          class="py-20 min-h-screen md:bg-[#39519f] md:bg-opacity-5"
        >
          <div class="max-w-6xl mx-auto px-5">
            <h3 class="text-[#39519f] font-semibold">Shop</h3>

            <h2
              v-if="router.params.category !== 'preorder'"
              class="text-gray-900 font-medium text-3xl tracking-tight mb-4"
            >
              {{ productStore.filteredProduct[0].title }}
            </h2>
            <div v-else class="max-w-5xl mx-auto mb-10">
              <h2
                class="text-gray-900 font-medium text-3xl tracking-tight mb-4"
              >
                🌲Karibu to the VIP Access.🌲
              </h2>
              <p>
                Be the first to grab the perfect holiday gifts for your loved
                ones with our exclusive VIP pre-order access! Pre-order now to
                unlock these perks:
              </p>
              <div class="pl-10 space-y-3">
                <p>
                  ✨ Ksh 200 Off – Get an instant discount on your pre-order.
                  Use code
                  <span class="font-bold text-red-800">VIPACCESS24</span>
                </p>
                <p>🎁 Free Gift – Enjoy a surprise gift, just for you!</p>
                <p>
                  🌈 First Pick – Choose their favorite colors before they sell
                  out
                </p>
                <p>
                  🎁 Personalized Selections – Thoughtful, personalized gifts
                  they would love every day
                </p>
              </div>
            </div>

            <div v-if="router.params.category === 'xmas-edition'">
              <ShopXmas />
            </div>
            <div class="relative">
              <!-- <div
                v-if="isLoading"
                class="absolute inset-0 h-full w-full flex items-center justify-center"
              >
                <Spinner />
              </div> -->
              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <template
                  v-for="(product, index) in productStore.filteredProduct"
                  :key="index"
                >
                  <div
                    v-for="img in product.images || product.outOfStockImages"
                    :key="img._id"
                    class="flex-shrink-0 m-6 md:m-2 relative overflow-hidden bg-blue-200 rounded-lg w-auto md:max-w-xs shadow-lg"
                    :class="[img.archived ? 'hidden' : '']"
                  >
                    <div
                      v-if="!img.inStock"
                      class="absolute top-2 left-2 bg-rose-500 text-white text-sm px-3 py-1 font-bold rounded"
                    >
                      <!-- Pre-Order -->
                      Sold Out
                    </div>
                    <div
                      v-if="img.isNew"
                      class="absolute top-2 left-2 bg-orange-500 text-white text-sm px-3 py-1 font-bold rounded"
                    >
                      New Arrival
                    </div>
                    <div
                      v-if="
                        img.isNew && router.params.category === 'xmas-edition'
                      "
                      class="absolute top-2 left-2 bg-yellow-500 text-white text-sm px-3 py-1 font-bold rounded"
                    >
                      Holiday Collection
                    </div>

                    <!-- Christmas Bubble Added to the right -->
                    <!-- TODO: Activate this every christmas season -->
                    <!-- v-if="img.isNew" -->
                    <!-- <div class="absolute top-2 right-2 px-0 py-0 rounded">
                      <img
                        src="/images/xmas-hat.png"
                        alt=""
                        class="w-12 h-12 object-contain"
                      />
                    </div> -->
                    <!-- [#89CFF0] -->
                    <NuxtLink
                      :to="{
                        name: 'item-slug',
                        params: { slug: product.slug },
                      }"
                      @click="sendId(img._id)"
                    >
                      <!-- :class="`bg-${product.bgColor}`" -->
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
                            transform: rotate3d(0, 0, 1, 20deg)
                              scale3d(1, 0.6, 1);
                            opacity: 0.2;
                          "
                        ></div>
                        <img
                          v-if="
                            product.category === 'big-bottle' ||
                            product.category == 'ziwa-3.0'
                          "
                          class="relative w-auto h-[250px]"
                          :src="img.url"
                          alt=""
                        />
                        <img
                          v-else-if="product.category === 'tumblers'"
                          class="relative w-auto h-[250px]"
                          :src="img.url"
                          alt=""
                        />
                        <img
                          v-else-if="product.category === 'msafiri-boot'"
                          class="relative w-auto h-auto object-cover"
                          :src="img.url"
                          alt=""
                        />
                        <img
                          v-else-if="product.category === 'leak-proof-lids'"
                          class="relative w-auto h-[250px] object-cover"
                          :src="img.url"
                          alt=""
                        />
                        <img
                          v-else
                          class="relative w-full h-[460px] object-none"
                          :src="img.url"
                          alt=""
                        />
                      </div>
                      <div class="relative text-white px-6 pb-6 mt-6">
                        <span
                          v-if="product.category === 'big-bottle'"
                          class="block opacity-75 -mb-1 text-gray-600 text-xs"
                          >{{ img.capacity }} ml {{ img.color }} Water Bottle
                        </span>
                        <span
                          v-if="product.category === 'ziwa-3.0'"
                          class="block opacity-75 -mb-1 text-gray-600 text-xs"
                          >{{ img.capacity }} ml {{ img.color }} Ziwa 3.0 Bottle
                        </span>
                        <span
                          v-else-if="product.category === 'tumblers'"
                          class="block opacity-75 -mb-1 text-gray-600 text-xs"
                          >{{ img.color }} Tumbler
                          <span v-if="img.capacity === 1183">(40 Oz)</span>
                          <span v-else>(30 Oz)</span>
                        </span>
                        <span
                          v-else-if="product.category === 'leak-proof-lids'"
                          class="block opacity-75 -mb-1 text-gray-600 text-xs"
                          >{{ img.color }} Leak-Proof Lid
                        </span>
                        <span
                          v-else-if="product.category === 'msafiri-boot'"
                          class="block opacity-75 -mb-1 text-gray-600 text-xs"
                          >{{ img.color }} Msafiri Boot
                        </span>
                        <span
                          v-else
                          class="block opacity-75 -mb-1 text-gray-600 text-xs"
                          >Little Ziwa in {{ img.color }}</span
                        >
                        <div class="flex items-end justify-between">
                          <!-- <NuxtLink :to="`/item/${product.slug}`" :image="img._id"> -->
                          <span
                            class="block font-medium text-lg text-gray-800 transform duration-500 ease-in-out hover:scale-105 hover:text-gray-700"
                            >View Details</span
                          >
                          <DiscountComponent
                            v-if="
                              (productStore.discountOffer &&
                                product.category === 'big-bottle') ||
                              (productStore.discountOffer &&
                                product.category === 'tumblers') ||
                              (productStore.discountOffer &&
                                product.category === 'kids-bottle')
                            "
                            :price="img.price"
                          />
                          <span
                            v-else
                            class="block bg-white rounded-full text-orange-500 text-[11px] font-bold px-1 py-2 leading-none items-center"
                          >
                            {{ useCurrencyFormatter(img.price) }}
                          </span>
                        </div>
                      </div>
                    </NuxtLink>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
