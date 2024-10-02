
import Payment from '../../models/Payment.model'


export default defineEventHandler(async (event) => {
  try {

    const payments = await Payment.find().sort({ createdAt: -1 })

    // console.log('PAYMENTS', payments);


    if (!payments) {
      throw createError({
        statusCode: 400,
        statusMessage: 'There are no payments yet!'
      })
    }

    return payments

  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred fetching payment data'
    })
  }
})