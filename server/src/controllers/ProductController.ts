import { Request, Response, NextFunction } from 'express'
import { ProductService } from '../services'
import httpStatus = require('http-status')
import { catchAsync } from '../utils'

const createProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const product = await ProductService.createProduct(req.body)
    return res.status(httpStatus.CREATED).json({
      success: true,
      product,
    })
  }
)

const addProductFarmingInfo = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const product = await ProductService.addProductFarmingInfo(req.body)

    return res.status(httpStatus.CREATED).json({
      success: true,
      product,
    })
  }
)

const manuProductInfo = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const product = await ProductService.manuProductInfo(
      req.body
    )
    
    return res.status(httpStatus.OK).json({
      success: true,
      product,
    })
  }
)

const retailProductInfo = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const product = await ProductService.retailProductInfo(
      req.body
    )
    return res.status(httpStatus.OK).json({
      success: true,
      product,
    })
  }
)

const purchasingProductInfo = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const product = await ProductService.purchasingProductInfo(
      req.body
    )
    return res.status(httpStatus.OK).json({
      success: true,
      product,
    })
  }
)

const recallProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { productId: productId } = req.body

    console.log( req.body )

    const result = await ProductService.recallProduct(productId)

    return res.status(httpStatus.OK).json({
      success: true,
      result,
    })
  }
)


export default {
  addProductFarmingInfo,
  createProduct,
  manuProductInfo,
  retailProductInfo,
  purchasingProductInfo,
}
