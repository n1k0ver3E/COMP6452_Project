import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import 'bulma-calendar/dist/css/bulma-calendar.min.css'
// @ts-ignore
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js'
import './farmer.css'
import {
  IFarmerProductDetails,
  IFarmerProductInitial,
} from '../../interfaces/contract'

const initialState: IFarmerProductInitial = {
  productName: '',
  productLocation: '',
}

const Farmer: FC = () => {
  const [data, setData] = useState<IFarmerProductInitial>(initialState)
  const [plantingDate, setPlantingDate] = useState<string>('')
  const [harvestDate, setHarvestDate] = useState<string>('')
  const [isProductNameFieldValid, setIsProductNameFieldValid] =
    useState<boolean>(false)
  const [isProductLocationFieldValid, setIsProductLocationFieldValid] =
    useState<boolean>(false)
  const [isPlantingDateFieldValid, setIsPlaningDateFieldValid] =
    useState<boolean>(false)
  const [isHarvestDateFieldValid, setIsHarvestDateFieldValid] =
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

    const plantingDate = document.querySelector('#plantingDate')
    if (plantingDate) {
      // @ts-ignore
      plantingDate.bulmaCalendar.on('select', (datepicker) => {
        setPlantingDate(datepicker.data.value())
        setIsPlaningDateFieldValid(true)
      })

      // @ts-ignore
      plantingDate.bulmaCalendar.on('clear', (_datepicker) => {
        setPlantingDate('')
        setIsPlaningDateFieldValid(false)
      })
    }

    const harvestDate = document.querySelector('#harvestDate')
    if (harvestDate) {
      // @ts-ignore
      harvestDate.bulmaCalendar.on('select', (datepicker) => {
        setHarvestDate(datepicker.data.value())
        setIsHarvestDateFieldValid(true)
      })

      // @ts-ignore
      harvestDate.bulmaCalendar.on('clear', (_datepicker) => {
        setHarvestDate('')
        setIsHarvestDateFieldValid(false)
      })
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'productName') {
      if (value === '') {
        setIsProductNameFieldValid(false)
      } else {
        setIsProductNameFieldValid(true)
      }
    }

    if (name === 'productLocation') {
      if (value === '') {
        setIsProductLocationFieldValid(false)
      } else {
        setIsProductLocationFieldValid(true)
      }
    }

    setData({ ...data, [name]: value })
  }

  const handleAddProduct = (e: any) => {
    e.preventDefault()

    const payload: IFarmerProductDetails = {
      ...data,
      plantingDate,
      harvestDate,
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
              'https://images.unsplash.com/photo-1489657780376-e0d8630c4bd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            }
            alt="farm"
            className="product-image"
          />
        </div>
        <div className="column is-half farmer-form has-background-white-bis">
          <div className="product-title">
            <h1 className="title is-4">Add Product</h1>
          </div>
          <form className="mt-5">
            <div className="field">
              <label className="label">Product Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="productName"
                  id="productName"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Product Location</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="productLocation"
                  id="productLocation"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Planting Date</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  name="plantingDate"
                  id="plantingDate"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Harvest Date</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  name="harvestDate"
                  id="harvestDate"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="button is-block is-link is-fullwidth mt-3"
              onClick={(e) => handleAddProduct(e)}
              disabled={
                !isProductNameFieldValid ||
                !isProductLocationFieldValid ||
                !isPlantingDateFieldValid ||
                !isHarvestDateFieldValid
              }
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

export default Farmer
