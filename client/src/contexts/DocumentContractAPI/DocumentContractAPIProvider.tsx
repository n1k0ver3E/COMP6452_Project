import React, { FC, createContext, useState, useEffect } from 'react'
import api from '../../api'
import {
  IDocumentContractAPI,
  IDocumentDetails,
} from '../../interfaces/contract'
import { DocumentStatus } from '../../enums/contract'

const contextDefaultValues: IDocumentContractAPI = {
  // registerParticipant: () => {},
  // registeredAccounts: [],
  // registrationError: false,
  pendingDocuments: [],
  approvedDocuments: [],
  rejectedDocuments: [],
  updateDocumentStatus: () => {},
  getAllDocuments: () => {},
}

export const DocumentContractAPIContext =
  createContext<IDocumentContractAPI>(contextDefaultValues)

const DocumentContractAPIProvider: FC = ({ children }): any => {
  // const [registrationError, setRegistrationError] = useState<boolean>(false)
  // const [registeredAccounts, setRegisteredAccounts] = useState<
  //   IDocumentDetails[]
  // >([])
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

  // const registerParticipant = async (
  //   participantDetails: IParticipantDetails
  // ) => {
  //   try {
  //     Promise.all([
  //       await api.post('/v1/participants/register', participantDetails),
  //       await getAllParticipants(),
  //     ])

  //     setRegistrationError(false)
  //   } catch (err) {
  //     setRegistrationError(true)
  //   }
  // }

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
          // setRegisteredDocuments([
          //   ...pendingAccounts,
          //   ...rejectedAccounts,
          //   ...approvedAccounts,
          // ])
          break
        case DocumentStatus.Approved:
          setApprovedDocuments(resp.data.documents)
          // setRegisteredDocuments([
          //   ...pendingAccounts,
          //   ...rejectedAccounts,
          //   ...approvedAccounts,
          // ])
          break
        case DocumentStatus.Rejected:
          setRejectedDocuments(resp.data.documents)
          // setRegisteredDocuments([
          //   ...pendingAccounts,
          //   ...rejectedAccounts,
          //   ...approvedAccounts,
          // ])
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

  return (
    <DocumentContractAPIContext.Provider
      value={{
        // registerParticipant,
        // registeredAccounts,
        // registrationError,
        pendingDocuments,
        approvedDocuments,
        rejectedDocuments,
        updateDocumentStatus,
        getAllDocuments,
      }}
    >
      {children}
    </DocumentContractAPIContext.Provider>
  )
}

export default DocumentContractAPIProvider
