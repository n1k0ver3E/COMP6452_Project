import { ProductModel } from '../models'
import { IProduct } from '../interfaces/product'
import { ProductRepository } from '.'

const addProductFarmingInfo = (productDetails: any): Promise<IProduct> => {
  return ProductModel.create(productDetails)
}

const createProduct = (productDetails: IProduct): Promise<IProduct> => {
  return ProductModel.create(productDetails)
}

const manuProductInfo = async (
  productDetails: IProduct,
): Promise<IProduct> => {
  // @ts-ignore
  return ProductModel.findOneAndUpdate(
    {
      productId: productDetails.productId,
    },
    {
      $set: {
        productDetails: productDetails,
      },
    },
    {
      new: true,
    }
  )
}
  
const retailProductInfo = async (
  productDetails: any,
): Promise<IProduct> => {
  // @ts-ignore
  return ProductModel.findOneAndUpdate(
    {
      productId: productDetails.productId,
    },
    {
      $set: {
        productDetails: productDetails,
      },
    },
    {
      new: true,
    }
  )
}


const purchasingProductInfo = async (
  productDetails: any,
): Promise<IProduct> => {
  // @ts-ignore
  return ProductModel.findOneAndUpdate(
    {
      productId: productDetails.productId,
    },
    {
      $set: {
        productDetails: productDetails,
      },
    },
    {
      new: true,
    }
  )
}

export default {
  addProductFarmingInfo,
  createProduct,
  retailProductInfo,
  purchasingProductInfo,
  manuProductInfo
}