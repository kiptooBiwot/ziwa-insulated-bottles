<script setup>
import { useManageProductsStore } from '@/stores/manageProducts.js'
import { useToastStore } from '~/stores/toast'

definePageMeta({
  layout: 'dashboard',
})

const productStore = useManageProductsStore()
const toast = useToastStore()

const allProducts = ref([])

onMounted(async () => {
  await productStore.fetchProducts()
})

const isEditModalVisible = ref(false)
const isEditMode = ref(false)

const formData = ref({
  isNewProduct: false,
  url: '',
  color: '',
  price: 0,
  capacity: 0,
  colorCode: '',
  inStock: false,
})

const formDataCopy = ref(null)
const isChanged = ref(false)
const editingProductId = ref('')
const editingImageId = ref('')

// Watch for changes to formData and compare to originalData
watch(
  formData,
  (newVal) => {
    isChanged.value =
      newVal.isNewProduct !== formDataCopy.value.isNewProduct ||
      newVal.url !== formDataCopy.value.url ||
      newVal.color !== formDataCopy.value.color ||
      newVal.price !== formDataCopy.value.price ||
      newVal.capacity !== formDataCopy.value.capacity ||
      newVal.colorCode !== formDataCopy.value.colorCode ||
      newVal.inStock !== formDataCopy.value.inStock
  },
  { deep: true }
)

const closeEditModal = () => {
  isEditModalVisible.value = !isEditModalVisible.value

  formData.value.isNewProduct = false
  formData.value.url = ''
  formData.value.color = ''
  formData.value.price = 0
  formData.value.capacity = 0
  formData.value.colorCode = ''
  formData.value.inStock = false

  editingProductId.value = ''
  editingImageId.value = ''

  productStore.product = null
  productStore.imageDetails = null
}

const showEditModal = async (productId, imageId) => {
  isEditModalVisible.value = !isEditModalVisible.value

  productStore.getProductById(productId, imageId)

  if (productStore.imageDetails) {
    isEditMode.value = true

    editingProductId.value = productId
    editingImageId.value = imageId

    Object.assign(formData.value, productStore.imageDetails)
    formDataCopy.value = { ...productStore.imageDetails }

    formData.value.isNewProduct = productStore.imageDetails.isNewProduct
    formData.value.url = productStore.imageDetails.url
    formData.value.color = productStore.imageDetails.color
    formData.value.price = productStore.imageDetails.price
    formData.value.capacity = productStore.imageDetails.capacity
    formData.value.colorCode = productStore.imageDetails.colorCode
    formData.value.inStock = productStore.imageDetails.inStock
  }
}

