import React, { FC } from 'react'

type userType = 'regulator' | 'participant'

interface IProps {
  type: userType
}

const HomeNavbar: FC<IProps> = ({ type }) => {
  return (
    <div>
      <h1>HOME NAVBAR</h1>
    </div>
  )
}

export default HomeNavbar
