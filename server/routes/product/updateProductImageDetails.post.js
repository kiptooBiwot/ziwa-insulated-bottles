import Product from '../../models/Product.model'

export default defineEventHandler(async (event) => {
  try {

    const { productId, payload } = await readBody(event)

    console.log('PRODUCT ID: ', productId)
    console.log('Image Id: ', payload._id)
    console.log('Payload: ', payload)


    const product = await Product.findById(productId)

    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: 'The product you\'re trying to update can not be found'
      })
    }

    const updatedProduct = await Product.updateOne({ _id: productId, 'images._id': payload._id }, { $set: { 'images.$': payload } }, { new: true })

    // console.log('UPDATED PRODUCT: ' + updatedProduct)

    // Clean the result if needed, e.g., by querying the updated product
    const productAfterUpdate = await Product.findById(productId).lean(); // Use `.lean()` to get a plain JS object


    console.log('Product after update', productAfterUpdate);



    // Update the product image details
    // const updatedProduct = produ

    return { status: 201, success: true, message: 'Product Updated successfully', updatedProduct }

  } catch (error) {
    console.log('ERROR:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred updating the product'
    })
  }
})