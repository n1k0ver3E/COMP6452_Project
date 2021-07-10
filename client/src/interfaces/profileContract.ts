import { Contract } from 'web3-eth-contract'

export interface IProfileContract {
  profileContract: Contract | (() => Contract) | undefined
}
