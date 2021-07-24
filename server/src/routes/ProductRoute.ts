import express from 'express'
import { ProductController } from '../controllers'

const router = express.Router()

router.route('/').post(ProductController.createProduct)
router.route('/farming-info').post(ProductController.addProductFarmingInfo)
router.route("/manu-info").put(ProductController.addProductFarmingInfo)
router.route("/retailing-info").put(ProductController.addProductFarmingInfo)
router.route("/purchasing-info").put(ProductController.addProductFarmingInfo)

export default router
