import React, { FC, ChangeEvent, useContext, useState } from 'react'
import RegistrationImage from '../../../assets/registration.png'
import { ProfileContractContext } from '../../../contexts/ProfileContract'
import {
  IAccountTypeDropdown,
  IRegisterAccountDetails,
} from '../../../interfaces/contract'
import { AccountType } from '../../../enums/contract'
import useWeb3 from '../../../hooks/web3'

const RegisterAccount: FC = () => {
  const { accounts } = useWeb3()

  const { profileContract } = useContext(ProfileContractContext)
  const [data, setData] = useState<IRegisterAccountDetails>({
    accountAddress: '',
    accountName: '',
    accountType: null,
  })
  const [isAccountAddressFieldValid, setIsAccountAddressFieldValid] =
    useState<boolean>(true)
  const [isAccountNameFieldValid, setIsAccountNameFieldValid] =
    useState<boolean>(true)
  const [accountAddressFieldErrorMsg, setAccountAddressFieldErrorMsg] =
    useState<string>('')

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

    try {
      const registerAccount = await profileContract?.methods
        .registerAccount(accountAddress, accountName, accountType)
        .send({ from: accounts[0] })

      console.log('registeredAccount', registerAccount)
    } catch (error) {
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

  console.log('data', data)

  return (
    <section className="container has-background-light">
      <div className="columns is-multiline">
        <div className="column is-10 is-offset-2 register">
          <div className="columns">
            <div className="column left mt-6">
              <h1 className="title is-4">Register today</h1>
              <p className="description">Join us now to deliver value!</p>
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
                  className="button is-block is-link is-fullwidth mt-3"
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
