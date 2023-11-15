<script setup>
const nuxtApp = useNuxtApp()

definePageMeta({
  layout: 'dashboard'
})

const slugify = nuxtApp.slugify

const setSlug = computed(() => {
  product.slug = slugify(product?.title, { trim: true, lower: true, strict: true })
  return product.slug
})

const product = reactive({
  title: '',
  description: '',
  slug: '',
  features: [{
    description: '',
    icon: ''
  }],
  images: [{
    // id: generateId(),
    url: '',
    color: '',
    price: 0,
    capacity: 0,
    imageUrl: '',
    colorCode: ''
  }]

})
const isUploadingImage = ref(false)
const isSavingProduct = ref(false)

const removeImageDetails = (index) => {

  if (index >= 1) {
    product.images.splice(index, 1)

  }
  else {
    product.images[0] = {
      // id: '',
      url: '',
      color: '',
      price: 0,
      capacity: 0,
      slug: '',
      colorCode: ''
    }
  }
}

const onChange = async (e, index) => {
  isUploadingImage.value = true
  const image = e.target.files[0]

  const url = URL.createObjectURL(image);


  const formData = new FormData();

  // console.log('Image File', image.name);

  formData.append('file', image);
  const resp = await $fetch('/upload/uploadImage', {
    method: 'post',
    body: formData,
  })

  if (resp.message == 'success') {
    product.images[index].imageUrl = `../../assets/images/uploads/${image.name}`
    product.images[index].url = `../../assets/images/uploads/${image.name}`

    isUploadingImage.value = false
  }
  // console.log('FE RESPONSE: ', resp)
  isUploadingImage.value = false
}

const removeImage = (index) => {
  product.images[index].imageUrl = ''
  product.images[index].url = ''
  // images.value = images.value.filter((img) => img !== image)
}

const addNewProductImage = () => {
  // console.log('ADD PRODucT CLICKED!')
  // console.log('PRODUCT', product.images);

  product.images.push({
    // id: generateId(),
    url: '',
    color: '',
    price: 0,
    capacity: 0,
    slug: '',
    colorCode: ''
  })
}

const addFeature = () => {
  product.features.push({
    description: '',
    icon: ''
  })
}

const removeFeatures = (index) => {

  if (index >= 1) {
    product.features.splice(index, 1)

  }
  else {
    product.features[0] = {
      description: '',
      icon: '',
    }
  }
}

const saveProduct = async (index) => {
  isSavingProduct.value = true
  if (product) {

    const response = await $fetch('/product/newProduct', {
      method: 'POST',
      body: product
    })

    isSavingProduct.value = false
    // console.log('REsPONSE', response)
  }


}



</script>

