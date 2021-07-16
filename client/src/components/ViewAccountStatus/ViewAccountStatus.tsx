import React, { FC } from 'react'
import { IAccountStatus } from '../../interfaces/contract'

const ViewAccountStatus: FC<IAccountStatus> = ({
  accountName,
  accountStatus,
  accountType,
}) => {
  return (
    <div>
      {accountName !== '' ? (
        <table className="table is-striped is-fullwidth">
          <tr className="th">
            <th>Name</th>
            <th>Status</th>
            <th>Type</th>
          </tr>

          <tr>
            <td>{accountName}</td>
            <td>{accountStatus}</td>
            <td>{accountType}</td>
          </tr>
        </table>
      ) : (
        <div className="notification is-warning">
          The account address you are looking has not been registered. Please
          try again with a different account address.
        </div>
      )}
    </div>
  )
}

export default ViewAccountStatus
