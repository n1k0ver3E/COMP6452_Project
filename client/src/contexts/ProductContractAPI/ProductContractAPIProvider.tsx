import React, { FC, createContext, useState, useEffect } from 'react'
import api from '../../api'
import {
  IProductContractAPI,
  // IProductDetails,
  // IProductPayload,
} from '../../interfaces/contract'
// import { DocumentStatus } from '../../enums/contract'
//const FormData = require('form-data')

const contextDefaultValues: IProductContractAPI = {
  // pendingDocuments: [],
  // approvedDocuments: [],
  // rejectedDocuments: [],
  // updateDocumentStatus: () => {},
  // getAllDocuments: () => {},
  // uploadDocument: () => {},
  recallProduct: (productId: number)=> {},
}

export const ProductContractAPIContext = createContext<IProductContractAPI>(
  contextDefaultValues
)

const ProductContractAPIProvider: FC = ({ children }): any => {
  //const [recallProductResult, setRecallProductResult] = useState<boolean>(false)
  // const [pendingDocuments, setPendingDocuments] = useState<IDocumentDetails[]>(
  //   []
  // )
  // const [approvedDocuments, setApprovedDocuments] = useState<
  //   IDocumentDetails[]
  // >([])
  // const [rejectedDocuments, setRejectedDocuments] = useState<
  //   IDocumentDetails[]
  // >([])

  // useEffect(() => {
  //   getAllDocuments()
  // }, [])

  // const getAllDocuments = async () => {
  //   await getDocumentsByStatus(DocumentStatus.Pending)
  //   await getDocumentsByStatus(DocumentStatus.Approved)
  //   await getDocumentsByStatus(DocumentStatus.Rejected)
  // }

  // const getDocumentsByStatus = async (documentStatus: number) => {
  //   try {
  //     const resp = await api.get(
  //       `/v1/documents/status?documentStatus=${documentStatus}`
  //     )

  //     switch (documentStatus) {
  //       case DocumentStatus.Pending:
  //         setPendingDocuments(resp.data.documents)
  //         break
  //       case DocumentStatus.Approved:
  //         setApprovedDocuments(resp.data.documents)
  //         break
  //       case DocumentStatus.Rejected:
  //         setRejectedDocuments(resp.data.documents)
  //         break
  //       default:
  //         break
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const updateDocumentStatus = async (
  //   address: string,
  //   updatedDocumentStatus: number
  // ) => {
  //   try {
  //     console.log('address', address)
  //     console.log('updatedDocumentStatus', updatedDocumentStatus)

  //     const resp = await api.patch(`/v1/document/${address}`, {
  //       documenStatus: updatedDocumentStatus,
  //     })

  //     switch (updatedDocumentStatus) {
  //       case DocumentStatus.Pending:
  //         setPendingDocuments(resp.data.documents)
  //         break
  //       case DocumentStatus.Approved:
  //         setApprovedDocuments(resp.data.documents)
  //         break
  //       case DocumentStatus.Rejected:
  //         setRejectedDocuments(resp.data.documents)
  //         break
  //       default:
  //         break
  //     }

  //     getAllDocuments()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const uploadDocument = async (
  //   file: File | string,
  //   payload: IDocumentPayload
  // ) => {
  //   try {
  //     const formData = new FormData()

  //     // @ts-ignore
  //     formData.append('accountId', payload.accountId)
  //     formData.append('documentName', payload.documentName)
  //     formData.append('avatar', file)

  //     const resp = await api.post('/v1/documents', formData)

  //     return resp.data.document
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  const recallProduct = async (productId: number) => {
    try {
      const resp = await api.post(`/v1/products/recall-product`, {productId})

      return resp.data.result;
    } catch (err) {
      return false;
    }
  }

  return (
    <ProductContractAPIContext.Provider
      value={{
        // pendingDocuments,
        // approvedDocuments,
        // rejectedDocuments,
        // updateDocumentStatus,
        // getAllDocuments,
        // uploadDocument,
        recallProduct,
      }}
    >
      {children}
    </ProductContractAPIContext.Provider>
  )
}

export default ProductContractAPIProvider
