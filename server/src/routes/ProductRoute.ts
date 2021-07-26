import express from 'express'
import { ProductController } from '../controllers'

const router = express.Router()

router.route('/').post(ProductController.createProduct)
router.route('/manu-info').patch(ProductController.manuProductInfo)
router.route('/retailing-info').patch(ProductController.retailProductInfo)
router.route('/purchasing-info').patch(ProductController.purchasingProductInfo)

// router.route('/recall-product').post(ProductController.recallProduct)

export default router
