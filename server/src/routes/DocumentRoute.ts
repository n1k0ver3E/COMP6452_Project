import express from 'express'
import { DocumentController } from '../controllers'
import multer = require('multer')

const upload = multer({ dest: 'uploads/' })
const router = express.Router()

router
  .route('/')
  .post(upload.single('avatar'), DocumentController.uploadDocument)

export default router
