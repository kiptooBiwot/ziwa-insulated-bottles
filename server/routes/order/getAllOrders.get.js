import Orders from '../../models/Order.model'

export default defineEventHandler(async (event) => {
  try {

    const orders = await Orders.find().populate('orderedBy').populate('payment').sort({ createdAt: -1 })

    if (!orders) {
      throw createError({
        statusCode: 400,
        statusMessage: 'There are no orders yet!'
      })
    }

    return orders

  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred fetching product data'
    })
  }
})