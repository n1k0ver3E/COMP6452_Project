import React, { FC, useState, ChangeEvent } from 'react'
import RegistrationImage from '../../../assets/registration.png'
import {
  IAccountTypeDropdown,
  IRegisterAccountDetails,
} from '../../../interfaces/contract'
import { AccountType } from '../../../enums/contract'

const RegisterAccount: FC = () => {
  const [data, setData] = useState<IRegisterAccountDetails>({
    accountAddress: '',
    accountName: '',
    accountType: 0,
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
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
                      className="input"
                      type="text"
                      placeholder="Account Address"
                      name="accountAddress"
                      id="accountAddress"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Account Name"
                      name="accountName"
                      id="accountName"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="select is-fullwidth ">
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
                <button className="button is-block is-link is-fullwidth mt-3">
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
