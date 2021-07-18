import React, { FC, useContext } from 'react'
import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'
import AccountsTable from '../../../components/AccountsTable'
import UserAccountsIcon from '../../../assets/user-accounts.png'
import { AccountType, AccountStatus } from '../../../enums/contract'
import { titleCase } from '../../../helpers'
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
      Cell: ({ value }: any) => {
        return titleCase(AccountType[value])
      },
    },
    {
      Header: 'Account Status',
      accessor: 'accountStatus',
      Cell: ({ value, row, column }: any) => {
        console.log('value', value)
        console.log('row', row)
        console.log('value', column)
        return (
          <div className="select">
            <select defaultValue={value} name="accountType" id="accountType">
              {value === AccountStatus.PENDING && (
                <>
                  <option value={value}>
                    {titleCase(AccountStatus[value])}
                  </option>
                  <option value={AccountStatus.REJECTED}>Reject</option>
                  <option value={AccountStatus.APPROVED}>Approve</option>
                </>
              )}

              {value === AccountStatus.REJECTED && (
                <>
                  <option value={value}>
                    {titleCase(AccountStatus[value])}
                  </option>
                  <option value={AccountStatus.PENDING}>Pending</option>
                  <option value={AccountStatus.APPROVED}>Approve</option>
                </>
              )}

              {value === AccountStatus.APPROVED && (
                <>
                  <option value={value}>
                    {titleCase(AccountStatus[value])}
                  </option>
                  <option value={AccountStatus.PENDING}>Pending</option>
                  <option value={AccountStatus.REJECTED}>Reject</option>
                </>
              )}
            </select>
          </div>
        )
      },
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
