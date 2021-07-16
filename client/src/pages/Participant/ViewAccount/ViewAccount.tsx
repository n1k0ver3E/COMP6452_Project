import React, { FC, ChangeEvent, useState, useContext } from 'react'
import ProfileTrackingImage from '../../../assets/database.png'
import { ProfileContractContext } from '../../../contexts/ProfileContract'
import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'
import ViewAccountForm from '../../../components/ViewAccountForm'
import ViewAccountStatus from '../../../components/ViewAccountStatus'
import './viewaccount.css'
import {
  IViewAccountDetails,
  IAccountStatus,
} from '../../../interfaces/contract'

const initialState: IViewAccountDetails = {
  registeredAddress: '',
  accountAddress: '',
}

const initialAccountStatus = {
  accountId: null,
  accountName: '',
  accountStatus: null,
  accountType: null,
  updated: false,
}

const ViewAccount: FC = () => {
  const { profileContract } = useContext(ProfileContractContext)
  const { registeredAccounts } = useContext(ProfileContractAPIContext)
  const [data, setData] = useState<IViewAccountDetails>(initialState)
  const [checked, setChecked] = useState<boolean>(false)
  const [accountStatus, setAccountStatus] =
    useState<IAccountStatus>(initialAccountStatus)
  const [isRegisteredAddressFieldValid, setIsRegisteredAddressFieldValid] =
    useState<boolean>(true)
  const [isAccountAddressFieldValid, setIsAccountAddressFieldValid] =
    useState<boolean>(true)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    // Custom validation starts here
    if (name === 'registeredAddress' && !checked) {
      console.log('value', value)
    }

    if (name === 'accountAddress') {
      console.log('value', value)
    }

    // Custom validation ends here

    setData({ ...data, [name]: value })
  }

  const handleViewAccount = async (e: any) => {
    e.preventDefault()

    const { registeredAddress, accountAddress } = data
    let address: string

    if (!registeredAccounts.length || checked) {
      address = accountAddress
    } else {
      address = registeredAddress
    }

    const contractResp = await profileContract?.methods
      .getAccountInfoByAddress(address)
      .call()

    const { accountId, accountName, accountStatusValue, accountTypeValue } =
      contractResp

    setAccountStatus({
      accountId: parseInt(accountId),
      accountName,
      accountStatus: parseInt(accountStatusValue),
      accountType: parseInt(accountTypeValue),
      updated: true,
    })
  }

  return (
    <section className="container has-background-light">
      <div className="columns is-multiline">
        <div className="column is-10 is-offset-2 register">
          <div className="columns">
            <div className="column left mt-6">
              <ViewAccountForm
                handleChange={handleChange}
                handleViewAccount={handleViewAccount}
                checked={checked}
                setChecked={setChecked}
              />

              {accountStatus.updated && (
                <div className="mt-5">
                  <ViewAccountStatus
                    accountName={accountStatus.accountName}
                    accountStatus={accountStatus.accountStatus}
                    accountType={accountStatus.accountType}
                  />
                </div>
              )}
            </div>

            <div className="column right has-text-centered">
              <img
                src={ProfileTrackingImage}
                alt="profile tracking"
                className="side-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewAccount
