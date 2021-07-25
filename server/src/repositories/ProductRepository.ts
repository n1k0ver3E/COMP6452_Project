import { ProductModel } from '../models'
import { IProduct } from '../interfaces/product'
import { ProductStatus } from '../enums/productContract'

const addProductFarmingInfo = (productDetails: any): Promise<IProduct> => {
  return ProductModel.create(productDetails)
}

const createProduct = (productDetails: IProduct): Promise<IProduct> => {
  return ProductModel.create(productDetails)
}

const recallProduct =  async (productId: number) =>  {
  //@ts-ignore
  const product = await ProductModel.findOne({ productId: { $ne: null, $eq: productId} }).exec();
  console.log( productId, product )
  if( product === null || product.status == ProductStatus.RECALLING )
    return false;

  product.status = ProductStatus.RECALLING;
  await product.save();

  return true;
}

export default {
  addProductFarmingInfo,
  createProduct,
  recallProduct
}
