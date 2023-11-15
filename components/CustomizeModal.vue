<script setup>
import { useProductStore } from '@/stores/product'
import { useToastStore } from '@/stores/toast'
// import bottle from '~/assets/images/products/bottle1-bg.png'

const props = defineProps(['bottle', 'slug'])
const productStore = useProductStore()
const toast = useToastStore()
const emits = defineEmits('closeModal')

const customName = ref('')
const selectedFont = ref('')

const checkNameLength = computed(() => {
  if (customName.value.length >= 7) {
    return true
  } else {
    return false
  }
})

const customizedBottle = ref('')
const images = ref([])

onMounted(() => {
  productStore.dbProducts.find((item) => {
    if (item.slug === props.slug) {
      images.value = item.images
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
  productStore.customizationFee = 400
  emits('closeModal')

  toast.add({
    type: 'success',
    message: `Customizations added. The name:"${productStore.customName}" will be printed on your bottle`,
    timeout: 5000
  })
}

</script>

<template>
  <section class="overflow-hidden rounded-lg max-w-4xl h-auto shadow-2xl">
    <div class="md:grid md:grid-cols-3">
      <div class="bg-blue-300 px-20 py-10">
        <div class="relative">
          <img :src="customizedBottle" alt="" class="h-[300px]">
          <div class="absolute inset-0 mt-16 mb-16 ml-[47px] mr-[102px] md:mr-6 flex items-center justify-center">
            <!-- -[#4F584E] #636e62 -->
            <p class="font-medium text-[#4F584E] text-2xl vertical-text transform rotate-180"
              :class="[selectedFont === 'Frunchy Sage' ? 'font-fontOne' : '', selectedFont === 'Antic Didone' ? 'font-fontTwo' : '', selectedFont === 'Alta' ? 'font-fontThree' : '', selectedFont === 'Retropix' ? 'font-fontFour' : '', selectedFont === 'One Little Font' ? 'font-fontFive' : '', selectedFont === 'Tomorrow' ? 'font-fontSix' : '', selectedFont === 'Charm' ? 'font-fontSeven' : '']">
              {{ customName }}
            </p>
          </div>
        </div>
      </div>
      <div class="p-4 bg-white sm:p-6 md:col-span-2 lg:p-8">
        <div class="pb-5 flex justify-end">
          <div class="hover:border-gray-200  ">
            <svg @click="$emit('closeModal')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor"
              class="w-7 h-7 rounded-md text-gray-900 hover:text-gray-700 hover:border hover:shadow-md transform duration-500 ease-in-out">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

        </div>
        <h4 class="text-xs text-gray-800 mb-2">Your bottle of choice will be customised at an additional fee of <span
            class="text-green-500 font-semibold">KSH.400/=</span>
        </h4>
        <div class="p-0">
          <!-- <svg id="path" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" />
            <textpath x-link:href="#path">
              <span class="text-xs text-white">Victor Wahome</span>
            </textpath>
          </svg> -->
        </div>

        <div class="space-y-3 border rounded-md p-4 h-3/4">
          <div>
            <div class="flex justify-between items-baseline">
              <p class="text-gray-600 text-sm">Enter a custom name:</p>
              <p class="text-xs" :class="[checkNameLength ? 'text-red-500' : 'text-green-500']">Max characters
                {{
                  customName.length }} / 10</p>
            </div>
            <input v-model="customName" type="text" maxlength="10" placeholder="Enter a name"
              class="py-2 px-4 border border-gray-300 w-full rounded-md placeholder:text-gray-400 placeholder:text-sm">
          </div>

          <div>
            <p class="text-gray-600 text-sm">Please select a font</p>
            <select v-model="selectedFont" name="" id=""
              class="py-2 px-4 border border-gray-300 w-full rounded-md placeholder:text-gray-500 placeholder:text-sm">
              <option value="" selected disabled>Please Select a font</option>
              <option value="Frunchy Sage">Frunchy Sage</option>
              <option value="Antic Didone">Antic Didone</option>
              <option value="Alta">Alta</option>
              <option value="Retropix">Retropix</option>
              <option value="One Little Font">One Little Font</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="Charm">Charm</option>
            </select>
          </div>
          <div class="">
            <button @click="addCustomization()"
              class="py-2 px-6 w-full bg-green-500 text-white rounded-lg shadow-md hover:text-green-200 hover:bg-green-600 hover:shadow-2xl transform duration-500 ease-in-out ">
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