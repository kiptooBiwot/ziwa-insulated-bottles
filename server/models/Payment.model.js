import { model, Schema } from 'mongoose'

// MerchantRequestID: String,
//   CheckoutRequestID: String,
//     ResultCode: Number,
//       ResultDesc: String,
//         Amount: Number,
//           MpesaReceiptNumber: String,
//             Balance: Number,
//               TransactionDate: Date,
//                 PhoneNumber: Number

const paymentSchema = new Schema({
  MerchantRequestID: String,
  CheckoutRequestID: String,
  ResultCode: Number,
  ResultDesc: String,
  Amount: Number,
  MpesaReceiptNumber: String,
  Balance: Number,
  TransactionDate: Date,
  PhoneNumber: Number
  // phoneNumber: { type: String, required: true },
  // transactionID: { type: String, required: true },
  // amount: { type: String, required: true },
  // transactionTime: { type: Date, required: true }
}, { timestamps: true })

export default model('Payment', paymentSchema)