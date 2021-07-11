import React, { FC, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './sidenavbar.css'
import { ProfileContractContext } from '../../contexts/ProfileContract'
import { IUserTypeProps, IMenuList } from '../../interfaces/contract'

const SideNavBar: FC<IUserTypeProps> = ({ type }) => {
  const { profileContract } = useContext(ProfileContractContext)
  const isRegulator = type === 'regulator'
  const history = useHistory()
  const pathName = window.location.pathname

  const navigateTo = (url: string) => {
    history.push(url)
  }

  const navigateToDashboard = () => {
    if (pathName.includes('regulator')) {
      navigateTo('/regulator')
    }
    if (pathName.includes('participant')) {
      navigateTo('/participant')
    }
  }

  const reConnect = () => {
    window.location.reload()
  }

  const regulatorMenu = [
    {
      title: 'Approve Account',
      link: '/regulator/approve-document',
    },
    {
      title: 'Verify Document',
      link: '/regulator/verify-document',
    },
  ]

  const participationMenu: IMenuList[] = [
    {
      title: 'Register Account',
      link: '/participant/register',
    },
    {
      title: 'View Account',
      link: '/participant/view-account',
    },
    {
      title: 'Add Document',
      link: '/participant/add-document',
    },
    {
      title: 'View Document',
      link: '/participant/view-document',
    },
    {
      title: 'Product',
      link: '/participant/product',
    },
    {
      title: 'Tracking',
      link: '/participant/tracking',
    },
    {
      title: 'Recall',
      link: '/participant/recall',
    },
  ]

  const navigationLinks = isRegulator
    ? regulatorMenu.map((menu: IMenuList, idx: number) => (
        <li key={idx}>
          <a
            className={pathName === menu.link ? 'is-active' : ''}
            onClick={() => navigateTo(menu.link)}
          >
            {menu.title}
          </a>
        </li>
      ))
    : participationMenu.map((menu, idx: number) => (
        <li key={idx}>
          <a
            className={pathName === menu.link ? 'is-active' : ''}
            onClick={() => navigateTo(menu.link)}
          >
            {menu.title}
          </a>
        </li>
      ))

  return (
    <div>
      <aside className="menu is-hidden-mobile">
        <div className="menu-label">
          {profileContract ? (
            <span className="tag is-success is-light">Connected</span>
          ) : (
            <span className="tag is-warning is-light">Not Connected</span>
          )}

          {!profileContract && (
            <>
              <span className="icon-text pointer" onClick={reConnect}>
                <span className="icon has-text-info icon-size">
                  <i className="fas fa-link" />
                </span>
              </span>

              <div className="notification notification-box mt-2">
                Please ensure that you have meta-mask properly configured before
                connecting. To connect, simply click on the chain icon.
              </div>
            </>
          )}
        </div>
        <ul className="menu-list">
          <li>
            <a
              className={
                pathName === '/regulator' || pathName === '/participant'
                  ? 'is-active'
                  : ''
              }
              onClick={() => navigateToDashboard()}
            >
              Dashboard
            </a>
            <ul>{navigationLinks}</ul>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default SideNavBar
