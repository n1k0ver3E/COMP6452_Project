import React, { FC, ChangeEvent, useState, useContext } from 'react'
import ProfileTrackingImage from '../../../assets/database.png'
import { ProfileContractContext } from '../../../contexts/ProfileContract'
import ViewAccountForm from '../../../components/ViewAccountForm'
import './viewaccount.css'
import { IViewAccountDetails } from '../../../interfaces/contract'

const initialState: IViewAccountDetails = {
  registeredAddress: '',
  accountAddress: '',
}

const ViewAccount: FC = () => {
  const { profileContract, accounts } = useContext(ProfileContractContext)
  const [data, setData] = useState<IViewAccountDetails>(initialState)
  const [checked, setChecked] = useState<boolean>(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    console.log(name, value)

    setData({ ...data, [name]: value })
  }

  const handleViewAccount = async (e: any) => {
    e.preventDefault()

    const { registeredAddress, accountAddress } = data
    let address: string

    if (checked) {
      address = accountAddress
    } else {
      address = registeredAddress
    }

    console.log('sending address', address)
    console.log('typeof string', typeof address)

    console.log('type of accounts zero', typeof accounts[0])

    const contractResp = await profileContract?.methods
      .getAccountInfoByAddress(address)
      .send({ from: accounts[0], value: 0, gasPrice: 21000 })

    console.log('contract response', contractResp)
  }

  return (
    <section className="container has-background-light">
      <div className="columns is-multiline">
        <div className="column is-10 is-offset-2 register">
          <div className="columns">
            <div className="column left mt-6">
              <ViewAccountForm
                handleChange={handleChange}
                handleViewAccount={handleViewAccount}
                checked={checked}
                setChecked={setChecked}
              />
            </div>
            <div className="column right has-text-centered">
              <img
                src={ProfileTrackingImage}
                alt="profile tracking"
                className="side-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewAccount
