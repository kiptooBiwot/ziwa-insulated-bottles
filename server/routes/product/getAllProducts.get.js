import Product from "../../models/Product.model";

export default defineEventHandler(async (event) => {
  try {
    const products = await Product.find({})

    if (!products) {
      throw createError({
        statusCode: 400,
        statusMessage: 'The database seems to have no products saved. You may want to create a new product'
      })
    }

    return products
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred fetching product data'
    })
  }
})