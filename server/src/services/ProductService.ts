import { ProductRepository } from '../repositories'
import { IProduct } from '../interfaces/product'

const createProduct = async (productDetails: IProduct) => {
  return ProductRepository.createProduct(productDetails)
}

export default {
  createProduct,
}
