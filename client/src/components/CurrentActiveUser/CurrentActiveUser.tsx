import React, { FC, useContext } from 'react'
import { ProfileContractContext } from '../../contexts/ProfileContract'
import './currentactiveuser.css'

const CurrentActiveUser: FC = () => {
  const { accounts } = useContext(ProfileContractContext)

  return (
    <div className="container current-active-user">
      <div>
        <span className="user">Active User: {accounts[0]}</span>
        <span className="icon refresh-user">
          <i className="fas fa-sync-alt" />
        </span>
      </div>
    </div>
  )
}

export default CurrentActiveUser
