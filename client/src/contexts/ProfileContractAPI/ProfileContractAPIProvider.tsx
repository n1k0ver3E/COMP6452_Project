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
    getParticipantsByStatus(AccountStatus.PENDING)
    getParticipantsByStatus(AccountStatus.APPROVED)
    getParticipantsByStatus(AccountStatus.REJECTED)
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

  return (
    <ProfileContractAPIContext.Provider
      value={{
        registerParticipant,
        registeredAccounts: initialState.registeredAccounts,
        registrationError,
        pendingAccounts,
        approvedAccounts,
        rejectedAccounts,
      }}
    >
      {children}
    </ProfileContractAPIContext.Provider>
  )
}

export default ProfileContractAPIProvider
