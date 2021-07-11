import React, { FC } from 'react'
import HomeNavbar from '../../components/HomeNavbar'
import SideNavBar from '../../components/SideNavBar'

const Regulator: FC = () => {
  return (
    <>
      <HomeNavbar type={'regulator'} />
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <SideNavBar type={'regulator'} />
          </div>

          <div className="column is-9">CONTENT HERE</div>
        </div>
      </div>
    </>
  )
}

export default Regulator
