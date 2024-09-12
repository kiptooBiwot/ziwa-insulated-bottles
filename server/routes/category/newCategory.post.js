import Category from '@/server/models/Category.model'


export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // console.log('REQ.BODY:', body);

    if (!body) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Please fill in all the required fields.'
      })
    }

    const category = new Category({
      title: body.category
    })

    console.log('CATEGORY:', category);

    const savedCategory = await category.save()

    return { message: 'CategorySaved', savedCategory }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred - newProduct.post.js '
    })
  }
})