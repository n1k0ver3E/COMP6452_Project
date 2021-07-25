import { ProductRepository } from '../repositories'
import { IProduct } from '../interfaces/product'
import { ProductStatus } from '../enums/productContract'

const addProductFarmingInfo = async (productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.HARVESTING,
  }

  const product = await ProductRepository.addProductFarmingInfo(
    newProductDetails
  )

  return {
    id: product._id,
    productName: product.productName,
    productLocation: product.productLocation,
    plantingDate: product.plantingDate,
    harvestDate: product.harvestDate,
    status: product.status,
  }
}

const createProduct = async (productDetails: IProduct) => {
  const product = await ProductRepository.createProduct(productDetails)

  return {
    id: product._id,
    productName: product.productName,
    status: product.status,
  }
}

const recallProduct = async(productId: number) => {
  const result = await ProductRepository.recallProduct(productId)

  return result
}

export default {
  addProductFarmingInfo,
  createProduct,
  recallProduct
}
