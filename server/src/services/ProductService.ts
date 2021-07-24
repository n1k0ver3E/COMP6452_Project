import { ProductRepository } from '../repositories'
import { IProduct } from '../interfaces/product'

const createProduct = async (productDetails: IProduct) => {
  const product = await ProductRepository.createProduct(productDetails)

  return {
    id: product._id,
    productName: product.productName,
    status: product.status,
  }
}

export default {
  createProduct,
}
