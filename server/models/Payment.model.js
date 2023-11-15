import { model, Schema } from 'mongoose'

const paymentSchema = new Schema({
  phoneNumber: { type: String, required: true },
  transactionID: { type: String, required: true },
  amount: { type: String, required: true },
  transactionTime: { type: Date, required: true }
}, { timestamps: true })

export default model('Payment', paymentSchema)