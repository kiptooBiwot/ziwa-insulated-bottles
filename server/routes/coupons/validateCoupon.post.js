import Coupon from '../../models/Coupon.model'


export default defineEventHandler(async (event) => {

  const { code } = await readBody(event)
  // const code = body.code

  console.log('CODE SERVER: ' + code);


  try {
    const coupon = await Coupon.findOne({ code, isActive: true })

    if (!coupon) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid coupon code or expired'
      })
    }

    return coupon
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not verify the coupon. Please try again'
    })
  }
})