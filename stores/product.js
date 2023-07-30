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
    customizationFee: 0,
    customizedBottle: false,

    products: [
      {
        productId: 100,
        title: 'Ziwa Insulated Bottle',
        images: [
          {
            id: 1001,
            url: bottle,
            color: 'Jungle Green',
            bottleColor: '#1D4D4B',
            bottleTitle: 'Jungle Green Water Bottle'
          },
          {
            id: 1002,
            url: bottle2,
            color: 'Grey',
            bottleColor: '#435A76',
            bottleTitle: 'Grey Water Bottle'
          },
          {
            id: 1003,
            url: bottle3,
            color: 'Wine Red',
            bottleColor: '#810820',
            bottleTitle: 'Wine Red Water Bottle'
          },
          {
            id: 1004,
            url: bottle4,
            color: 'Mint',
            bottleColor: '#96C0CF',
            bottleTitle: 'Mint Water Bottle'
          },
          {
            id: 1005,
            url: bottle5,
            color: 'Navy',
            bottleColor: '#001541',
            bottleTitle: 'Navy Water Bottle'
          },
          {
            id: 1006,
            url: bottle6,
            color: 'Shadow',
            bottleColor: '#000013',
            bottleTitle: 'Shadow Water Bottle'
          },
          {
            id: 1007,
            url: bottle7,
            color: 'Orange',
            bottleColor: '#A33806',
            bottleTitle: 'Orange Water bottle'
          },
          {
            id: 1008,
            url: bottle8,
            color: 'Blush',
            bottleColor: '#8D596A',
            bottleTitle: 'Blush Water Bottle'
          },
        ],
        price: 1800,
        capacity: '750ml',
        slug: 'ziwa-insulatecd-water-bottle',
        productDescription: '<p> Ziwa premium insulated water bottle, designed to keep you hydrated and refreshed throughout the day. Crafted with precision and innovation, this exceptional water bottle offers a perfect blend of functionality and style.</p>',
        productDesc: '<p>Experience the ultimate in hydration convenience and reliability with our insulated water bottle. It\'s time to elevate your hydration game and make every sip count.</p>',
        productFeatures: [
          {
            icon: 'carbon:temperature-hot',
            description: 'Superior temperature retention'
          },
          {
            icon: 'icon-park-outline:anti-corrosion',
            description: 'Corrosion resistant stainless steel'
          },
          {
            icon: 'game-icons:chemical-drop',
            description: 'BPA (Bisphenol A) Free'
          },
          {
            icon: 'game-icons:leak',
            description: 'Leak proof design'
          },
          {
            icon: 'mdi:hand',
            description: 'Comfortable grip'
          }
        ],
      },
    ],
    product: null,
    cart: [],
  }),
  // persist: {
  //   storage: persistedState.localStorage
  // },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    getSingleProduct(slug) {
      this.products.find((product) => {
        if (product.slug === slug) {
          this.product = product
        }
      })
    }
  },
})