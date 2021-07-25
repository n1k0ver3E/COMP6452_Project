import { ProductRepository } from '../repositories'
import { IProduct } from '../interfaces/product'
import { ProductStatus } from '../enums/productContract'
import P from 'pino'

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


const manuProductInfo = async (
  productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.MANUFACTURING,
  }

  const product = await ProductRepository.manuProductInfo(
    newProductDetails
    
  )

  return {
    id: product.productId,
    processingType: product.processingType,
    status: product.status,
  }
}

const retailProductInfo = async (
  productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.RETAILING,
  }

  const product = await ProductRepository.retailProductInfo(
    newProductDetails
    
  )

  return {
    id: product.productId,
    status: product.status,
  }
}

const purchasingProductInfo = async (
  productDetails: IProduct) => {
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

export default {
  addProductFarmingInfo,
  createProduct,
  manuProductInfo,
  retailProductInfo,
  purchasingProductInfo,
  
}
