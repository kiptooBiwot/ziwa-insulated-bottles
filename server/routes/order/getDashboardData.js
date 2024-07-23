import Orders from '../../models/Order.model'
import Payments from '../../models/Payment.model'
import Users from '../../models/User.model'
import Products from '../../models/Product.model'

export default defineEventHandler(async (event) => {
  try {

    const orders = await Orders.find()
    const payments = await Payments.find()
    const users = await Users.find()
    const products = await Products.find()

    if (!orders) {
      throw createError({
        statusCode: 400,
        statusMessage: 'There are no orders yet!'
      })
    }

    const allOrders = orders.length
    const allPayments = payments.length
    const allUsers = users.length
    const allProducts = products.length

    return { allOrders, allPayments, allUsers, allProducts }

  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred fetching product data'
    })
  }
})