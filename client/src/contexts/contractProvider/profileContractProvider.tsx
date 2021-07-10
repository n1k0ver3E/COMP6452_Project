import React, { FC, createContext, useEffect, useState  } from 'react'
import { Contract } from 'web3-eth-contract';
import json from '../../contracts/Profile.json';
import useWeb3 from '../../hooks/web3';
import { IProfileContract  } from '../../interfaces/profileContract'

const contextDefaultValues: IProfileContract = {
  profileContract: Contract
}

export const ProfileContractContext = createContext<IProfileContract>(contextDefaultValues)

const ProfileContractProvider: FC = ({ children }) => {

  const { isLoading, isWeb3, web3, accounts } = useWeb3();
  const [profileContract, setProfileContract] = useState<Contract>(contextDefaultValues.profileContract);

  const abi: any = json.abi;

  useEffect(() => {
    (async() => {
      if(web3 !== null) {
        // const networkId = await web3.eth.net.getId();
        const deployedNetwork = json.networks[5777];
        const instance = new web3.eth.Contract(
          abi,
          deployedNetwork && deployedNetwork.address
        );
        setProfileContract(instance);
      }
    })();
  }, [isLoading, isWeb3]);

  return (
    <ProfileContractContext value={{ profileContract }}>
      {children}
    </ProfileContractContext>
  )
}

export default ProfileContractProvider
