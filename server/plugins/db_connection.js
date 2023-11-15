
import mongoose from 'mongoose'

export default defineNitroPlugin(async (nitroApp) => {

  const config = useRuntimeConfig()

  try {
    await mongoose.connect(config.MONGODB_URI)

    console.log('MongoDB connected......')
  } catch (error) {
    console.log(error)
  }
}) 