import Payment from "../../models/Payment.model";

export default defineEventHandler(async (event) => {
  try {
    const transactionId = getRouterParam(event, 'transactionId')
    // const body = await readBody(event)
    // console.log('TRANSACTION ID', transactionId);
    const paymentDetail = await Payment.findOne({ transactionID: transactionId })

    // console.log(paymentDetail);
    if (paymentDetail == null) {
      return createError({
        statusCode: 400,
        statusMessage: 'The M-PESA transaction ID/code is not correct. Please try again.',
        // message: 'Please ensure you entered the correct M-PESA transaction code'
      })
    }

    return paymentDetail
  }
  catch (error) {
    console.log(error);
    // return error
    // throw createError({
    //   statusCode: 400,
    //   statusMessage: '',
    //   message: 'Please ensure you entered the correct M-PESA transaction code'
    // })
  }
})