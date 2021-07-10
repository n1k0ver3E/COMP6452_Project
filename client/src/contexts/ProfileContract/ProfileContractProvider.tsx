import React, { FC, createContext, useState, useEffect } from 'react'
import { IProfileContract } from '../../interfaces/profileContract'
import json from '../../contracts/Profile.json'
import { Contract } from 'web3-eth-contract'
import useWeb3 from '../../hooks/web3'

const contextDefaultValues: IProfileContract = {
  profileContract: undefined,
}

export const ProfileContractContext =
  createContext<IProfileContract>(contextDefaultValues)

const ProfileContextProvider: FC = ({ children }): any => {
  const { isLoading, isWeb3, web3 } = useWeb3()
  const [profileContract, setProfileContract] = useState<
    Contract | IProfileContract | undefined | any
  >(contextDefaultValues.profileContract)

  const abi: any = json.abi

  useEffect(() => {
    const getProfileContract = () => {
      if (web3 !== null) {
        const deployedNetwork = json.networks[5777]
        const instance = new web3.eth.Contract(
          abi,
          deployedNetwork && deployedNetwork.address
        )
        setProfileContract(instance)
      }
    }

    getProfileContract()
  }, [isLoading, isWeb3])

  return (
    <ProfileContractContext.Provider value={{ profileContract }}>
      {children}
    </ProfileContractContext.Provider>
  )
}

export default ProfileContextProvider
