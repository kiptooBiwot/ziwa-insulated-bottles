<script setup>
import { useProductStore } from '@/stores/product'
import { useToastStore } from '@/stores/toast'
import { storeToRefs } from 'pinia'
// import bottle from '~/assets/images/products/bottle1-bg.png'

const props = defineProps(['productDetails', 'bottle', 'slug'])
const productStore = useProductStore()
const toast = useToastStore()
const emits = defineEmits('closeModal')

const { customName, selectedFont, textPosition } = storeToRefs(productStore)

// const customName = ref('')
// const selectedFont = ref('')
// const textPosition = ref('center')

const checkNameLength = computed(() => {
  if (customName.value.length >= 7) {
    return true
  } else {
    return false
  }
})

const customizedBottle = ref('')
const images = ref([])
const cat = ref('')

onMounted(() => {
  productStore.dbProducts.find((item) => {
    if (item.slug === props.slug) {
      images.value = item.images
      cat.value = item.category
    }
  })

  if (images) {
    images.value.find((product) => {
      if (product.color === props.bottle) {
        customizedBottle.value = product.url
      }
    })
  }
})

const addCustomization = () => {
  if (customName.value && selectedFont.value) {
    productStore.customizedBottle = true
  }
  productStore.customName = customName.value
  productStore.selectedFont = selectedFont.value

  if (props.productDetails.category === 'big-bottle' || 'kids-bottle') {
    productStore.customizationFee = 0
  } else {
    productStore.customizationFee = 400
  }
  emits('closeModal')

  toast.add({
    type: 'success',
    message: `Customizations added. The name:"${productStore.customName}" will be printed on your bottle`,
    timeout: 5000,
  })
}
</script>

