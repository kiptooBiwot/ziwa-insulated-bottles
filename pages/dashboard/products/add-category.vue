<script setup>
definePageMeta({
  layout: 'dashboard',
})

const cat = reactive({
  category: '',
})
const isSavingProduct = ref(false)

const saveCategory = async () => {
  try {
    isSavingProduct.value = true

    // const response = await $fetch('/category/newCategory', {
    //   method: 'post',
    //   body: cat,
    // })

    // console.log('CATEGORY RESPONSE:', response)

    // if (response.message === 'CategorySaved') {
    //   cat.category = ''
    // }

    isSavingProduct.value = false
  } catch (error) {
    isSavingProduct.value = false
    // console.log(error)
  }
}
</script>

<template>
  <div class="w-full">
    <div class="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-10">
      <h2 class="text-2xl font-bold text-gray-600 mb-3">Add a New Category</h2>
      <div class="grid space-y-1">
        <label for="" class="text-xs">Category name</label>
        <input
          type="text"
          v-model="cat.category"
          class="border px-4 py-2 rounded-md"
        />
      </div>
      <div class="mt-5">
        <button
          @click="saveCategory"
          class="px-6 py-3 uppercase rounded-md bg-green-600 text-white text-sm"
          :class="[
            isSavingProduct ? 'hover:cursor-not-allowed' : 'cursor-pointer',
          ]"
          :disabled="isSavingProduct"
        >
          Save Category
        </button>
      </div>
    </div>
  </div>
</template>
