import React, { FC } from 'react'
import Logo from '../../assets/logo.jpg'
import './homenavbar.css'

type userType = 'regulator' | 'participant'

interface IProps {
  type: userType
}

const HomeNavbar: FC<IProps> = ({ type }) => {
  // TODO - For mobile view, add a function to toggle menu bar

  const isRegulator = type === 'regulator'
  const isParticipant = type === 'participant'

  return (
    <nav className="navbar is-white">
      <div className="container">
        <div className="navbar-brand">
          <a className="brand-text" href="/">
            <img src={Logo} alt={'Logo'} className="home-logo" />
          </a>
          <div className="navbar-burger burger" data-target="navMenu">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            <a
              className={isRegulator ? 'is-active navbar-item' : 'navbar-item'}
              href="/regulator"
            >
              Regulator
            </a>
            <a
              className={
                isParticipant ? 'is-active navbar-item' : 'navbar-item'
              }
              href="/participant"
            >
              Participant
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HomeNavbar
