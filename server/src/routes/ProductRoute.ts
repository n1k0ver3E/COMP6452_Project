import express from 'express'
import { ProductController } from '../controllers'

const router = express.Router()

router.route('/').post(ProductController.createProduct)
router.route('/farming-info').post(ProductController.addProductFarmingInfo)
router.route("/manu-info").patch(ProductController.manuProductInfo)
router.route("/retailing-info").patch(ProductController.retailProductInfo)
router.route("/purchasing-info").patch(ProductController.purchasingProductInfo)

export default router
