import React, { FC } from 'react'
import { IUserTypeProps } from '../../interfaces/profileContract'

const SideNavBar: FC<IUserTypeProps> = ({ type }) => {
  const isRegulator = type === 'regulator'
  const isParticipant = type === 'participant'

  const regulatorMenu: string[] = ['Approve Account', 'Verify Document']
  const participationMenu: string[] = [
    'Register Account',
    'View Account',
    'Add Document',
    'View Document',
    'Product',
    'Tracking',
    'Recall',
  ]

  const navigationLinks = isRegulator
    ? regulatorMenu.map((menu: string, idx: number) => (
        <li key={idx}>
          <a>{menu}</a>
        </li>
      ))
    : participationMenu.map((menu: string, idx: number) => (
        <li key={idx}>
          <a>{menu}</a>
        </li>
      ))

  return (
    <div>
      <aside className="menu is-hidden-mobile">
        <p className="menu-label">MENU</p>
        <ul className="menu-list">
          <li>
            <a className="is-active">Dashboard</a>
            <ul>{navigationLinks}</ul>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default SideNavBar
