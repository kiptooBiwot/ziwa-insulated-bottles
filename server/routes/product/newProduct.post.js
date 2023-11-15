import Product from "@/server/models/Product.model"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)


    // console.log('BODY: ', body);

    if (!body) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Please fill in all the required fields.'
      })
    }

    const product = new Product({
      ...body
    })

    const savedProduct = await product.save()

    return { message: "Product saved", savedProduct }
  } catch (error) {
    // console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred - newProduct.post.js '
    })
  }
})