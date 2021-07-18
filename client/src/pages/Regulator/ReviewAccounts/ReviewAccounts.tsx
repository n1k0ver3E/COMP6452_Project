import React, { FC, useContext } from 'react'
import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'
import AccountsTable from '../../../components/AccountsTable'
import UserAccountsIcon from '../../../assets/user-accounts.png'
import './reviewaccounts.css'

const ReviewAccounts: FC = () => {
  const { pendingAccounts, approvedAccounts, rejectedAccounts } = useContext(
    ProfileContractAPIContext
  )

  console.log('pendingAccounts', pendingAccounts)
  console.log('approvedAccounts', approvedAccounts)
  console.log('rejectedAccounts', rejectedAccounts)

  const COLUMNS = [
    {
      Header: 'Account Name',
      accessor: 'accountName',
    },
    {
      Header: 'Account Address',
      accessor: 'accountAddress',
    },
    {
      Header: 'Account Type',
      accessor: 'accountType',
    },
    {
      Header: 'Account Status',
      accessor: 'accountStatus',
    },
  ]

  return (
    <section className="container">
      <div className="column is-12">
        <div className="title is-4">Accounts to Review</div>
        <AccountsTable columns={COLUMNS} data={pendingAccounts} />
      </div>

      <div className="column is-12 mt-5">
        <div className="columns">
          <div className="column is-10">
            <div>
              <div className="title is-4">Rejected Accounts</div>
              <AccountsTable columns={COLUMNS} data={rejectedAccounts} />
            </div>

            <div className="mt-6">
              <div className="title is-4">Approved Accounts</div>
              <AccountsTable columns={COLUMNS} data={approvedAccounts} />
            </div>
          </div>

          <div className="column is-2 icon-wrapper">
            <img
              src={UserAccountsIcon}
              alt={'user accounts icon'}
              className="user-accounts"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewAccounts
