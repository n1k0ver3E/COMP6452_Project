import React, { FC } from 'react'
import HomeNavbar from '../../components/HomeNavbar'

const Participant: FC = () => {
  return (
    <>
      <HomeNavbar type={'participant'} />
      <div className="container">
        <div className="columns">
          <div className="column is-3">SIDE NAVIGATION HERE</div>

          <div className="column is-9">CONTENT HERE</div>
        </div>
      </div>
    </>
  )
}

export default Participant
