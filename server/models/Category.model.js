import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
  title: {
    type: String,
    required: true
  }
}, { timestamps: true })


export default model('Category', categorySchema)

