import Coupon from '../../models/Coupon.model'


export default defineEventHandler(async (event) => {

  try {

    const coupons = await Coupon.find().sort({ _id: -1 })

    if (!coupons) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No coupon records found'
      })
    }

    return coupons

  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while fetching coupon information'
    })
  }
})