import React, { FC, createContext, useState } from 'react'
import api from '../../api'
import {
  IProfileContractAPI,
  IParticipantDetails,
} from '../../interfaces/contract'

const contextDefaultValues: IProfileContractAPI = {
  registerParticipant: () => {},
  registeredAccounts: [],
  registrationError: false,
}

export const ProfileContractAPIContext =
  createContext<IProfileContractAPI>(contextDefaultValues)

const ProfileContractAPIProvider: FC = ({ children }): any => {
  const initialState = {
    registeredAccounts: [],
  }

  const [registrationError, setRegistrationError] = useState<boolean>(false)

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

  return (
    <ProfileContractAPIContext.Provider
      value={{
        registerParticipant,
        registeredAccounts: initialState.registeredAccounts,
        registrationError,
      }}
    >
      {children}
    </ProfileContractAPIContext.Provider>
  )
}

export default ProfileContractAPIProvider