<template>
  <section class="overflow-hidden rounded-lg max-w-4xl h-auto shadow-2xl">
    <div class="md:grid md:grid-cols-3">
      <div class="bg-blue-300 px-20 py-10">
        <div class="relative">
          <img
            v-if="cat === 'big-bottle'"
            :src="customizedBottle"
            alt=""
            class="h-[300px]"
          />
          <img
            v-else-if="cat === 'tumblers'"
            :src="customizedBottle"
            alt=""
            class="h-[400px] w-auto object-cover"
          />

          <img
            v-else
            :src="customizedBottle"
            alt=""
            class="h-[400px] object-none"
          />
          <div
            v-if="cat === 'big-bottle'"
            class="absolute inset-0 mt-16 mb-16 ml-[47px] mr-[102px] md:mr-6 flex justify-center"
            :class="[
              textPosition === 'center' ? 'items-center' : '',
              textPosition === 'bottom' ? 'items-end' : '',
              textPosition === 'top' ? 'items-start' : '',
            ]"
          >
            <!-- -[#4F584E] #636e62 #F1C7EB #E6CEE8-->
            <p
              class="font-medium text-[#4F584E] text-2xl vertical-text transform rotate-180"
              :class="[
                selectedFont === 'Frunchy Sage' ? 'font-fontOne' : '',
                selectedFont === 'Antic Didone' ? 'font-fontTwo' : '',
                selectedFont === 'Alta' ? 'font-fontThree' : '',
                // selectedFont === 'Retropix' ? 'font-fontFour' : '',
                // selectedFont === 'One Little Font' ? 'font-fontFive' : '',
                // selectedFont === 'Tomorrow' ? 'font-fontSix' : '',
                selectedFont === 'Charm' ? 'font-fontSeven' : '',
                selectedFont === 'Coco Gothic' ? 'font-logoFont' : '',
              ]"
            >
              {{ customName }}
            </p>
          </div>

          <div
            v-else-if="cat === 'tumblers'"
            class="absolute top-0 mt-40 ml-16 lg:ml-4"
          >
            <p
              class="font-medium text-[#4F584E] text-2xl"
              :class="[
                selectedFont === 'Frunchy Sage'
                  ? 'font-fontOne text-3xl ml-1'
                  : '',
                // selectedFont === 'Antic Didone' ? 'font-fontTwo' : '',
                selectedFont === 'Alta' ? 'font-fontThree ml-1 text-xl' : '',
                // selectedFont === 'Retropix' ? 'font-fontFour' : '',
                selectedFont === 'Coco Gothic'
                  ? 'font-logoFont text-xl ml-1'
                  : '',
                // selectedFont === 'Tomorrow' ? 'font-fontSix' : '',
                selectedFont === 'Charm' ? 'font-fontSeven ml-1' : '',
                selectedFont === 'Denira Signature Demo'
                  ? 'font-fontEight ml-4 text-3xl'
                  : '',
              ]"
            >
              {{ customName }}
            </p>
          </div>
          <div
            v-else
            class="absolute inset-0 mt-16 mb-16 ml-[47px] mr-[102px] md:mr-6 flex justify-end"
            :class="[textPosition === 'bottom' ? 'items-end' : '']"
          >
            <!-- textPosition === 'top' ? 'items-center' : '', -->
            <!-- textPosition === 'top' ? 'items-start' : '' -->
            <!-- -[#4F584E] #636e62 -->
            <p
              class="font-medium text-[#4F584E] text-2xl vertical-text transform rotate-180"
              :class="[
                // selectedFont === 'Frunchy Sage' ? 'font-fontOne' : '',
                // selectedFont === 'Antic Didone' ? 'font-fontTwo' : '',
                // selectedFont === 'Alta' ? 'font-fontThree' : '',
                selectedFont === 'Coco Gothic' ? 'font-logoFont' : '',
                // selectedFont === 'One Little Font' ? 'font-fontFive' : '',
                // selectedFont === 'Tomorrow' ? 'font-fontSix' : '',
                // selectedFont === 'Charm' ? 'font-fontSeven' : '',
              ]"
            >
              {{ customName }}
            </p>
          </div>
        </div>
      </div>
      <div class="p-4 bg-white sm:p-6 md:col-span-2 lg:p-8">
        <div class="pb-5 flex justify-end">
          <div class="hover:border-gray-200">
            <svg
              @click="$emit('closeModal')"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-7 h-7 rounded-md text-gray-900 hover:text-gray-700 hover:border hover:shadow-md transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <h4
          v-if="productDetails.category !== 'big-bottle' || 'kids-bottle'"
          class="text-xs text-gray-800 mb-2"
        >
          Your bottle of choice will be customized at an additional fee of
          <span class="text-green-500 font-semibold">KSH.400/=</span>
        </h4>
        <h4 v-else class="text-xs text-gray-800 mb-2">
          Your bottle of choice will be customized for
          <span class="text-green-500 font-semibold">FREE</span>
        </h4>

        <div class="space-y-3 border rounded-md p-4 h-3/4">
          <div>
            <div class="flex justify-between items-baseline">
              <p class="text-gray-600 text-sm">Enter a custom name:</p>
              <p
                class="text-xs"
                :class="[checkNameLength ? 'text-red-500' : 'text-green-500']"
              >
                Max characters {{ customName.length }} / 10
              </p>
            </div>
            <input
              v-model="customName"
              type="text"
              maxlength="10"
              placeholder="Enter a name"
              class="py-2 px-4 border border-gray-300 w-full rounded-md placeholder:text-gray-400 placeholder:text-sm"
            />
          </div>

          <div>
            <label
              for=""
              class="text-sm"
              :class="[cat === 'tumblers' ? 'hidden' : '']"
              >Choose your name's position on the bottle:</label
            >
            <div class="flex space-x-10 pt-2">
              <div
                v-if="cat === 'big-bottle'"
                class="space-x-2 text-sm text-gray-500"
              >
                <input
                  v-model="textPosition"
                  type="radio"
                  value="top"
                  name="top"
                  id="top"
                />
                <label for="top">Top</label>
              </div>
              <div
                v-if="cat === 'big-bottle'"
                class="space-x-2 text-sm text-gray-500"
              >
                <input
                  v-model="textPosition"
                  type="radio"
                  value="center"
                  name="center"
                  id="center"
                />
                <label for="center">Center</label>
              </div>
              <div
                class="space-x-2 text-sm text-gray-500"
                :class="[cat === 'tumblers' ? 'hidden' : '']"
              >
                <input
                  v-model="textPosition"
                  :checked="cat === 'kids-bottle' ? 'checked' : ''"
                  type="radio"
                  value="bottom"
                  name="bottom"
                  id="bottom"
                />
                <label for="bottom">Bottom</label>
              </div>
            </div>
          </div>

          <div>
            <p class="text-gray-600 text-sm">Please select a font</p>
            <select
              v-model="selectedFont"
              name=""
              id=""
              class="py-2 px-4 border text-sm border-gray-300 w-full rounded-md placeholder:text-gray-500 placeholder:text-sm"
            >
              <option value="" disabled>Please Select a font</option>
              <option v-if="cat === 'kids-bottle'" value="Coco Gothic">
                Coco Gothic
              </option>
              <template v-else>
                <option value="Alta">Alta</option>
                <option value="Frunchy Sage">Frunchy Sage</option>
                <option value="Coco Gothic">Coco Gothic</option>
                <option value="Charm">Charm</option>
                <option v-if="cat === 'tumblers'" value="Denira Signature Demo">
                  Denira Signature
                </option>
                <!-- <option value="Antic Didone" selected>Antic Didone</option>
                <option value="Retropix">Retropix</option>
                <option value="One Little Font">One Little Font</option>
                <option value="Tomorrow">Tomorrow</option> -->
              </template>
            </select>
          </div>
          <div class="">
            <button
              @click="addCustomization()"
              class="py-2 px-6 w-full bg-green-500 text-white rounded-lg shadow-md hover:text-green-200 hover:bg-green-600 hover:shadow-2xl transform duration-500 ease-in-out"
            >
              Add Customization
            </button>
          </div>
        </div>
        <!-- <p class="text-sm font-semibold uppercase tracking-widest">
          Run with the pack
        </p> -->
        <!-- <h2 class="mt-6 font-black uppercase">
          <span class="text-4xl font-black sm:text-5xl lg:text-6xl">
            Get 20% off
          </span>
          <span class="mt-2 block text-sm">On your next order over $50</span>
        </h2> -->
        <!-- <a class="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white" href="">
          Get Discount
        </a>
        <p class="mt-8 text-xs font-medium uppercase text-gray-400">
          Offer valid until 24th March, 2021 *
        </p> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
.vertical-text {
  writing-mode: vertical-rl;
}
</style>
