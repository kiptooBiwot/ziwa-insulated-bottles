import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
  deliveryRoute: {
    type: String
  },
  deliveryLocation: {
    type: String
  },
  deliveryCost: {
    type: String
  },
  isPaidFor: {
    type: Boolean,
    default: false
  },
  products: {
    type: Array,
    required: true
  },
  orderedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }
}, { timestamps: true })

export default model('Order', orderSchema)