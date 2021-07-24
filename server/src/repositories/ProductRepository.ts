import { ProductModel } from '../models'
import { IProduct } from '../interfaces/product'

const createProduct = (productDetails: IProduct): Promise<IProduct> => {
  return ProductModel.create(productDetails)
}

export default {
  createProduct,
}
