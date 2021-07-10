import React, { FC, useEffect, useState } from 'react'
import { Contract } from 'web3-eth-contract'
import json from '../../contracts/Profile.json'
import useWeb3 from '../../hooks/web3'

const Landing: FC = () => {
  const { isLoading, isWeb3, web3, accounts } = useWeb3()
  const [contract, setContract] = useState<Contract>()
  const [value, setValue] = useState('')

  const abi: any = json.abi

  useEffect(() => {
    const getProfileContract = () => {
      if (web3 !== null) {
        const deployedNetwork = json.networks[5777]
        const instance = new web3.eth.Contract(
          abi,
          deployedNetwork && deployedNetwork.address
        )
        setContract(instance)
      }
    }

    getProfileContract()
  }, [isLoading, isWeb3])

  console.log('CONTRACT', contract)

  const example = async () => {
    const regAddr = await contract?.methods.regulatorAddress().call()
    setValue(regAddr)
  }

  return (
    <div className="App">
      <h1>LANDING PAGE</h1>
      <h1>Foodie Chain</h1>
      <div>The stored value is: {value}</div>
      <p>Click here to run the contract↓</p>
      <button onClick={example}>click</button>
    </div>
  )
}

export default Landing
