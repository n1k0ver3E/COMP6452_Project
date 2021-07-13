import React, { FC, createContext } from 'react'
import api from '../../api'
import {
  IProfileContractAPI,
  IParticipantDetails,
} from '../../interfaces/contract'

const contextDefaultValues: IProfileContractAPI = {
  registerParticipant: () => {},
}

export const ProfileContractAPIContext =
  createContext<IProfileContractAPI>(contextDefaultValues)

const ProfileContractAPIProvider: FC = ({ children }): any => {
  const registerParticipant = async (
    participantDetails: IParticipantDetails
  ) => {
    const resp = await api.post('/v1/participants/register', participantDetails)

    console.log('response', resp.data)
  }

  return (
    <ProfileContractAPIContext.Provider value={{ registerParticipant }}>
      {children}
    </ProfileContractAPIContext.Provider>
  )
}

export default ProfileContractAPIProvider
