import React, { FC, createContext, useState, useEffect } from 'react'
import api from '../../api'
import {
  IProfileContractAPI,
  IParticipantDetails,
} from '../../interfaces/contract'
import { AccountStatus } from '../../enums/contract'

const contextDefaultValues: IProfileContractAPI = {
  registerParticipant: () => {},
  registeredAccounts: [],
  registrationError: false,
  pendingAccounts: [],
  approvedAccounts: [],
  rejectedAccounts: [],
  updateAccountStatus: () => {},
}

export const ProfileContractAPIContext =
  createContext<IProfileContractAPI>(contextDefaultValues)

const ProfileContractAPIProvider: FC = ({ children }): any => {
  const initialState = {
    registeredAccounts: [],
  }

  const [registrationError, setRegistrationError] = useState<boolean>(false)
  const [pendingAccounts, setPendingAccounts] = useState<IParticipantDetails[]>(
    []
  )
  const [approvedAccounts, setApprovedAccounts] = useState<
    IParticipantDetails[]
  >([])
  const [rejectedAccounts, setRejectedAccounts] = useState<
    IParticipantDetails[]
  >([])

  useEffect(() => {
    getAllParticipants()
  }, [])

  const registerParticipant = async (
    participantDetails: IParticipantDetails
  ) => {
    try {
      const resp = await api.post(
        '/v1/participants/register',
        participantDetails
      )

      // @ts-ignore
      initialState.registeredAccounts.push(resp.data.participantDetails)
      setRegistrationError(false)
    } catch (err) {
      setRegistrationError(true)
    }
  }

  const getAllParticipants = async () => {
    await getParticipantsByStatus(AccountStatus.PENDING)
    await getParticipantsByStatus(AccountStatus.APPROVED)
    await getParticipantsByStatus(AccountStatus.REJECTED)
  }

  const getParticipantsByStatus = async (accountStatus: number) => {
    try {
      const resp = await api.get(
        `/v1/participants/status?accountStatus=${accountStatus}`
      )

      switch (accountStatus) {
        case AccountStatus.PENDING:
          setPendingAccounts(resp.data.participants)
          break
        case AccountStatus.APPROVED:
          setApprovedAccounts(resp.data.participants)
          break
        case AccountStatus.REJECTED:
          setRejectedAccounts(resp.data.participants)
          break
        default:
          break
      }
    } catch (err) {
      console.log(err)
    }
  }

  const updateAccountStatus = async (
    address: string,
    updatedAccountStatus: number
  ) => {
    try {
      console.log('address', address)
      console.log('updatedAcountStatus', updatedAccountStatus)

      const resp = await api.patch(`/v1/participants/${address}`, {
        accountStatus: updatedAccountStatus,
      })

      switch (updatedAccountStatus) {
        case AccountStatus.PENDING:
          setPendingAccounts(resp.data.participants)
          break
        case AccountStatus.APPROVED:
          setApprovedAccounts(resp.data.participants)
          break
        case AccountStatus.REJECTED:
          setRejectedAccounts(resp.data.participants)
          break
        default:
          break
      }

      getAllParticipants()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ProfileContractAPIContext.Provider
      value={{
        registerParticipant,
        registeredAccounts: initialState.registeredAccounts,
        registrationError,
        pendingAccounts,
        approvedAccounts,
        rejectedAccounts,
        updateAccountStatus,
      }}
    >
      {children}
    </ProfileContractAPIContext.Provider>
  )
}

export default ProfileContractAPIProvider
