import React, { FC, useState, useEffect, useContext } from 'react'
import { DocumentType } from '../../../enums/contract'
import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'

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
    </>
  )
}

export default AddDocument
