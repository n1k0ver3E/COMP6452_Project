import React, { FC } from 'react'
import RegistrationImage from '../../../assets/registration.png'
import { IAccountTypeDropdown } from '../../../interfaces/contract'

const RegisterAccount: FC = () => {
  const accountTypeDropDownOptions: IAccountTypeDropdown[] = [
    {
      value: 1,
      account: 'Farmer',
    },
    {
      value: 2,
      account: 'Manufacturer',
    },
    {
      value: 3,
      account: 'Retailer',
    },
    {
      value: 4,
      account: 'Consumer',
    },
    {
      value: 5,
      account: 'Logistic',
    },
    {
      value: 6,
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
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Account Name"
                    />
                  </div>
                </div>

                <div className="select is-fullwidth ">
                  <select defaultValue={'DEFAULT'}>
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
