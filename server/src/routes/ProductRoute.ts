import express from 'express'
import { ProductController } from '../controllers'

const router = express.Router()

router.route('/').post(ProductController.createProduct)
router.route('/farming-info').post(ProductController.addProductFarmingInfo)
router.route("/manu-info").patch(ProductController.addProductFarmingInfo)
router.route("/retailing-info").patch(ProductController.addProductFarmingInfo)
router.route("/purchasing-info").patch(ProductController.addProductFarmingInfo)

export default router
