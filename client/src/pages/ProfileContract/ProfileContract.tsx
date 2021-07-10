import React, { useContext, useEffect } from 'react'
import ProfileContextProvider, {
  ProfileContractContext,
} from '../../contexts/ProfileContract'

const ProfileContract = () => {
  const { profileContract } = useContext(ProfileContractContext)

  console.log('profileContract', profileContract)

  return <div>PEEKABOO</div>
}

export default () => (
  <ProfileContextProvider>
    <ProfileContract />
  </ProfileContextProvider>
)
