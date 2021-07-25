import React, { FC, createContext } from 'react'
import api from '../../api'
import { IProductContractAPI } from '../../interfaces/contract'

const contextDefaultValues: IProductContractAPI = {
  recallProduct: (productId: number) => {},
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

  return (
    <ProductContractAPIContext.Provider
      value={{
        recallProduct,
      }}
    >
      {children}
    </ProductContractAPIContext.Provider>
  )
}

export default ProductContractAPIProvider
