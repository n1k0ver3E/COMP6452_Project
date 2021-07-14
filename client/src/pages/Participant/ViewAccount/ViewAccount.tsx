import React, { FC, ChangeEvent, useState } from 'react'
import ProfileTrackingImage from '../../../assets/database.png'
import ViewAccountForm from '../../../components/ViewAccountForm'
import './viewaccount.css'
import { IViewAccountDetails } from '../../../interfaces/contract'

const initialState: IViewAccountDetails = {
  registeredAddress: '',
  accountAddress: '',
}

const ViewAccount: FC = () => {
  const [data, setData] = useState<IViewAccountDetails>(initialState)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    console.log(name, value)

    setData({ ...data, [name]: value })
  }

  console.log('data', data)

  const handleViewAccount = async (e: any) => {
    e.preventDefault()

    const { registeredAddress, accountAddress } = data
    let address

    // if (registeredAddress) {
    //   address = registeredAddress
    // } else if (registeredAddress && accountAddress) {
    //   address = accountAddress
    // }else {
    //
    // }

    console.log('address to send', address)
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
