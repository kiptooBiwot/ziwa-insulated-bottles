import { model, Schema } from 'mongoose'


const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discount: {
    type: Number,
    required: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active'
  }
}, { timestamps: true })

export default model('Coupon', couponSchema)