import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { IUserTypeProps, IMenuList } from '../../interfaces/profileContract'

const SideNavBar: FC<IUserTypeProps> = ({ type }) => {
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
        <p className="menu-label">MENU</p>
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
