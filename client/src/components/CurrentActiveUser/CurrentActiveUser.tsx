import React, { FC, useContext } from 'react'
import { ProfileContractContext } from '../../contexts/ProfileContract'
import './currentactiveuser.css'

const CurrentActiveUser: FC = () => {
  const { accounts } = useContext(ProfileContractContext)

  const refreshUser = () => {
    window.location.reload()
  }

  return (
    <div className="container current-active-user">
      <div>
        {/* <span className="user">Active User: {accounts[0]}</span> */}
        <span className="icon refresh-user" onClick={refreshUser}>
          <i className="fas fa-sync-alt" />
        </span>
      </div>
    </div>
  )
}

export default CurrentActiveUser
