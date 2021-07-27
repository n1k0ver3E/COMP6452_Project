import React, { FC, createContext } from 'react'
import api from '../../api'
import {
  ICreateProductPayload, IManuProductInfoPayload,
  IProductContractAPI
} from '../../interfaces/contract'

const contextDefaultValues: IProductContractAPI = {
  recallProduct: (productId: number) => {},
  createProduct: () => {},
  getProductsByStatus: () => {},
  getProductById: () => {},
  manuProductInfo: () => {}
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

  const getProductsByStatus = async (productStatus: number) => {
    try {
      const resp = await api.get(`/v1/products/status/${productStatus}`)

      return resp.data.products
    } catch (err) {
      return false
    }
  }

  const getProductById = async (productNumber: number) => {

    try {
      const resp = await api.get(`/v1/products/id/${productNumber}`)

      console.log('what is product', resp)

      return resp.data.product[0]
    } catch (err) {
      return false
    }
  }

  const manuProductInfo = async (payload: IManuProductInfoPayload) => {
    try {
      const resp = await api.patch(`/v1/products/manu-info`, payload)

      return resp.data.product
    }catch(err) {
      return false
    }
  }

  return (
    <ProductContractAPIContext.Provider
      value={{
        recallProduct,
        createProduct,
        getProductsByStatus,
        getProductById,
        manuProductInfo
      }}
    >
      {children}
    </ProductContractAPIContext.Provider>
  )
}

export default ProductContractAPIProvider
