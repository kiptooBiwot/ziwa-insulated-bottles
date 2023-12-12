import Payment from "../../models/Payment.model"

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  // console.log('VALIDATING BACKEND');
  // console.log('BODY DATA:', body);

  const MerchantRequestID = body.MerchantRequestID
  try {
    let transaction = undefined

    do {
      transaction = await Payment.findOne({ MerchantRequestID })
      // console.log('RUNNING THE DO...WHILE');
      // console.log('TRANSACTION VALUE:', transaction);
    }
    while (transaction === undefined)

    // console.log('TRANSACTION FROM DB:', transaction);
    if (transaction == undefined) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Cannot find your transaction. Please try again. '
      })
    }

    // console.log('TRANSACTION VERIFIED', transaction);
    return transaction
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error
    })
  }
}) 