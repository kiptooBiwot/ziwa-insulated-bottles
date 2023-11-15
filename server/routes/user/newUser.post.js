import User from '@/server/models/User.model'


export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  // console.log('USER BODY', body);

  try {
    const newUser = new User({
      ...body
    })

    const savedUser = await newUser.save()
    // console.log('USER:', savedUser)

    return savedUser
  } catch (error) {
    // console.log('eRROR:', error);
    throw createError({
      statusCode: 400,
      statusMessage: 'Something went wrong. Please try again'
    })
  }
})