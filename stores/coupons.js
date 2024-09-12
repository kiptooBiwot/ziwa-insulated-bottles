

export const useCouponStore = defineStore('coupon', {
  state: () => ({
    coupons: [],
    validatedCoupon: null
  }),
  getters: {
    getCouponById: (state) => (id) => {
      return state.coupons.find((coupon) => coupon._id === id)
    },
  },
  actions: {
    async fetchCoupons() {
      const response = await $fetch('/coupons/getAllCoupons')

      const coupons = response
      this.coupons = coupons
    },


    async createCoupon(payload) {

      try {
        const response = await $fetch('/coupons/newCoupon', {
          method: 'POST',
          body: {
            code: code.value,
            discountType: discountType.value,
            discount: discount.value,
            expirationDate: date.value,
          },
        })


        if (response) {

          if (this.coupons.length < 1) {
            this.fetchCoupons()
          } else {
            this.coupons.push(response.data)
          }

          return response.message
        } else {
          console.error('Failed to create coupon')
          return 'Failed to create coupon'
        }
      } catch (error) {
        return error
      }

    },

    async applyCoupon(payload) {
      try {
        const coupon = await $fetch('/coupons/validateCoupon', {
          method: 'POST',
          body: {
            code: payload,
          },
        })

        if (coupon) {
          this.validatedCoupon = coupon
          return coupon
        }
      } catch (error) {
        console.log('VALIDATION FAIL ERROR', error);
        return error

      }
    },

    async deleteCoupon(id) {

      try {
        const response = await $fetch(`/coupons/deleteCoupon/${id}`, {
          method: 'DELETE',
        })

        if (response.success) {
          this.coupons = this.coupons.filter((coupon) => coupon._id !== id)

          return response.message
        }

      } catch (error) {
        return error.message
      }
    }
  },
})