import express from 'express'
import { ProductController } from '../controllers'

const router = express.Router()

router.route('/').post(ProductController.createProduct)
router.route('/farming-info').post(ProductController.addProductFarmingInfo)





router.route('/recall-product').post(ProductController.recallProduct)

export default router
