import Coupon from '../../models/Coupon.model'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  try {

    const newCoupon = new Coupon({
      ...body
    })

    const savedCoupon = await newCoupon.save()

    return { data: savedCoupon, message: 'The coupon was saved successfully' }

  } catch (error) {
    console.log('SAVE COUPON ERROR:', error);

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while creating the coupon.',
    })
  }
})