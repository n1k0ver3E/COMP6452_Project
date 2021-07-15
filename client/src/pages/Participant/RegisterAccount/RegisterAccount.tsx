import React, { FC, ChangeEvent, useContext, useState } from 'react'
import RegistrationImage from '../../../assets/registration.png'
import { ProfileContractContext } from '../../../contexts/ProfileContract'
import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'
import {
  IParticipantDetails,
  IRegisterAccountDetails,
} from '../../../interfaces/contract'
import RegisterForm from '../../../components/RegisterForm'
import RegistrationSuccess from '../../../components/RegistrationSuccess'

const initialState: IRegisterAccountDetails = {
  accountAddress: '',
  accountName: '',
  accountType: -1,
}

const RegisterAccount: FC = () => {
  const { profileContract, accounts } = useContext(ProfileContractContext)
  const { registerParticipant, registrationError } = useContext(
    ProfileContractAPIContext
  )

  const [data, setData] = useState<IRegisterAccountDetails>(initialState)
  const [isAccountAddressFieldValid, setIsAccountAddressFieldValid] =
    useState<boolean>(true)
  const [isAccountNameFieldValid, setIsAccountNameFieldValid] =
    useState<boolean>(true)
  const [accountAddressFieldErrorMsg, setAccountAddressFieldErrorMsg] =
    useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showErrorNotice, setShowErrorNotice] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    // Custom validation starts here
    if (name === 'accountAddress') {
      if (value === '') {
        setIsAccountAddressFieldValid(false)
        setAccountAddressFieldErrorMsg('This field is required.')
      } else if (!value.startsWith('0x') || value.length !== 42) {
        setIsAccountAddressFieldValid(false)
        setAccountAddressFieldErrorMsg(
          'A valid account address starts with 0x and 42 characters long.'
        )
      } else {
        setIsAccountAddressFieldValid(true)
      }
    }

    if (name === 'accountName') {
      if (value === '') {
        setIsAccountNameFieldValid(false)
      } else {
        setIsAccountNameFieldValid(true)
      }
    }
    // Custom validation ends here

    setData({ ...data, [name]: value })
  }

  const handleRegister = async (e: any) => {
    e.preventDefault()

    const { accountAddress, accountName, accountType } = data
    setIsLoading(true)
    setShowErrorNotice(false)

    try {
      const registerAccountResp = await profileContract?.methods
        .registerAccount(accountAddress, accountName, accountType)
        .send({ from: accounts[0], value: 0, gasPrice: 21000 })

      if (registerAccountResp) {
        console.log('registered Account', registerAccountResp)

        const {
          accountAddress,
          accountId,
          accountName,
          accountStatus,
          accountType,
        } = registerAccountResp.events.RegisterAccount.returnValues

        const participantsDetails: IParticipantDetails = {
          accountAddress,
          accountId: parseInt(accountId),
          accountName,
          accountStatus: parseInt(accountStatus),
          accountType: parseInt(accountType),
        }

        registerParticipant(participantsDetails)

        if (!registrationError) {
          setTimeout(() => {
            setIsLoading(false)
            setRegistrationSuccess(true)
          }, 2000)
        }
      }
    } catch (error) {
      let customErrorMsg: string

      if (error.message.includes('invalid address')) {
        customErrorMsg =
          'Account address invalid. Please try again with a different address.'
      } else if (error.message.includes('duplicate account')) {
        customErrorMsg = 'This account has already been registered.'
      } else if (error.message.includes('transactionErrorNoContract')) {
        customErrorMsg =
          'It looks like no contract has been deployed. Please ask the regulator to deploy the contract and try again.'
      } else if (error.message.includes('must provide an Ethereum address')) {
        customErrorMsg = error.message
      } else {
        customErrorMsg = 'Something went wrong. Please try again shortly.'
      }

      setIsLoading(false)
      setErrorMessage(customErrorMsg)
      setShowErrorNotice(true)
      console.log(error.message)
    }
  }

  return (
    <section className="container has-background-light">
      <div className="columns is-multiline">
        <div className="column is-10 is-offset-2 register">
          <div className="columns">
            <div className="column left mt-6">
              {registrationSuccess ? (
                <RegistrationSuccess
                  accountName={data.accountName}
                  accountType={data.accountType}
                  accountAddress={data.accountAddress}
                />
              ) : (
                <RegisterForm
                  showErrorNotice={showErrorNotice}
                  errorMessage={errorMessage}
                  handleChange={handleChange}
                  isAccountAddressFieldValid={isAccountAddressFieldValid}
                  accountAddressFieldErrorMsg={accountAddressFieldErrorMsg}
                  isAccountNameFieldValid={isAccountNameFieldValid}
                  isLoading={isLoading}
                  handleRegister={handleRegister}
                  accountType={data.accountType}
                />
              )}
            </div>
            <div className="column right has-text-centered">
              <img src={RegistrationImage} alt="registration infographics" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterAccount
