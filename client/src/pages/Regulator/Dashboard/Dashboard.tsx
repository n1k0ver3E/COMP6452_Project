import React, { FC, useContext, useEffect } from 'react'
import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'
import './dashboard.css'
import Banner from '../../../assets/banner.jpg'

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
      <section className="hero is-link welcome is-small">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Hello, Regulator.</h1>
            <h2 className="subtitle">I hope you are having a great day!</h2>
          </div>
        </div>
      </section>

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

      <section className="hero welcome is-small mt-5">
        <div className="container">
          <img src={Banner} alt="random" className="hero-image" />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
