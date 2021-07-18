import React, { FC, useContext, useEffect } from 'react'
import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'

const Dashboard: FC = () => {
  const { getAllParticipants } = useContext(ProfileContractAPIContext)

  useEffect(() => {
    getAllParticipants()
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
