import React, { FC, useContext, useEffect } from 'react'
import DashboardHeroHeader from '../../../components/DashboardHeroHeader'
import DashboardHeroFooter from '../../../components/DashboardHeroFooter'
import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'

const Dashboard: FC = () => {
  const {
    getAllParticipants,
    pendingAccounts,
    rejectedAccounts,
    approvedAccounts,
  } = useContext(ProfileContractAPIContext)

  useEffect(() => {
    getAllParticipants()
  }, [])

  return (
    <div>
      <DashboardHeroHeader userType={'Regulator'} />
      <section className="info-tiles mt-5">
        <div className="tile is-ancestor has-text-centered">
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">{pendingAccounts.length}</p>
              <p className="subtitle">
                Pending{' '}
                {pendingAccounts.length === 0 || pendingAccounts.length === 1
                  ? 'User'
                  : 'Users'}
              </p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">{rejectedAccounts.length}</p>
              <p className="subtitle">
                Rejected{' '}
                {rejectedAccounts.length === 0 || rejectedAccounts.length === 1
                  ? 'User'
                  : 'Users'}
              </p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">{approvedAccounts.length}</p>
              <p className="subtitle">
                Approved{' '}
                {approvedAccounts.length === 0 || approvedAccounts.length === 1
                  ? 'User'
                  : 'Users'}
              </p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">0</p>
              <p className="subtitle">Document to verify</p>
            </article>
          </div>

          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">0</p>
              <p className="subtitle">Document verified</p>
            </article>
          </div>
        </div>
      </section>

      <DashboardHeroFooter />
    </div>
  )
}

export default Dashboard
