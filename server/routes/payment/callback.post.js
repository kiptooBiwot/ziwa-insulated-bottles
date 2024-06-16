
import Payment from '@/server/models/Payment.model'
export default defineEventHandler(async (event) => {

  const callbackData = await readBody(event)

  const response = callbackData.Body.stkCallback

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

  // console.log('TRANSACTION:', transaction);

  const payment = new Payment({
    ...transaction
  })

  // console.log('PAYMENT TO BE SAVED:', payment);

  await payment.save()
  // console.log('SAVED PAYMENT:', savedPayment);

  return 'success'
})