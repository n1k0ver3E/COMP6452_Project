import React, { FC, useState, useEffect, useContext } from 'react'
import {
  DocumentType,
  AccountType,
  AccountStatus,
} from '../../../enums/contract'
import { titleCase } from '../../../helpers'
import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'
import AccountsTable from '../../../components/AccountsTable'

const AddDocument: FC = () => {
  const { registeredAccounts, getAllParticipants } = useContext(
    ProfileContractAPIContext
  )

  const [profileDocumentsActiveClass, setProfileDocumentsActiveClass] =
    useState<string>('is-active')
  const [productDocumentsActiveClass, setProductDocumentsActiveClass] =
    useState<string>('')
  const [
    traceabilityDocumentsActiveClass,
    setTraceabilityDocumentsActiveClass,
  ] = useState<string>('')
  const [modalOpenedClass, setModalOpenedClass] = useState<string>('modal')
  const [modalTitle, setModalTitle] = useState<string>('')

  useEffect(() => {
    getAllParticipants()
  }, [])

  const activateModal = () => {
    setModalOpenedClass('modal is-active')
  }

  const closeModal = () => {
    setModalOpenedClass('modal')
  }

  const switchTab = (documentType: number) => {
    switch (documentType) {
      case DocumentType.PROFILE:
        setProfileDocumentsActiveClass('is-active')
        setProductDocumentsActiveClass('')
        setTraceabilityDocumentsActiveClass('')
        break
      case DocumentType.PRODUCT:
        setProductDocumentsActiveClass('is-active')
        setProfileDocumentsActiveClass('')
        setTraceabilityDocumentsActiveClass('')
        break
      case DocumentType.TRACEABILITY:
        setTraceabilityDocumentsActiveClass('is-active')
        setProfileDocumentsActiveClass('')
        setProductDocumentsActiveClass('')
    }
  }

  const PROFILE_COLUMNS = [
    {
      Header: 'Account Name',
      accessor: 'accountName',
    },
    {
      Header: 'Account Address',
      accessor: 'accountAddress',
    },
    {
      Header: 'Account Type',
      accessor: 'accountType',
      Cell: ({ value }: any) => {
        return titleCase(AccountType[value])
      },
    },
    {
      Header: 'Account Status',
      accessor: 'accountStatus',
      Cell: ({ value }: any) => {
        return titleCase(AccountStatus[value])
      },
    },
    {
      Header: 'Profile Document',
      accessor: 'accountId',
      Cell: ({ value }: any) => {
        console.log('what is value', value)

        setModalTitle('Upload Profile Document')

        return (
          <button
            className="button is-warning p-2"
            onClick={() => activateModal()}
          >
            Upload Document
          </button>
        )
      },
    },
  ]

  return (
    <>
      <div className="tabs is-centered is-boxed">
        <ul>
          <li
            className={profileDocumentsActiveClass}
            onClick={() => switchTab(DocumentType.PROFILE)}
          >
            <a>
              <span className="icon is-small">
                <i className="fas fa-users" aria-hidden="true" />
              </span>
              <span>Profile Documents</span>
            </a>
          </li>
          <li
            className={productDocumentsActiveClass}
            onClick={() => switchTab(DocumentType.PRODUCT)}
          >
            <a>
              <span className="icon is-small">
                <i className="fas fa-box" aria-hidden="true" />
              </span>
              <span>Product Documents</span>
            </a>
          </li>
          <li
            className={traceabilityDocumentsActiveClass}
            onClick={() => switchTab(DocumentType.TRACEABILITY)}
          >
            <a>
              <span className="icon is-small">
                <i className="fas fa-truck-moving" aria-hidden="true" />
              </span>
              <span>Traceability Documents</span>
            </a>
          </li>
        </ul>
      </div>
      <section className="container">
        {profileDocumentsActiveClass && (
          <div className="column is-12">
            {!registeredAccounts.length ? (
              <div className="notification is-warning">
                No registered users.
              </div>
            ) : (
              <AccountsTable
                columns={PROFILE_COLUMNS}
                data={registeredAccounts}
              />
            )}
          </div>
        )}
      </section>

      <div className={modalOpenedClass}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{modalTitle}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            />
          </header>
          <section className="modal-card-body" />
          <footer className="modal-card-foot">
            <button className="button is-link">Upload</button>
            <button className="button" onClick={closeModal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  )
}

export default AddDocument
