import React, { FC, useEffect } from 'react'
import 'bulma-calendar/dist/css/bulma-calendar.min.css'
// @ts-ignore
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js'
import './manufacturer.css'

const Manufacturer: FC = () => {
  useEffect(() => {
    const calendars = bulmaCalendar.attach('[type="date"]', {})
    calendars.forEach((calendar: any) => {
      calendar.on('date:selected', (date: any) => {
        console.log(date)
      })
    })

    const element = document.querySelector('#dob')
    if (element) {
      // @ts-ignore
      element.bulmaCalendar.on('select', (datepicker: any) => {
        console.log(datepicker.data.value())
      })
    }
  }, [])

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
              <label className="label">Product ID</label>
              <div className="select is-normal is-fullwidth">
                <select>
                  <option>Select dropdown</option>
                  <option>Sample Product 1</option>
                  <option>Sample Product 2</option>
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
                />
              </div>
            </div>

            <button className="button is-block is-link is-fullwidth mt-3">
              Add
            </button>
            <br />
          </form>
        </div>
      </div>
    </section>
  )
}

export default Manufacturer
