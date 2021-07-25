import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import 'bulma-calendar/dist/css/bulma-calendar.min.css'
// @ts-ignore
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js'
import './manufacturer.css'
import {
  IManufacturerProcessDetails,
  ISendProductDetails,
} from '../../interfaces/contract'

const initialState: IManufacturerProcessDetails = {
  productId: -1,
  processingType: '',
}

const sendProductInitialState: ISendProductDetails = {
  receiverAddress: '',
  logisticsAddress: '',
  trackNumber: '',
}

const Manufacturer: FC = () => {
  const [data, setData] = useState<IManufacturerProcessDetails>(initialState)
  const [sendProductData, setSendProductData] = useState<ISendProductDetails>(
    sendProductInitialState
  )
  const [isProcessingTypeFieldValid, setIsProcessingTypeFieldValid] =
    useState<boolean>(false)
  const [isReceiverAddressFieldValid, setIsReceiverAddressFieldValid] =
    useState<boolean>(false)
  const [isLogisticsAddressFieldValid, setIsLogisticsAddressFieldValid] =
    useState<boolean>(false)
  const [isTrackNumberFieldValid, setIsTrackNumberFieldValid] =
    useState<boolean>(false)
  // TESTING ONLY
  const [showPayload, setShowPayload] = useState<boolean>(false)
  const [payload, setPayload] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'processingType') {
      if (value === '') {
        setIsProcessingTypeFieldValid(false)
      } else {
        setIsProcessingTypeFieldValid(true)
      }
    }

    setData({ ...data, [name]: value })
  }

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

  const handleSubmission = (e: any) => {
    e.preventDefault()

    // TESTING ONLY TO BE REMOVED AND REPLACED WITH REAL API CALLS
    // @ts-ignore
    setPayload(data)
    setShowPayload(true)
  }

  const handleSubmissionSendProduct = (e: any) => {
    e.preventDefault()

    // TESTING ONLY TO BE REMOVED AND REPLACED WITH REAL API CALLS
    // @ts-ignore
    setPayload(sendProductData)
    setShowPayload(true)
  }

  return (
    <section className="container">
      <div className="columns">
        <div className="column is-half">
          <img
            src={
              'https://images.unsplash.com/photo-1518253042715-a2534e1b0a7b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
            }
            alt="farm"
            className="manufacturer-image"
          />
        </div>
        <div className="column is-half manufacturing-form has-background-white-bis">
          <>
            <div className="product-title">
              <h1 className="title is-4">Manufacturer Process</h1>
            </div>
            <form className="mt-5">
              <div className="field">
                <label className="label">Product</label>
                <div className="select is-normal is-fullwidth">
                  <select
                    defaultValue={'DEFAULT'}
                    name="productId"
                    id="productId"
                    onChange={handleChange}
                  >
                    <option value={'DEFAULT'} disabled>
                      Select Product
                    </option>
                    <option value="1">Sample Product 1</option>
                    <option value="2">Sample Product 2</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label">Processing Type</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="processingType"
                    id="processingType"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className="button is-block is-link is-fullwidth mt-3"
                disabled={!isProcessingTypeFieldValid || data.productId === -1}
                onClick={(e) => handleSubmission(e)}
              >
                Add
              </button>
              <br />
            </form>

            <div className="product-title">
              <h1 className="title is-4">Send Product</h1>
            </div>
            <form className="mt-5">
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
          </>
        </div>
      </div>

      {/*TESTING ONLY TO BE REMOVED AND REPLACED WITH REAL API CALLS*/}
      {showPayload && (
        <div>
          <h1>SENDING PAYLOAD TO API</h1>
          <h1>{JSON.stringify(payload)}</h1>
        </div>
      )}
    </section>
  )
}

export default Manufacturer
