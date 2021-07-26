import React, { FC, createContext } from 'react'
import api from '../../api'
import {
  ICreateProductPayload,
  IProductContractAPI,
} from '../../interfaces/contract'

const contextDefaultValues: IProductContractAPI = {
  recallProduct: (productId: number) => {},
  createProduct: () => {},
  getFarmingAndManufacturingProducts: () => {},
  getProductById: () => {},
}

export const ProductContractAPIContext =
  createContext<IProductContractAPI>(contextDefaultValues)

const ProductContractAPIProvider: FC = ({ children }): any => {
  const recallProduct = async (productId: number) => {
    try {
      const resp = await api.post(`/v1/products/recall-product`, { productId })

      return resp.data.result
    } catch (err) {
      return false
    }
  }

  const createProduct = async (product: ICreateProductPayload) => {
    try {
      const resp = await api.post(`/v1/products`, product)

      return resp.data.product
    } catch (err) {
      return false
    }
  }

  const getFarmingAndManufacturingProducts = async () => {
    try {
      const resp = await api.get(`/v1/products/farming-man-products`)

      return resp.data.products
    } catch (err) {
      return false
    }
  }

  const getProductById = async (productNumber: number) => {
    try {
      const resp = await api.get(`/v1/products/${productNumber}`)

      return resp.data.product[0]
    } catch (err) {
      return false
    }
  }

  return (
    <ProductContractAPIContext.Provider
      value={{
        recallProduct,
        createProduct,
        getFarmingAndManufacturingProducts,
        getProductById,
      }}
    >
      {children}
    </ProductContractAPIContext.Provider>
  )
}

export default ProductContractAPIProvider
