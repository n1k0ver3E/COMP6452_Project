import React, { FC, useContext, useState } from 'react'
import { ProfileContractAPIContext } from '../../contexts/ProfileContractAPI'
import {
  IParticipantDetails,
  IViewAccountFormProps,
} from '../../interfaces/contract'

const ViewAccountForm: FC<IViewAccountFormProps> = ({
  handleChange,
  handleViewAccount,
}) => {
  const { registeredAccounts } = useContext(ProfileContractAPIContext)
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <>
      <h1 className="title is-4">View your account progress</h1>
      <form>
        {registeredAccounts.length && !checked ? (
          <div className="select is-fullwidth">
            <select
              defaultValue={'DEFAULT'}
              name="registeredAddress"
              id="registeredAddress"
              onChange={handleChange}
            >
              <option value={'DEFAULT'} disabled>
                Select Account Address
              </option>
              {registeredAccounts?.map(
                (account: IParticipantDetails, idx: number) => (
                  <option key={idx} value={account.accountAddress}>
                    {account.accountAddress}
                  </option>
                )
              )}
            </select>
          </div>
        ) : null}

        {registeredAccounts.length ? (
          <div className="mt-2 mb-2">
            <label className="checkbox">
              <input
                type="checkbox"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              />{' '}
              Account address not on list
            </label>
          </div>
        ) : null}

        {!registeredAccounts.length || checked ? (
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Account address"
                name="accountAddress"
                id="accountAddress"
                onChange={handleChange}
              />
            </div>
          </div>
        ) : null}

        <button
          className="button is-block is-link is-fullwidth mt-3"
          onClick={(e) => handleViewAccount(e)}
        >
          View Account
        </button>
      </form>
    </>
  )
}

export default ViewAccountForm
