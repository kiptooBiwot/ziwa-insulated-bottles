
export const useOrderStore = defineStore('orders', {
  state: () => ({
    allOrders: [],
    cartOrders: [],
    payments: [],
    otherData: [],
    singleOrder: null,
    singleCartItem: null,
    dashboardSummary: [
      { title: 'Total Orders', color: 'bg-rose-500', icon: 'heroicons:shopping-cart', number: 0 },
      { title: 'Total Sales', color: 'bg-orange-500', icon: 'heroicons:credit-card', number: 0 },
      { title: 'Customers', color: 'bg-yellow-500', icon: 'heroicons:users', number: 0 },
      { title: 'Products', color: 'bg-blue-500', icon: 'heroicons:gift', number: 0 },
    ]
  }),
  actions: {

    async getAllOrders() {
      try {
        const orders = await $fetch('/order/getAllOrders', {
          method: 'GET',
        })


        if (orders) {
          this.allOrders = orders
          // this.products.push(orders.products)
        }
      } catch (error) {
        return error
      }
    },

    async getOneOrder(id) {
      try {
        const order = this.allOrders.find((item) => {
          return item._id === id
        })

        // console.log('SINGLE ORDER STORE:', order);

        this.singleOrder = order

        // this.singleOrder.deliveryRoute = order.deliveryRoute
        // this.singleOrder.deliveryLocation = order.deliveryLocation
        // this.singleOrder.deliveryCost = order.deliveryCost
        // this.singleOrder.isPaidFor = order.isPaidFor
        // this.singleOrder.orderedBy = order.orderedBy
        // this.singleOrder.payment = order.payment
        // this.singleOrder.products.push(order.products)

      } catch (error) {
        return error
      }
    },

    async getDashboardData() {
      const response = await $fetch('/order/getDashboardData', {
        method: 'GET'
      })

      // console.log('DASHBOARD DATA:', response);

      this.dashboardSummary = [
        { title: 'Total Orders', color: 'bg-rose-500', icon: 'heroicons:shopping-cart', number: response.allOrders },
        { title: 'Total Sales', color: 'bg-orange-500', icon: 'heroicons:credit-card', number: response.allPayments },
        { title: 'Customers', color: 'bg-yellow-500', icon: 'heroicons:users', number: response.allUsers },
        { title: 'Products', color: 'bg-blue-500', icon: 'heroicons:gift', number: response.allProducts },
      ]

    },

    async getAllPayments() {
      try {
        const payments = await $fetch('/order/getAllPayments', {
          method: 'GET',
        })


        if (payments.length > 0) {
          this.payments = payments
          // this.products.push(orders.products)
        }
      } catch (error) {
        return error
      }
    },

    async getIncompleteOrders() {
      try {
        const cartOrders = await $fetch('/order/getAllCartOrders', {
          method: 'GET',
        })


        if (cartOrders.length > 0) {
          this.cartOrders = cartOrders
          // this.products.push(orders.products)
        }
      } catch (error) {
        return error
      }
    },

    async getSingleCartItem(id) {
      try {
        const item = this.cartOrders.find((item) => {
          return item._id === id
        })

        // console.log('SINGLE ORDER STORE:', order);

        this.singleCartItem = item

      } catch (error) {
        return error
      }
    },
  }
})