import React, { FC, createContext, useState, useEffect } from 'react'
import api from '../../api'
import {
  IDocumentContractAPI,
  IDocumentDetails,
  IDocumentPayload,
} from '../../interfaces/contract'
import { DocumentStatus } from '../../enums/contract'
const FormData = require('form-data')

const contextDefaultValues: IDocumentContractAPI = {
  pendingDocuments: [],
  approvedDocuments: [],
  rejectedDocuments: [],
  updateDocumentStatus: () => {},
  getAllDocuments: () => {},
  uploadDocument: () => {},
}

export const DocumentContractAPIContext =
  createContext<IDocumentContractAPI>(contextDefaultValues)

const DocumentContractAPIProvider: FC = ({ children }): any => {
  const [pendingDocuments, setPendingDocuments] = useState<IDocumentDetails[]>(
    []
  )
  const [approvedDocuments, setApprovedDocuments] = useState<
    IDocumentDetails[]
  >([])
  const [rejectedDocuments, setRejectedDocuments] = useState<
    IDocumentDetails[]
  >([])

  useEffect(() => {
    getAllDocuments()
  }, [])

  const getAllDocuments = async () => {
    await getDocumentsByStatus(DocumentStatus.Pending)
    await getDocumentsByStatus(DocumentStatus.Approved)
    await getDocumentsByStatus(DocumentStatus.Rejected)
  }

  const getDocumentsByStatus = async (documentStatus: number) => {
    try {
      const resp = await api.get(
        `/v1/documents/status?documentStatus=${documentStatus}`
      )

      switch (documentStatus) {
        case DocumentStatus.Pending:
          setPendingDocuments(resp.data.documents)
          break
        case DocumentStatus.Approved:
          setApprovedDocuments(resp.data.documents)
          break
        case DocumentStatus.Rejected:
          setRejectedDocuments(resp.data.documents)
          break
        default:
          break
      }
    } catch (err) {
      console.log(err)
    }
  }

  const updateDocumentStatus = async (
    address: string,
    updatedDocumentStatus: number
  ) => {
    try {
      console.log('address', address)
      console.log('updatedDocumentStatus', updatedDocumentStatus)

      const resp = await api.patch(`/v1/document/${address}`, {
        documenStatus: updatedDocumentStatus,
      })

      switch (updatedDocumentStatus) {
        case DocumentStatus.Pending:
          setPendingDocuments(resp.data.documents)
          break
        case DocumentStatus.Approved:
          setApprovedDocuments(resp.data.documents)
          break
        case DocumentStatus.Rejected:
          setRejectedDocuments(resp.data.documents)
          break
        default:
          break
      }

      getAllDocuments()
    } catch (err) {
      console.log(err)
    }
  }

  const uploadDocument = async (
    file: File | string,
    payload: IDocumentPayload
  ) => {
    try {
      const formData = new FormData()

      // @ts-ignore
      formData.append('accountId', payload.accountId)
      formData.append('documentName', payload.documentName)
      formData.append('avatar', file)

      const resp = await api.post('/v1/documents', formData)

      return resp.data.document
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <DocumentContractAPIContext.Provider
      value={{
        pendingDocuments,
        approvedDocuments,
        rejectedDocuments,
        updateDocumentStatus,
        getAllDocuments,
        uploadDocument,
      }}
    >
      {children}
    </DocumentContractAPIContext.Provider>
  )
}

export default DocumentContractAPIProvider
