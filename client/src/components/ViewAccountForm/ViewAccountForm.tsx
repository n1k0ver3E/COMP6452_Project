import React, { FC, useContext } from 'react'
import { ProfileContractAPIContext } from '../../contexts/ProfileContractAPI'

const ViewAccountForm: FC = () => {
  const { registeredAccounts } = useContext(ProfileContractAPIContext)

  return (
    <>
      <h1 className="title is-4">Track your account progress</h1>
      <form>
        <div className="select is-fullwidth">
          <select defaultValue={'DEFAULT'} name="accountType" id="accountType">
            <option value={'DEFAULT'} disabled>
              Select Account Type
            </option>
          </select>
        </div>

        <label className="checkbox">
          <input type="checkbox" /> Account address not on the list
        </label>
      </form>
    </>
  )
}

export default ViewAccountForm
