import { model, Schema } from 'mongoose'

const cartSchema = Schema({
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
}, { timestamps: true })


export default model('Cart', cartSchema)