const handleItemUpdate = async (productId, payload) => {
  try {
    if (isChanged.value) {
      // Call the store method to update the product
      const response = await productStore.updateProduct(productId, payload)

      // console.log('UPDATE PRODUCT RESPONSE:', response)

      if (response.success === true) {
        toast.add({
          type: 'success',
          message:
            'Product updated successfully. If you see no changes immediately, please refresh the page.',
          timeout: 5000,
        })
        isEditMode.value = false
        closeEditModal()
      }
    }
  } catch (error) {
    toast.add({
      type: 'error',
      message: 'Failed to update product. Please try again later.',
      timeout: 5000,
    })
  }
}
</script>
<template>
  <div class="bg-white shadow-sm rounded-md p-8">
    <div v-if="productStore?.products?.length >= 1">
      <h3 class="text-xl font-bold text-blue-500 uppercase">Products</h3>
      <hr class="mt-2 mb-5" />
      <!-- {{ allProducts[0] }} -->

      <!-- <h2>All Products Bottles</h2> -->
      <div v-for="product in productStore.products" :key="product._id">
        <h2
          class="font-bold text-xl text-yellow-500 tracking-wide uppercase mb-5"
        >
          {{
            product.category === 'big-bottle' ? 'Bottles (750ml & 1000ml)' : ''
          }}{{ product.category === 'tumblers' ? 'Tumblers 30oz & 40oz' : ''
          }}{{
            product.category === 'kids-bottle' ? 'Ziwa Little (500ml)' : ''
          }}
        </h2>
        <div
          v-if="product.category === 'big-bottle'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5"
        >
          <div v-for="image in product.images" :key="image._id">
            <div
              class="border border-gray-300 shadow-md p-4 rounded-lg space-y-4"
            >
              <div class="bg-slate-100 rounded-lg py-4">
                <img
                  :src="image.url"
                  :alt="product.title"
                  class="object-contain shrink-0 w-full h-[150px]"
                />
              </div>

              <div>
                <h3 class="text-sm font-bold mb-3">{{ product.title }}</h3>
                <div class="flex flex-wrap justify-between gap-x-10 gap-y-2">
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Color
                    </h2>
                    <p class="text-sm">{{ image.color }}</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Price
                    </h2>
                    <p class="text-sm">KSH.{{ image.price }}</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Capacity
                    </h2>
                    <p class="text-sm">{{ image.capacity }} ml</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Color Code
                    </h2>
                    <p class="text-sm">{{ image.colorCode }}</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      In Stock
                    </h2>
                    <p
                      class="text-sm"
                      :class="[
                        image.inStock ? 'text-green-500' : 'text-rose-500',
                      ]"
                    >
                      {{
                        image.inStock === true ? 'Available' : 'Out of Stock'
                      }}
                    </p>
                  </div>
                </div>
                <hr class="mt-3" />
                <div class="flex justify-end mt-3">
                  <button
                    @click="showEditModal(product._id, image._id)"
                    class="px-2 py-1 rounded-md text-white bg-green-600 text-sm hover:bg-text-500 flex items-center justify-center"
                  >
                    <span>
                      <Icon
                        name="heroicons:pencil-square"
                        class="text-white w-5 h-5 mr-1"
                      />
                    </span>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else-if="product.category === 'tumblers'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5"
        >
          <div v-for="image in product.images" :key="image._id">
            <div
              class="border border-gray-300 shadow-md p-4 rounded-lg space-y-4"
            >
              <div class="bg-slate-100 rounded-lg py-4">
                <img
                  :src="image.url"
                  :alt="product.title"
                  class="object-contain shrink-0 w-full h-[150px]"
                />
              </div>

              <div>
                <h3 class="text-sm font-bold mb-3">{{ product.title }}</h3>
                <div class="flex flex-wrap justify-between gap-x-10 gap-y-2">
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Color
                    </h2>
                    <p class="text-sm">{{ image.color }}</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Price
                    </h2>
                    <p class="text-sm">KSH.{{ image.price }}</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Capacity
                    </h2>
                    <p class="text-sm">{{ image.capacity }} ml</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Color Code
                    </h2>
                    <p class="text-sm">{{ image.colorCode }}</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      In Stock
                    </h2>
                    <p
                      class="text-sm"
                      :class="[
                        image.inStock ? 'text-green-500' : 'text-rose-500',
                      ]"
                    >
                      {{
                        image.inStock === true ? 'Available' : 'Out of Stock'
                      }}
                    </p>
                  </div>
                </div>
                <hr class="mt-3" />
                <div class="flex justify-end mt-3">
                  <button
                    @click="showEditModal(product._id, image._id)"
                    class="px-2 py-1 rounded-md text-white bg-green-600 text-sm hover:bg-green-500 hover:bg-text-500 hover:shadow-lg flex items-center justify-center"
                  >
                    <span>
                      <Icon
                        name="heroicons:pencil-square"
                        class="text-white w-5 h-5 mr-1"
                      />
                    </span>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else-if="product.category === 'kids-bottle'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5"
        >
          <div v-for="image in product.images" :key="image._id">
            <div
              class="border border-gray-300 shadow-md p-4 rounded-lg space-y-4"
            >
              <div class="bg-slate-100 rounded-lg py-4">
                <img
                  :src="image.url"
                  :alt="product.title"
                  class="object-contain shrink-0 w-full h-[150px]"
                />
              </div>

              <div>
                <h3 class="text-sm font-bold mb-3">{{ product.title }}</h3>
                <div class="flex flex-wrap justify-between gap-x-10 gap-y-2">
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Color
                    </h2>
                    <p class="text-sm">{{ image.color }}</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Price
                    </h2>
                    <p class="text-sm">KSH.{{ image.price }}</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Capacity
                    </h2>
                    <p class="text-sm">{{ image.capacity }} ml</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      Color Code
                    </h2>
                    <p class="text-sm">{{ image.colorCode }}</p>
                  </div>
                  <div class="">
                    <h2 class="text-gray-400 font-semibold text-xs -mb-1">
                      In Stock
                    </h2>
                    <p
                      class="text-sm"
                      :class="[
                        image.inStock ? 'text-green-500' : 'text-rose-500',
                      ]"
                    >
                      {{
                        image.inStock === true ? 'Available' : 'Out of Stock'
                      }}
                    </p>
                  </div>
                </div>
                <hr class="mt-3" />
                <div class="flex justify-end mt-3">
                  <button
                    @click="showEditModal(product._id, image._id)"
                    class="px-2 py-1 rounded-md text-white bg-green-600 text-sm hover:bg-green-500 flex items-center justify-center"
                  >
                    <span>
                      <Icon
                        name="heroicons:pencil-square"
                        class="text-white w-5 h-5 mr-1"
                      />
                    </span>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3 class="text-3xl font-semibold">Loading...</h3>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="isEditModalVisible"
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div class="relative bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h3 class="text-lg font-bold text-center">Edit Product</h3>
              <div class="absolute top-3 right-4">
                <button
                  @click="closeEditModal"
                  class="inline-flex justify-center px-4 py-2 text-sm font-bold text-blue-500 bg-gray-100 border border-gray-100 rounded-md hover:bg-gray-200 hover:border-gray-200"
                >
                  X
                </button>
              </div>
              <hr class="my-2" />
              <div class="space-y-4">
                <!-- <div class="text-xs">{{ formData }}</div> -->

                <div>
                  <div class="bg-slate-100 rounded-lg py-4">
                    <img
                      :src="formData.url"
                      :alt="formData.color"
                      class="object-contain shrink-0 w-full h-[150px]"
                    />
                  </div>
                </div>

                <div class="block -space-y-1">
                  <label class="text-xs">Color</label>
                  <!-- :value="editItem.title" -->
                  <input
                    v-model="formData.color"
                    type="text"
                    class="block w-full px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:border-gray-400 sm:focus:border-indigo-40"
                  />
                </div>
                <div class="flex justify-between space-y-1">
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      v-model="formData.isNewProduct"
                      type="checkbox"
                      value=""
                      class="sr-only peer"
                      checked
                    />
                    <div
                      class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                    <span class="ms-3 text-sm"
                      >Is a new product? ({{ formData.isNewProduct }})</span
                    >
                  </label>

                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      v-model="formData.inStock"
                      type="checkbox"
                      value=""
                      class="sr-only peer"
                      checked
                    />
                    <div
                      class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                    <span class="ms-3 text-sm"
                      >In Stock? ({{ formData.inStock }})</span
                    >
                  </label>
                </div>
                <div class="block -space-y-1">
                  <label class="text-xs">Price (KSH.)</label>
                  <!-- :value="editItem.title" -->
                  <input
                    v-model="formData.price"
                    type="text"
                    class="block w-full px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:border-gray-400 sm:focus:border-indigo-40"
                  />
                </div>
                <div class="block -space-y-1">
                  <label class="text-xs">Product Hexadecimal Color Code</label>
                  <!-- :value="editItem.title" -->
                  <input
                    v-model="formData.colorCode"
                    type="text"
                    class="block w-full px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:border-gray-400 sm:focus:border-indigo-40"
                  />
                </div>
                <div class="block -space-y-1">
                  <label class="text-xs">Bottle Capacity (ml)</label>
                  <!-- :value="editItem.title" -->
                  <input
                    v-model="formData.capacity"
                    type="text"
                    class="block w-full px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:border-gray-400 sm:focus:border-indigo-40"
                  />
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-between"
            >
              <button
                @click="
                  handleItemUpdate(
                    productStore?.product?._id,
                    formData // `${editingProductId}`,
                  )
                "
                :disabled="!isChanged"
                type="button"
                class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto"
                :class="[
                  !isChanged
                    ? 'bg-green-200 text-green-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-500',
                ]"
              >
                {{ isEditMode ? 'Update' : 'Save' }}
              </button>
              <button
                @click="closeEditModal"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-orange-300 hover:bg-orange-600 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
