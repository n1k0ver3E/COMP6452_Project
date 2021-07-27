import { ProductRepository } from '../repositories'
import { IProduct } from '../interfaces/product'
import { ProductStatus } from '../enums/productContract'

const createProduct = async (productDetails: IProduct) => {
  const product = await ProductRepository.createProduct(productDetails)

  return {
    id: product._id,
    productId: product.productId,
    productName: product.productName,
    productLocation: product.productLocation,
    farmDate: product.farmDate,
    harvestDate: product.harvestDate,
    status: product.status,
  }
}

const manuProductInfo = async (productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.MANUFACTURING,
  }

  const product = await ProductRepository.manuProductInfo(newProductDetails)

  return {
    id: product._id,
    productId: product.productId,
    productName: product.productName,
    productLocation: product.productLocation,
    farmDate: product.farmDate,
    harvestDate: product.harvestDate,
    processingType: product.processingType,
    status: product.status,
  }
}

const retailProductInfo = async (productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.RETAILING,
  }

  const product = await ProductRepository.retailProductInfo(newProductDetails)

  return {
    id: product.productId,
    status: product.status,
  }
}

const purchasingProductInfo = async (productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.PURCHASING,
  }

  const product = await ProductRepository.purchasingProductInfo(
    newProductDetails
  )

  return {
    id: product.productId,
    price: product.price,
    status: product.status,
  }
}

const getFarmingAndManufacturingProducts = () => {
  return ProductRepository.getFarmingAndManufacturingProducts()
}

const getProductById = (productId: number) => {
  return ProductRepository.getProductById(productId)
}

export default {
  createProduct,
  manuProductInfo,
  retailProductInfo,
  purchasingProductInfo,
  getFarmingAndManufacturingProducts,
  getProductById,
}
