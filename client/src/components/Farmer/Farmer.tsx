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
  const [farmDate, setFarmDate] = useState<string>('')
  const [harvestDate, setHarvestDate] = useState<string>('')
  const [isProductNameFieldValid, setIsProductNameFieldValid] =
    useState<boolean>(false)
  const [isProductLocationFieldValid, setIsProductLocationFieldValid] =
    useState<boolean>(false)
  const [isFarmDateFieldValid, setIsFarmDateFieldValid] =
    useState<boolean>(false)
  const [isHarvestDateFieldValid, setIsHarvestDateFieldValid] =
    useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const calendars = bulmaCalendar.attach('[type="date"]', {})
    calendars.forEach((calendar: any) => {
      calendar.on('date:selected', (date: any) => {
        console.log(date)
      })
    })

    const farmDate = document.querySelector('#farmDate')
    if (farmDate) {
      // @ts-ignore
      farmDate.bulmaCalendar.on('select', (datepicker) => {
        setFarmDate(datepicker.data.value())
        setIsFarmDateFieldValid(true)
      })

      // @ts-ignore
      farmDate.bulmaCalendar.on('clear', (_datepicker) => {
        setFarmDate('')
        setIsFarmDateFieldValid(false)
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
      farmDate,
      harvestDate,
    }

    const farmDateType = new Date(farmDate)
    const harvestDateType = new Date(harvestDate)

    if (harvestDateType < farmDateType) {
      setError(true)
      setErrorMessage(
        'Harvest time should be later than farm date. Please select a different date.'
      )
      return
    }

    console.log(payload)
    setError(false)
    setErrorMessage('')
  }

  return (
    <section className="container">
      {error && (
        <div className="notification is-danger is-light">{errorMessage}</div>
      )}
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
              <label className="label">Farm Date</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  name="farmDate"
                  id="farmDate"
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
                !isFarmDateFieldValid ||
                !isHarvestDateFieldValid
              }
            >
              Add
            </button>
            <br />
          </form>
        </div>
      </div>
    </section>
  )
}

export default Farmer
