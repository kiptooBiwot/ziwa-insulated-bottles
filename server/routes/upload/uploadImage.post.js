import multer from 'multer'
import { callNodeListener } from 'h3'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

export default defineEventHandler(async (event) => {

  await callNodeListener(upload.single('file'), event.node.req, event.node.res)

  return { message: 'success' }
})