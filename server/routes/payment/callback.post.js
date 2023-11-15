
import Payment from '@/server/models/Payment.model'
export default defineEventHandler(async (event) => {

  // console.log('WE\'RE HITTING THE CALLBACK ROUTE!');

  const callbackData = await readBody(event)

  // console.log('BODY', callbackData)

  if (!callbackData.Body.stkCallback.CallbackMetadata) {
    // console.log('PAYMENT FAILURE', callbackData.Body.stkCallback.ResultDesc);
    return { message: callbackData.Body.stkCallback.ResultDesc }
  }

  // In Success, save response to database for future reference
  const response = callbackData.Body.stkCallback.CallbackMetadata
  // console.log('SUCCESS RESPONSE', response);

  const phoneNumber = response.Item[4].Value
  const transactionID = response.Item[1].Value
  const amount = response.Item[0].Value
  const transactionTime = response.Item[3].Value

  // console.log('PHONE:', phoneNumber);
  // console.log('TRANSACTION ID:', transactionID);
  // console.log('AMOUNT:', amount);
  // console.log('TRANSACTION TIME:', transactionTime);

  const payment = new Payment({
    phoneNumber,
    transactionID,
    amount,
    transactionTime
  })

  const savedPayment = await payment.save()

  return 'success'
})