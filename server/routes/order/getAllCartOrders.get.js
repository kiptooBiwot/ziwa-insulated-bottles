import Cart from '../../models/Cart.model'

export default defineEventHandler(async (event) => {
  try {

    const cart = await Cart.find().populate('orderedBy').sort({ createdAt: -1 })

    if (!cart) {
      throw createError({
        statusCode: 400,
        statusMessage: 'There are no orders yet!'
      })
    }

    return cart

  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred fetching product data'
    })
  }
})