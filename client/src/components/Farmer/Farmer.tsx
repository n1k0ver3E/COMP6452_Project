import React, { FC, useEffect } from 'react'
import 'bulma-calendar/dist/css/bulma-calendar.min.css'
// @ts-ignore
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js'
import './farmer.css'

const Farmer: FC = () => {
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
              'https://images.unsplash.com/photo-1489657780376-e0d8630c4bd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            }
            alt="farm"
            className="product-image"
          />
        </div>
        <div className="column is-half product-form has-background-light">
          <input id="dob" type="date" />
        </div>
      </div>
    </section>
  )
}

export default Farmer
