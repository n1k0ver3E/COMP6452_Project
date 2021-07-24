import React, { FC, useEffect, useState } from 'react'
import 'bulma-calendar/dist/css/bulma-calendar.min.css'
// @ts-ignore
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js'
import './farmer.css'
import { IFarmerProductDetails } from '../../interfaces/contract'

const initialState: IFarmerProductDetails = {
  productName: '',
  productLocation: '',
}

const Farmer: FC = () => {
  const [data, setData] = useState<IFarmerProductDetails>(initialState)
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
      plantingDate.bulmaCalendar.on('select', (datepicker: any) => {
        setPlantingDate(datepicker.data.value())
        setIsPlaningDateFieldValid(true)
      })

      // @ts-ignore
      plantingDate.bulmaCalendar.on('clear', (_datepicker: any) => {
        setPlantingDate('')
        setIsPlaningDateFieldValid(false)
      })
    }

    const harvestDate = document.querySelector('#harvestDate')
    if (harvestDate) {
      // @ts-ignore
      harvestDate.bulmaCalendar.on('select', (datepicker: any) => {
        setHarvestDate(datepicker.data.value())
        setIsHarvestDateFieldValid(true)
      })

      // @ts-ignore
      harvestDate.bulmaCalendar.on('clear', (_datepicker: any) => {
        setHarvestDate('')
        setIsHarvestDateFieldValid(false)
      })
    }
  }, [])

  const handleChange = (e: any) => {
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

  console.log('data', data)
  console.log('plantingDate', plantingDate)
  console.log('harvestDate', harvestDate)

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
                  className={
                    isProductNameFieldValid ? 'input' : 'input is-danger'
                  }
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
                  className={
                    isProductLocationFieldValid ? 'input' : 'input is-danger'
                  }
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
    </section>
  )
}

export default Farmer
