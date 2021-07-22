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

  useEffect(() => {
    getAllParticipants()
  }, [])

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
        return (
          <div className="file has-name is-boxed is-small is-primary p-1">
            <label className="file-label">
              <input className="file-input" type="file" name="resume" />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload" />
                </span>
                <span className="file-label">Choose a file…</span>
              </span>
              {/*<span className="file-name">*/}
              {/*  Screen Shot 2017-07-29 at 15.54.25.png*/}
              {/*</span>*/}
            </label>
          </div>
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
    </>
  )
}

export default AddDocument
