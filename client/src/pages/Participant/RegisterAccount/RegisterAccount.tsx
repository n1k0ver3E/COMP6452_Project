import React, { FC, ChangeEvent, useContext, useState } from 'react'
import RegistrationImage from '../../../assets/registration.png'
import { ProfileContractContext } from '../../../contexts/ProfileContract'
import {
  IAccountTypeDropdown,
  IRegisterAccountDetails,
} from '../../../interfaces/contract'
import { AccountType } from '../../../enums/contract'
import useWeb3 from '../../../hooks/web3'

const initialState: IRegisterAccountDetails = {
  accountAddress: '',
  accountName: '',
  accountType: null,
}

const RegisterAccount: FC = () => {
  const { accounts } = useWeb3()

  const { profileContract } = useContext(ProfileContractContext)

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
  // FOR TESTING ONLY

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
      const registerAccount = await profileContract?.methods
        .registerAccount(accountAddress, accountName, accountType)
        .send({ from: accounts[0] })

      setTimeout(() => {
        setData(initialState)
        setIsLoading(false)

        // TO BE REMOVED
        alert(
          JSON.stringify(registerAccount.events.RegisterAccount.returnValues)
        )

        console.log(
          'registeredAccount',
          registerAccount.events.RegisterAccount.returnValues
        )

        // TODO - ADD STATUS CHECK TO SEE IF CONTRACT IS CONNECTED
        // TODO - SHOW REGISTRATION SUCCESS
        // TODO - SAVE INFO TO LOCAL STORAGE
        // TODO - Save TO DATABASE
      }, 2000)
    } catch (error) {
      let customErrorMsg: string

      if (error.message.includes('invalid address')) {
        customErrorMsg =
          'Account address invalid. Please try again with a different address.'
      } else if (error.message.includes('duplicate account')) {
        customErrorMsg = 'This account has already been registered.'
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

  const accountTypeDropDownOptions: IAccountTypeDropdown[] = [
    {
      value: AccountType.FARMER,
      account: 'Farmer',
    },
    {
      value: AccountType.MANUFACTURER,
      account: 'Manufacturer',
    },
    {
      value: AccountType.RETAILER,
      account: 'Retailer',
    },
    {
      value: AccountType.CONSUMER,
      account: 'Consumer',
    },
    {
      value: AccountType.LOGISTICS,
      account: 'Logistic',
    },
    {
      value: AccountType.ORACLE,
      account: 'Oracle',
    },
  ]

  console.log('profileContract', profileContract)

  return (
    <section className="container has-background-light">
      <div className="columns is-multiline">
        <div className="column is-10 is-offset-2 register">
          <div className="columns">
            <div className="column left mt-6">
              <h1 className="title is-4">Register today</h1>
              <p className="description">Join us now to deliver value!</p>

              {showErrorNotice && (
                <div className="notification is-danger is-light mt-3">
                  {errorMessage}
                </div>
              )}

              <form className="mt-5">
                <div className="field">
                  <div className="control">
                    <input
                      className={
                        isAccountAddressFieldValid ? 'input' : 'input is-danger'
                      }
                      type="text"
                      placeholder="Account Address"
                      name="accountAddress"
                      id="accountAddress"
                      onChange={handleChange}
                    />
                  </div>
                  <p
                    className={
                      isAccountAddressFieldValid
                        ? 'help is-hidden'
                        : 'help is-danger'
                    }
                  >
                    {accountAddressFieldErrorMsg}
                  </p>
                </div>

                <div className="field">
                  <div className="control">
                    <input
                      className={
                        isAccountNameFieldValid ? 'input' : 'input is-danger'
                      }
                      type="text"
                      placeholder="Account Name"
                      name="accountName"
                      id="accountName"
                      onChange={handleChange}
                    />
                  </div>
                  <p
                    className={
                      isAccountNameFieldValid
                        ? 'help is-hidden'
                        : 'help is-danger'
                    }
                  >
                    This field is required
                  </p>
                </div>

                <div className="select is-fullwidth">
                  <select
                    defaultValue={'DEFAULT'}
                    name="accountType"
                    id="accountType"
                    onChange={handleChange}
                  >
                    <option value={'DEFAULT'} disabled>
                      Select Account Type
                    </option>

                    {accountTypeDropDownOptions.map(
                      (account: IAccountTypeDropdown, idx: number) => (
                        <option key={idx} value={account.value}>
                          {account.account}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <button
                  className={
                    isLoading
                      ? 'button is-block is-link is-fullwidth mt-3 is-loading'
                      : 'button is-block is-link is-fullwidth mt-3'
                  }
                  onClick={handleRegister}
                  disabled={
                    !isAccountAddressFieldValid ||
                    !isAccountNameFieldValid ||
                    data.accountType === null
                  }
                >
                  Register
                </button>
                <br />
              </form>
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
