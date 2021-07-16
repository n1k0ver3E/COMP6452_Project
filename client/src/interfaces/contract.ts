import { ChangeEvent, Dispatch, SetStateAction } from 'react'

type userType = 'regulator' | 'participant'

export interface IUserTypeProps {
  type: userType
}

export interface IProfileContract {
  profileContract: any
  accounts: string[]
}

export interface IMenuList {
  title: string
  link: string
}

export interface IAccountTypeDropdown {
  value: number
  account: string
}

export interface IRegisterAccountDetails {
  accountAddress: string
  accountName: string
  accountType: number
}

export interface IRegisterFormProps {
  showErrorNotice: boolean
  errorMessage: string
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  isAccountAddressFieldValid: boolean
  accountAddressFieldErrorMsg: string
  isAccountNameFieldValid: boolean
  isLoading: boolean
  handleRegister: (e: any) => Promise<void>
  accountType: number
}

export interface IViewAccountFormProps {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleViewAccount: (e: any) => Promise<void>
  checked: boolean
  setChecked: (checked:boolean) => void
}

export interface IParticipantDetails {
  accountAddress: string
  accountId: number
  accountName: string
  accountStatus: number
  accountType: number
}

export interface IProfileContractAPI {
  registerParticipant: (participantDetails: IParticipantDetails) => void
  registeredAccounts: IParticipantDetails[]
  registrationError: boolean
}

export interface IViewAccountDetails {
  registeredAddress: string
  accountAddress: string
}
