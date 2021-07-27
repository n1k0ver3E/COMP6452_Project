import { ProductRepository } from '../repositories'
import { IProduct } from '../interfaces/product'
import { ProductStatus } from '../enums/productContract'

const createProduct = (productDetails: IProduct) => {
  return ProductRepository.createProduct(productDetails)
}

const manuProductInfo = (productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.MANUFACTURING,
  }

  return ProductRepository.manuProductInfo(newProductDetails)
}

const retailProductInfo = async (productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.RETAILING,
  }

 return ProductRepository.retailProductInfo(newProductDetails)


}

const purchasingProductInfo = (productDetails: IProduct) => {
  const newProductDetails = {
    ...productDetails,
    status: ProductStatus.PURCHASING,
  }

  return  ProductRepository.purchasingProductInfo(
    newProductDetails
  )
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
