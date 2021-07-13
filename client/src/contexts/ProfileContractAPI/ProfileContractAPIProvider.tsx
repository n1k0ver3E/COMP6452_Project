import React, { FC, createContext } from 'react'
import { IProfileContractAPI, IParticipantDetails } from '../../interfaces/contract'

const contextDefaultValues: IProfileContractAPI = {
  registerParticipant: () => {},
}

export const ProfileContractAPIContext =
  createContext<IProfileContractAPI>(contextDefaultValues)

const ProfileContractAPIProvider: FC = ({children}) :any => {


  const registerParticipant = (participantDetails: IParticipantDetails) => {

    console.log(participantDetails)
    console.log('HELLO PARTICIPANT')
  }

  return (
    <ProfileContractAPIContext.Provider value={{ registerParticipant }}>
      {children}
    </ProfileContractAPIContext.Provider>
  )
}

export default ProfileContractAPIProvider