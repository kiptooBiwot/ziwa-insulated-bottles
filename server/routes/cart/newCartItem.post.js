import Cart from '../../models/Cart.model'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  try {
    const newCart = new Cart({
      ...body
    })

    const savedCart = await newCart.save()

    return savedCart
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'And error occurred, please try again.'
    })
  }
})