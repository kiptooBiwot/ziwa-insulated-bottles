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
    // id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
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
    colorCode: {
      type: String,
    }
  }]
}, { timestamps: true })

export default model('Product', productSchema)