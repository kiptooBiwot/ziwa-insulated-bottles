import Order from '../../models/Order.model'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  try {
    const newOrder = new Order({
      ...body
    })
    const savedOrder = await newOrder.save()
    return savedOrder
  } catch (error) {
    // console.log(error)

    throw createError({
      statusCode: 400,
      statusMessage: 'And error occurred, please try again.'
    })
  }
})

