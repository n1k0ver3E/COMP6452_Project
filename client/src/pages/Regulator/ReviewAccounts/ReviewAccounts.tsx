import React, { FC, useContext } from 'react'
import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'
import AccountsTable from '../../../components/AccountsTable'

const ReviewAccounts: FC = () => {
  const { pendingAccounts, approvedAccounts, rejectedAccounts } = useContext(
    ProfileContractAPIContext
  )

  console.log('pendingAccounts', pendingAccounts)
  console.log('approvedAccounts', approvedAccounts)
  console.log('rejectedAccounts', rejectedAccounts)

  const COLUMNS = [
    {
      Header: 'Name',
      accessor: 'accountName',
    },
    {
      Header: 'Address',
      accessor: 'accountAddress',
    },
    {
      Header: 'Type',
      accessor: 'accountType',
    },
    {
      Header: 'Status',
      accessor: 'accountStatus',
    },
  ]

  return (
    <div>
      <AccountsTable columns={COLUMNS} data={pendingAccounts} />
    </div>
  )
}

export default ReviewAccounts
