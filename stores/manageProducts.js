

export const useManageProductsStore = defineStore('manageProductsStore', {
  state: () => ({
    products: [],
    product: null,
    imageDetails: null,
  }),
  getters: {

  },
  actions: {
    async fetchProducts() {
      // const response = await $fetch('/products/getAllProducts')
      const products = await $fetch('/product/getAllProducts', {
        method: 'GET',
      })

      this.products = products
    },
    async deleteProduct(productId) {
      await $fetch(`/products/deleteProduct/${productId}`, { method: 'DELETE' })
      this.products = this.products.filter((product) => product._id !== productId)
    },

    async updateProduct(productId, payload) {
      try {

        console.log('PRODUCT ID: ' + productId);
        console.log('Payload: ' + payload);


        const response = await $fetch('/product/updateProductImageDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId, payload })
        })

        // console.log('RESPONSE STATE: ' + response);

        if (response.statusCode === 201) {
          await this.fetchProducts();

        }

        return response

      } catch (error) {
        return error
      }
    },
    getProductById(productId, imageId) {

      if (productId && imageId) {

        const product = this.products.find((product) => product._id === productId)

        this.product = product

        if (this.product !== null) {
          this.imageDetails = this.product.images.find(item => item._id === imageId)
        }
      }
    },


  }

})