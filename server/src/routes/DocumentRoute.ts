import express from 'express'
import { DocumentController } from '../controllers'
import multer = require('multer')

const upload = multer({ dest: 'uploads/' })
const router = express.Router()

router
  .route('/')
  .post(upload.single('avatar'), DocumentController.uploadDocument)

router.route('/status').get(DocumentController.getDocumentsByStatus);



router
  .route('/verify/')
  .patch(DocumentController.updateDocStatusByAccIdSubDocId)

// router
//   .route('/:address')
//   .patch(DocumentController.uploadDocument)

export default router
