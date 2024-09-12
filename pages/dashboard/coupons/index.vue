<script setup>
import { useCouponStore } from '@/stores/coupons.js'
import { useToastStore } from '~/stores/toast'

definePageMeta({
  layout: 'dashboard',
})

const couponStore = useCouponStore()
const toast = useToastStore()

const code = ref('')
const discountType = ref('')
const discount = ref(0)
const date = ref('')

const isLoading = ref(false)

onMounted(async () => {
  await couponStore.fetchCoupons()
})

const clearAll = () => {
  code.value = ''
  discountType.value = ''
  discount.value = 0
  date.value = null
}

const handleCouponCreation = async () => {
  try {
    isLoading.value = true

    const response = await $fetch('/coupons/newCoupon', {
      method: 'POST',
      body: {
        code: code.value,
        discountType: discountType.value,
        discount: discount.value,
        expirationDate: date.value,
      },
    })

    // console.log('Response DATA: ' + response.data)
    // console.log('Response MESSAGE: ' + response.message)

    if (response.message) {
      toast.add({
        type: 'success',
        message: response.message,
        timeout: 5000,
      })
    }

    isLoading.value = false
  } catch (error) {
    console.log('ERROR:', error)
    isLoading.value = false
  }
}

const handleCouponDelete = async (couponId) => {
  const response = await couponStore.deleteCoupon(couponId)

  console.log('REsPONSE DELETE: ' + response)

  if (response.success) {
    // Add a toast message
    toast.add({
      type: 'success',
      message: response,
      timeout: 5000,
    })
  }
}
</script>

<template>
  <div class="min-h-screen space-y-5">
    <div class="bg-white rounded-md shadow-sm h-full py-5 px-10">
      <h1>Coupons</h1>

      <div class="mx-auto max-w-xl">
        <form action="" class="space-y-5">
          <div class="grid">
            <label for="coupon" class="text-xs"
              >Coupon Code e.g (SEPT-COUPON-2024)</label
            >
            <input
              v-model="code"
              id="coupon"
              type="text"
              placeholder="SEPTEMBER-SALE-2024"
              class="py-[6px] px-4 rounded-md border border-gray-300 text-sm"
            />
          </div>
          <div class="grid">
            <label for="discount" class="text-xs">Discount Type</label>
            <select
              v-model="discountType"
              name=""
              id=""
              class="py-[6px] px-4 rounded-md border border-gray-300 bg-white text-sm"
            >
              <option value="" selected>Select the discount type</option>
              <option value="percentage">Percent e.g. 10%</option>
              <option value="fixed">Fixed e.g. Ksh.200</option>
            </select>
          </div>
          <div class="grid">
            <label for="discount" class="text-xs"
              >Discount Amount (Add a number without decorators e.g. 10% should
              be 10 or Ksh.200 should be 200)</label
            >
            <input
              v-model="discount"
              id="discount"
              type="number"
              placeholder="10% if percentage or Ksh.200 if fixed amount"
              class="py-[6px] px-4 rounded-md border border-gray-300 text-sm"
            />
          </div>

          <div class="grid">
            <label for="discount" class="text-xs">Expiry Date</label>
            <input
              v-model="date"
              id="date"
              type="datetime-local"
              placeholder="Select the expiry date"
              class="py-[6px] px-4 rounded-md border border-gray-300 text-sm"
            />
          </div>
          <div class="flex justify-between">
            <button
              class="px-6 py-1 border border-yellow-500 rounded-md text-yellow-500 hover:bg-yellow-100"
              @click="clearAll"
            >
              Cancel
            </button>
            <button
              @click.prevent="handleCouponCreation"
              class="px-6 py-1 bg-green-500 text-white rounded-md shadow-sm hover:text-green-50 hover:bg-green-400 flex items-center gap-2"
            >
              <span v-if="isLoading">
                <Icon
                  name="heroicons:arrow-path"
                  class="w-5 h-5 text-white animate-spin"
                />
              </span>
              Create Coupon
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="bg-white rounded-md h-full py-5 px-10">
      <h1>Coupon History (All Coupons)</h1>

      <div v-if="couponStore.coupons" class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Coupon Code</th>
              <th scope="col" class="px-6 py-3">
                Discount Type (Percentage / Fixed Price)
              </th>
              <th scope="col" class="px-6 py-3">Discount (Amount)</th>
              <th scope="col" class="px-6 py-3">Coupon Status</th>
              <th scope="col" class="px-6 py-3">Expiration Date</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(coupon, index) in couponStore.coupons"
              :key="index"
              class="bg-white border-b"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{ coupon.code }}
              </th>
              <td class="px-6 py-4">
                <span v-if="coupon.discountType === 'percentage'"
                  >Percentage</span
                >
                <span v-else>Fixed</span>
              </td>
              <td class="px-6 py-4">
                <span v-if="coupon.discountType === 'percentage'"
                  >{{ coupon.discount }}%</span
                >
                <span v-else>Ksh.{{ coupon.discount }}</span>
              </td>
              <td class="px-6 py-4">
                <span
                  v-if="coupon.isActive"
                  class="inline-flex items-center gap-2 text-green-500"
                >
                  <Icon name="heroicons:check-circle" class="w-5 h-5" />
                  Active
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-2 text-rose-500"
                >
                  <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
                  Expired
                </span>
              </td>
              <td class="px-6 py-4">{{ coupon.expirationDate }}</td>
              <td class="px-6 py-4 flex gap-5">
                <Icon
                  @click.prevent="handleCouponDelete(coupon._id)"
                  name="heroicons:trash"
                  class="w-5 h-5 text-rose-500 hover:scale-105 hover:text-rose-400"
                />
                <Icon name="" class="" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div class="w-full flex items-center justify-center h-[150px]">
          <Spinner />
        </div>
      </div>
    </div>
  </div>
</template>
