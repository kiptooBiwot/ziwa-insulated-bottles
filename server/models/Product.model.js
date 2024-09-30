import { Schema, model } from "mongoose"

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
  },
  features: [{
    description: {
      type: String
    },
    icon: String
  }],
  images: [{
    url: {
      type: String,
    },
    color: String,
    price: {
      type: Number,
      required: true,
      trim: true
    },
    capacity: {
      type: Number,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: false,
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
      required: true,
    },
    colorCode: {
      type: String,
    },
    isNewProduct: {
      type: Boolean,
      required: true,
      default: false
    }
  }]
}, { timestamps: true })

export default model('Product', productSchema)