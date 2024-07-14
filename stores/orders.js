
export const useOrderStore = defineStore('orders', {
  state: () => ({
    allOrders: []
  }),
  actions: {

    async getAllOrders() {
      try {
        const orders = await $fetch('/order/getAllOrders', {
          method: 'GET',
        })

        if (orders) {
          this.allOrders = orders
        }
      } catch (error) {
        return error
      }
    },

    async getOneOrder(id) {
      try {
        return this.allOrders.find((item) => {
          return item._id === id
        })

      } catch (error) {
        return error
      }
    }
  }
})