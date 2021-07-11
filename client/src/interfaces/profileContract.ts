type userType = 'regulator' | 'participant'

export interface IUserTypeProps {
  type: userType
}

export interface IProfileContract {
  profileContract: any
}

export interface IMenuList {
  title: string
  link: string
}
