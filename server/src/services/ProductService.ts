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
    id: product.productId,
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
    id: product.productId,
    productName: product.productName,
    status: product.status,
  }
}

const manuProductInfo = async (productId:number, productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.MANUFACTURING,
  }

  const product = await ProductRepository.manuProductInfo(
    productId,
    newProductDetails
  )

  return {
    id: product.productId,
    processingType: product.processingType,
    timestamp: product.timestamp,
    status: product.status,
  }
}

const retailProductInfo = async (productId:number, productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.RETAILING,
  }

  const product = await ProductRepository.retailProductInfo(
    productId,
    newProductDetails
  )

  return {
    id: product.productId,
    status: product.status,
  }
}

const purchasingProductInfo = async (productId:number, productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.PURCHASING,
  }

  const product = await ProductRepository.purchasingProductInfo(
    productId,
    newProductDetails
  )

  return {
    id: product.productId,
    price: product.price,
    status: product.status,
  }
}

export default {
  addProductFarmingInfo,
  createProduct,
  manuProductInfo,
  retailProductInfo,
  purchasingProductInfo,
  
}
