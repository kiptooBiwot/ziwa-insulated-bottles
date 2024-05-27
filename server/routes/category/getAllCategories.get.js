import Category from '../../models/Category.model'

export default defineEventHandler(async (event) => {

  try {
    const categories = await Category.find({})

    if (!categories) {
      throw createError({
        statusCode: 400,
        statusMessage: 'There are no categories saved yet.'
      })
    }

    return categories
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while fetching categories'
    })
  }
})