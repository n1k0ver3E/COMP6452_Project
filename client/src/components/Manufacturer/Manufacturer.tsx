import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import 'bulma-calendar/dist/css/bulma-calendar.min.css'
// @ts-ignore
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js'
import './manufacturer.css'
import {
  IManufacturerProcessDetails,
  IManufacturerProcessInitial,
} from '../../interfaces/contract'

const initialState: IManufacturerProcessInitial = {
  productId: -1,
  processingType: '',
}

const Manufacturer: FC = () => {
  const [data, setData] = useState<IManufacturerProcessInitial>(initialState)
  const [timeStamp, setTimestamp] = useState<string>('')
  const [isProcessingTypeFieldValid, setIsProcessingTypeFieldValid] =
    useState<boolean>(false)
  const [isTimestampFieldValid, setIsTimestampFieldValid] =
    useState<boolean>(false)
  // TESTING ONLY
  const [showPayload, setShowPayload] = useState<boolean>(false)
  const [payload, setPayload] = useState('')

  useEffect(() => {
    const calendars = bulmaCalendar.attach('[type="date"]', {})
    calendars.forEach((calendar: any) => {
      calendar.on('date:selected', (date: any) => {
        console.log(date)
      })
    })

    const timestamp = document.querySelector('#timestamp')
    if (timestamp) {
      // @ts-ignore
      timestamp.bulmaCalendar.on('select', (datepicker: any) => {
        setTimestamp(datepicker.data.value())
        setIsTimestampFieldValid(true)
      })

      // @ts-ignore
      timestamp.bulmaCalendar.on('clear', (_datepicker) => {
        setTimestamp('')
        setIsTimestampFieldValid(false)
      })
    }
  }, [])

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

  const handleSubmission = (e: any) => {
    e.preventDefault()

    const payload: IManufacturerProcessDetails = {
      ...data,
      timeStamp,
    }

    // TESTING ONLY TO BE REMOVED AND REPLACED WITH REAL API CALLS
    // @ts-ignore
    setPayload(payload)
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
            className="product-image"
          />
        </div>
        <div className="column is-half manufacturing-form has-background-white-bis">
          <div className="product-title">
            <h1 className="title is-4">Manufacturing Process</h1>
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

            <div className="field">
              <label className="label">Timestamp</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  name="timestamp"
                  id="timestamp"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="button is-block is-link is-fullwidth mt-3"
              disabled={
                !isProcessingTypeFieldValid ||
                !isTimestampFieldValid ||
                data.productId === -1
              }
              onClick={(e) => handleSubmission(e)}
            >
              Add
            </button>
            <br />
          </form>
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
