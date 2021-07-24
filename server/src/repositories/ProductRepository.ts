import { ProductModel } from '../models'
import { IProduct } from '../interfaces/product'

const addProductFarmingInfo = (productDetails: any): Promise<IProduct> => {
  return ProductModel.create(productDetails)
}

const createProduct = (productDetails: IProduct): Promise<IProduct> => {
  return ProductModel.create(productDetails)
}

export default {
  addProductFarmingInfo,
  createProduct,
}
