import { defineStore } from 'pinia'
import bottle from '~/assets/images/products/bottle1-bg.png'
import bottle2 from '~/assets/images/products/bottle2-bg.png'
import bottle3 from '~/assets/images/products/bottle3-bg.png'
import bottle4 from '~/assets/images/products/bottle4-bg.png'
import bottle5 from '~/assets/images/products/bottle5-bg.png'
import bottle6 from '~/assets/images/products/bottle6-bg.png'
import bottle7 from '~/assets/images/products/bottle7-bg.png'
import bottle8 from '~/assets/images/products/bottle8-bg.png'

export const useProductStore = defineStore('product', {
  state: () => ({

    customName: '',
    selectedFont: '',
    textPosition: '',
    customizationFee: 0,
    customizedBottle: false,

    selectedProduct: null,

    isLoading: false,

    // Edit this to add a discount and the amount
    discountOffer: false,
    discountAmount: 0,

    dbProducts: [],
    product: null,
    cart: [],
    kidsProducts: null,

    // Filtered products by category
    filteredProduct: null,

    // product detail page id to select product color & image
    imageId: '',
    // destination: {
    deliveryRoute: [],
    deliveryLocation: '',
    deliveryCost: 0,
    orderUserId: '',
    mpesaProcessComplete: false,
    mpesaProcessCancelled: false,
    paymentResponse: null,
    paymentDetails: null
  }),
  // persist: {
  //   storage: persistedState.localStorage
  // },
  // could also be defined as
  // state: () => ({ count: 0 })
  getters: {
    discountedPrice: (state) => {

      state.dbProducts.forEach((product) => {
        if (product.category === 'big-bottle' || product.category === 'tumblers' || product.category === 'kids-bottle') {
          const newPrice = product.images.map((item) => {

            item.price -= state.discountAmount

            return item.price
          })

          // return newPrice
          // console.log('New Price', newPrice);
        }

      })
    },
    originalPrice: (state) => {
      state.dbProducts.forEach((product) => {
        if (product.category === 'big-bottle' || product.category === 'tumblers' || product.category === 'kids-bottle') {
          const originalPrice = product.images.map((item) => {
            // console.log('ORIGINAL PRICE', item.price);
            return item.price
          })
        }
      })
    }
  },
  actions: {
    async getAllProducts() {
      try {
        const response = await $fetch('/product/getAllProducts', {
          method: 'GET'
        })

        if (response) {
          this.dbProducts = response

          // console.log('DISCOUNT ON?', this.discountOffer);
          if (this.discountOffer && this.discountAmount > 0) {
            this.discountedPrice
          }
        }
      } catch (error) {
        // console.log('FETCHING PRODUCTS ERR', error);
        throw createError({
          statusCode: 500,
          statusMessage: 'Something went wrong while fetching all products'
        })
      }
    },


    getSingleProduct(slug) {
      this.dbProducts.find((product) => {
        if (product.slug === slug) {
          this.product = product
        }
      })
    },


    async getKidsProducts() {

      if (this.dbProducts.length > 0) {
        const matchingProduct = this.dbProducts.find((item) => {
          return item.category === 'kids-bottle'
        })
        this.kidsProducts = matchingProduct

      }
    },

    getProductCategory(payload) {
      this.isLoading = true

      if (this.dbProducts.length === 0) {
        this.getAllProducts()
      }

      if (payload === 'preorder') {
        // const filteredProducts = this.dbProducts.images.filter(
        //   (prod) => prod.inStock === false
        // )

        // const outOfStockImages = this.dbProducts.flatMap(product =>
        //   product.images.filter(image => image.inStock === false)
        // );
        const categorizedOutOfStockImages = this.dbProducts.map(product => ({
          id: product.id,
          title: product.title,
          description: product.description,
          slug: product.slug,
          features: product.features,
          category: product.category,
          outOfStockImages: product.images.filter(image => image.inStock === false)
        })).filter(category => category.outOfStockImages.length > 0);


        this.filteredProduct = categorizedOutOfStockImages
        this.isLoading = false
      }

      else {
        const product = this.dbProducts.filter(
          (prod) => prod.category === payload
        )

        this.filteredProduct = product
        this.isLoading = false
      }
    }
  },
})



