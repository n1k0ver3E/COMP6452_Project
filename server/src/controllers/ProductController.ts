import { Request, Response, NextFunction } from 'express'
import { ProductService } from '../services'
import httpStatus = require('http-status')
import { catchAsync } from '../utils'

const addProductFarmingInfo = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const product = await ProductService.addProductFarmingInfo(req.body)

    return res.status(httpStatus.CREATED).json({
      success: true,
      product,
    })
  }
)

const createProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const product = await ProductService.createProduct(req.body)

    return res.status(httpStatus.CREATED).json({
      success: true,
      product,
    })
  }
)

export default {
  addProductFarmingInfo,
  createProduct,
}
