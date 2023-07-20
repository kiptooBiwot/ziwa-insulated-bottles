<script setup>
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
const props = defineProps({
  product: Object,
  selectedArray: Array
})
const { product, selectedArray } = toRefs(props)

const totalCost = computed(() => {
  let total = 0
  // if (props.product.customizationFee) {
  total = product.value.price + product.value.deliveryCost + product.value.customizationFee
  // } else {
  //   total = props.product.price + props.product.deliveryCost
  // }
  return total
})

const removeFromCart = () => {
  productStore.cart.forEach((item, index) => {
    if (item.id === product.value.id) {
      productStore.cart.splice(index, 1)
    }
  })
}
</script>

<template>
  <div class="flex justify-start my-2 rounded-md shadow-md bg-white border py-5 px-5">
    <div class="my-auto">
      <!-- <div @mouseenter="isHover = true" @mouseleave="isHover = false"
        class="flex items-center justify-start p-0.5 cursor-pointer">
        <div @click="isSelected = !isSelected"
          class=" flex items-center justify-center h-[20px] w-[20px] rounded-full border mr-5 ml-2" :class="[
            isHover ? 'border-[#FD374F]' : 'border-gray-300',
            isSelected ? 'bg-[#FD374F]' : ''
          ]">
          <div class="h-[8px] w-[8px] rounded-full bg-white" />
        </div>
      </div> -->
    </div>

    <img class="rounded-md md:w-auto md:h-[150px] w-[90px] ml-10 mr-10" :src="product.currentImage">

    <div class="overflow-hidden pl-2 w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between truncate">
          <!-- <span
            class="sm:block hidden bg-[#FD374F] text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[80px]">Welcome
            Deal</span> -->
          <div class="truncate sm:pl-0 font-medium text-gray-800 text-lg">{{ product.currentBottleColor }} {{
            product.title }}</div>
        </div>
        <button @click="$event => removeFromCart()" class="mx-3 sm:block hidden -mt-0.5 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>

        </button>
      </div>

      <div class="flex justify-between mt-5">
        <div class="text-[#009A66] text-sm font-semibold pt-1">Price:</div>
        <div class="font-medium">
          {{ useCurrencyFormatter(product.price)
          }}
        </div>
      </div>

      <div class="flex justify-between">
        <p class="text-[#009A66] text-sm font-semibold pt-1">
          Delivery fee to {{ product.ctyEstate }} - {{ product.ctyRoute }}
        </p>
        <div class="font-medium text-sm">
          {{ useCurrencyFormatter(product.deliveryCost)
          }}
        </div>
      </div>

      <div v-if="product.selectedFont && product.customName" class="flex justify-between">
        <p class="text-[#009A66] text-sm font-semibold pt-1">
          Bottle customization cost
        </p>
        <div class="font-medium text-sm">
          {{ useCurrencyFormatter(product.customizationFee)
          }}
        </div>
      </div>
      <hr class="my-4">
      <div class="flex justify-between">
        <div>
          <h3 class="text-lg uppercase font-medium">TOTAL</h3>
        </div>
        <div class="font-bold text-gray-800">
          {{ useCurrencyFormatter(totalCost) }}
        </div>
      </div>
      <!-- <p class="text-[#009A66] text-xs font-semibold pt-1">
        Free Shipping for goods worth over KSH 30,000
      </p> -->

      <div class="flex items-center justify-end">
        <button @click="$event => removeFromCart()" class="sm:hidden block -mt-0.5 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>

        </button>
      </div>
    </div>
  </div>
</template>


<style scoped></style>