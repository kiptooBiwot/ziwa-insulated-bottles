
import Coupon from '../../../models/Coupon.model'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  console.log('THE PARAMS ID: ' + id);


  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id)

    if (!deletedCoupon) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Coupon not found.'
      })
    }
    return { success: true, message: 'Coupon deleted successfully' }
  } catch (error) {
    return { success: false, message: error.message }
  }
})