<template>
  <div>
    <!-- Run the slug computed method -->
    <div class="hidden">{{ setSlug }}</div>

    <div class="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-10">
      <h2 class="text-2xl font-bold text-gray-600 mb-3">Add a New Product</h2>
      <div class="space-y-2">
        <div class="grid space-y-1">
          <label for="" class="text-xs">Product Name</label>
          <input type="text" v-model="product.title" class="border px-4 py-2 rounded-md">
        </div>
        <div class="grid space-y-1">
          <label for="" class="text-xs">Product Description</label>
          <textarea v-model="product.description" class="border px-4 py-2 text-sm rounded-md"></textarea>
        </div>

        <div class="pb-10">
          <h3 class="text-lg font-semibold text-gray-700">Features</h3>


          <div v-for="(feature, index) in product.features" :key="index">
            <div class="border rounded-md py-3 px-3 shadow-md my-3">
              <div class="w-full flex justify-end" :class="[index === 0 ? 'hidden' : 'block']">
                <Icon name="heroicons:x-mark"
                  class="w-4 h-4 hover:border rounded-md hover:bg-slate-100 transition duration-300 ease-in-out"
                  @click="removeFeatures(index)" />
              </div>
              <div class="grid gap-5 md:flex">
                <div class="grid space-y-1 w-full">
                  <label for="" class="text-xs">Feature Description</label>
                  <input type="text" v-model="feature.description" class="border px-4 py-2 rounded-md">
                </div>
                <div class="grid space-y-1 w-full">
                  <label for="" class="text-xs">Feature Icon</label>
                  <input type="text" v-model="feature.icon" placeholer="E.g. \'carbon:temperature-hot\' "
                    class="border px-4 py-2 rounded-md">
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button class="text-white bg-rose-500 flex px-6 py-1 rounded-md justify-end font-semibold text-sm"
              @click.prevent="addFeature">Add Feature</button>
          </div>
        </div>

        <!-- <div class="border rounded-md p-5"> -->
        <!-- <legend>
            <h4 class="font-medium">Upload Product Image</h4>
          </legend> -->
        <div v-for="(imageDetails, index) in product.images" :key="index"
          class="bg-white w-full border h-auto p-6 mb-8 shadow rounded-lg">
          <!-- <div> -->
          <div class="w-full flex justify-end">
            <Icon name="heroicons:x-mark"
              class="w-6 h-6 hover:border rounded-md hover:bg-slate-100 transition duration-300 ease-in-out"
              @click="removeImageDetails(index)" />
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <div v-if="!imageDetails.imageUrl" class="flex items-center justify-center w-full">
                <label for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-12 mb-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <div class="flex gap-2 items-center">
                      <svg class="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p class=" text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                          upload product image</span>
                        <!-- or drag and drop -->
                      </p>
                    </div>
                    <!-- <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> -->
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" @change="onChange($event, index)" />
                </label>
              </div>
              <div class="relative">
                <Spinner v-if="isUploadingImage" class="absolute inset-0 flex justify-center items-center" />
                <img :src="imageDetails.imageUrl" alt="" class="w-full h-auto rounded-lg object-cover overflow-hidden">
                <div
                  class="absolute top-0 h-full w-full bg-black bg-opacity-25 overflow-hidden flex items-center justify-center">
                  <button v-if="imageDetails.imageUrl"
                    class="text-white hover:bg-white rounded-full hover:bg-opacity-25 p-3 focus:outline-none transition duration-300 text-xs"
                    @click="removeImage(index)">
                    <Icon name="heroicons:x-mark-20-solid" class="w-6 h-6 text-white" />
                    <!-- </svg> -->
                  </button>
                </div>
              </div>
            </div>
            <div class="w-full space-y-3">
              <div class="grid space-y-1">
                <label for="" class="text-xs">Price</label>
                <input type="number" v-model="imageDetails.price" class="border px-4 py-2 rounded-md">
              </div>
              <div class="grid space-y-1">
                <label for="" class="text-xs">Capacity (Milliliters)</label>
                <input type="number" v-model="imageDetails.capacity" class="border px-4 py-2 rounded-md">
              </div>
              <div class="grid space-y-1">
                <label for="" class="text-xs">Product Color</label>
                <input v-model="imageDetails.color" class="border px-4 py-2 rounded-md" />
              </div>
              <div class="grid space-y-1">
                <label for="" class="text-xs">Product Color Code E.g. (#1D4D4B)</label>
                <input v-model="imageDetails.colorCode" class="border px-4 py-2 rounded-md" />
              </div>
            </div>
          </div>
          <!-- </div> -->
        </div>
        <div class="flex justify-end">
          <button class="text-white bg-rose-500 flex px-6 py-1 rounded-md justify-end font-semibold text-sm"
            @click.prevent="addNewProductImage">Add New
            Product Image</button>
        </div>
        <!-- </div> -->

        <!-- <div class="grid space-y-1">
          <label for="" class="text-xs">
            Product Images
          </label>
          <div class="flex items-center justify-center w-full">
            <label for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                    upload</span>
                   or drag and drop -->
        <!-- </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" multiple class="hidden" @change="onChange" />
            </label>
          </div>
          <div class="gap-5 flex-wrap flex">
            <div v-for="(image, index) in images" :key="index" class="mt-5 relative">
              <img :src=image alt="" class=" w-[140px] rounded-md h-auto object-fill"> -->
        <!-- <div class="absolute inset-0 hidden justify-center items-center bg-black bg-opacity-30 hover:block">
                  <Icon name="ic:baseline-delete" class="text-white w-5 h-5 z-10" />
                </div> -->
        <!-- <div class="absolute top-0 h-full w-full bg-black bg-opacity-25 flex items-center justify-center"> -->
        <!-- <button
                  class="text-white hover:bg-white rounded-full hover:bg-opacity-25 p-3 focus:outline-none transition duration-300 text-xs"
                  @click="browse">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button> -->
        <!-- <button v-if="image"
                  class="text-white hover:bg-white rounded-full hover:bg-opacity-25 p-3 focus:outline-none transition duration-300 text-xs"
                  @click="removeImage(image)">
                  <Icon name="heroicons:x-mark-20-solid" class="w-6 h-6 text-white" /> -->
        <!-- <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg> -->
        <!-- </button> -->
        <!-- </div> -->
        <!-- </div> -->
        <!-- </div> -->
        <hr class="pb-3 mt-4">
        <div class="flex justify-between">
          <button class="uppercase bg-orange-600 text-white px-6 py-3 rounded-sm text-sm font-semibold">Cancel</button>
          <!-- <button class="uppercase bg-green-600 text-white px-6 py-3 rounded-sm text-sm font-semibold"
            @click.prevent="saveProduct">Save
            Product</button> -->
          <button type="button"
            class="bg-green-600 h-max w-max rounded-lg text-white font-medium uppercase text-sm px-6 py-3 hover:bg-green-500 duration-[500ms,800ms]"
            :class="[isSavingProduct ? 'hover:cursor-not-allowed' : 'cursor-pointer']" @click.prevent="saveProduct"
            :disabled="isSavingProduct">
            <div v-if="isSavingProduct" class="flex items-center justify-center">
              <div class="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-2">
              </div>
              <div class="ml-2"> Processing... </div>
            </div>
            <div v-else>Save</div>
          </button>
        </div>
        <!-- </div> -->

      </div>
    </div>
  </div>
</template>
