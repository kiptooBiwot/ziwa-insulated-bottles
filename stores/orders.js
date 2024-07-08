
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
    }
  }
})