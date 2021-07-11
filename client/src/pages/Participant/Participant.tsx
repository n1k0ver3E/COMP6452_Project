import React, { FC } from 'react'
import HomeNavbar from '../../components/HomeNavbar'
import SideNavBar from '../../components/SideNavBar'

const Participant: FC = () => {
  return (
    <>
      <HomeNavbar type={'participant'} />
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <SideNavBar type={'participant'} />
          </div>

          <div className="column is-9">CONTENT HERE</div>
        </div>
      </div>
    </>
  )
}

export default Participant
