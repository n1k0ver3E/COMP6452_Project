import React, { ChangeEvent, FC, useState } from 'react'
import { ISendProductDetails } from '../../interfaces/contract'
import './shipping.css'

const sendProductInitialState: ISendProductDetails = {
  receiverAddress: '',
  logisticsAddress: '',
  trackNumber: '',
}

const Shipping: FC = () => {

  const [sendProductData, setSendProductData] = useState<ISendProductDetails>(
    sendProductInitialState
  )
  const [isReceiverAddressFieldValid, setIsReceiverAddressFieldValid] =
    useState<boolean>(false)
  const [isLogisticsAddressFieldValid, setIsLogisticsAddressFieldValid] =
    useState<boolean>(false)
  const [isTrackNumberFieldValid, setIsTrackNumberFieldValid] =
    useState<boolean>(false)


  const handleChangeSendProduct = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'receiverAddress') {
      if (value === '') {
        setIsReceiverAddressFieldValid(false)
      } else {
        setIsReceiverAddressFieldValid(true)
      }
    }

    if (name === 'logisticsAddress') {
      if (value === '') {
        setIsLogisticsAddressFieldValid(false)
      } else {
        setIsLogisticsAddressFieldValid(true)
      }
    }

    if (name === 'trackNumber') {
      if (value === '') {
        setIsTrackNumberFieldValid(false)
      } else {
        setIsTrackNumberFieldValid(true)
      }
    }

    setSendProductData({ ...sendProductData, [name]: value })
  }

  const handleSubmissionSendProduct = (e: any) => {
    e.preventDefault()
  }

  return (
    <section className="container">
      <div className="columns">
        <div className="column is-half">
          <img
            src={
              'https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
            }
            alt="farm"
            className="product-image"
          />
        </div>
        <div className="column is-half farmer-form has-background-white-bis">
          <div className="product-title">
            <div className="product-title">
              <h1 className="title is-4">Send Product</h1>
            </div>

            <form className="mt-5 shipping-form">
              <div className="field">
                <label className="label">Receiver (Address)</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="receiverAddress"
                    id="receiverAddress"
                    onChange={handleChangeSendProduct}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Logistics (Address)</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="logisticsAddress"
                    id="logisticsAddress"
                    onChange={handleChangeSendProduct}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Track Number</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="trackNumber"
                    id="trackNumber"
                    onChange={handleChangeSendProduct}
                  />
                </div>
              </div>

              <button
                className="button is-block is-link is-fullwidth mt-3"
                disabled={
                  !isReceiverAddressFieldValid ||
                  !isLogisticsAddressFieldValid ||
                  !isTrackNumberFieldValid
                }
                onClick={(e) => handleSubmissionSendProduct(e)}
              >
                Send
              </button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Shipping
