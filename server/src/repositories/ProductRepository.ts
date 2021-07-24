import { ProductModel } from '../models'
import { IProduct } from '../interfaces/product'

const addProductFarmingInfo = (productDetails: any): Promise<IProduct> => {
  return ProductModel.create(productDetails)
}

const createProduct = (productDetails: IProduct): Promise<IProduct> => {
  return ProductModel.create(productDetails)
}

const manuProductInfo = (productId:number, productDetails: any): Promise<IProduct> => {
  return ProductModel.update(
    {productId: productId}, 
    productDetails)
}

const retailProductInfo = (productId:number, productDetails: any): Promise<IProduct> => {
  return ProductModel.update(
    {productId: productId}, 
    productDetails)
}

const purchasingProductInfo = (productId:number, productDetails: any): Promise<IProduct> => {
  return ProductModel.update(
    {productId: productId}, 
    productDetails)
}



export default {
  addProductFarmingInfo,
  createProduct,
  retailProductInfo,
  purchasingProductInfo,
  manuProductInfo
}
