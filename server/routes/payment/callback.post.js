
import Payment from '@/server/models/Payment.model'
export default defineEventHandler(async (event) => {

  const callbackData = await readBody(event)

  // if (!callbackData.Body.stkCallback.CallbackMetadata) {
  //   return 'OK'
  // }

  // console.log('CALLBACK RESPONSE', callbackData);

  // const response = callbackData.Body.stkCallback.CallbackMetadata
  const response = callbackData.Body.stkCallback

  console.log('CALLBACK RESPONSE', response);

  const transaction = {
    MerchantRequestID: response.MerchantRequestID,
    CheckoutRequestID: response.CheckoutRequestID,
    ResultCode: response.ResultCode,
    ResultDesc: response.ResultDesc,
    Amount: response.CallbackMetadata?.Item[0].Value,
    MpesaReceiptNumber: response.CallbackMetadata?.Item[1].Value,
    Balance: response.CallbackMetadata?.Item[2].Value,
    TransactionDate: response.CallbackMetadata?.Item[3].Value,
    PhoneNumber: response.CallbackMetadata?.Item[4].Value,
  };

  // const phoneNumber = response.Item[4].Value
  // const transactionID = response.Item[1].Value
  // const amount = response.Item[0].Value
  // const transactionTime = response.Item[3].Value

  // console.log('PHONE:', phoneNumber);
  // console.log('TRANSACTION ID:', transactionID);
  // console.log('AMOUNT:', amount);
  // console.log('TRANSACTION TIME:', transactionTime);

  const payment = new Payment({
    ...transaction
  })

  await payment.save()

  return 'success'
})