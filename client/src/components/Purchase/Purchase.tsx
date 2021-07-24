import React, { ChangeEvent, FC, useState } from 'react'
import './purchase.css'
import { IPurchaseProcessDetails } from '../../interfaces/contract'

const initialState: IPurchaseProcessDetails = {
  productId: -1,
  price: 0,
}

const Purchase: FC = () => {
  const [data, setData] = useState<IPurchaseProcessDetails>(initialState)
  const [isPriceFieldValid, setIsPriceFieldValid] = useState<boolean>(false)
  // TESTING ONLY
  const [showPayload, setShowPayload] = useState<boolean>(false)
  const [payload, setPayload] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'price') {
      if (value === '') {
        setIsPriceFieldValid(false)
      } else {
        setIsPriceFieldValid(true)
      }
    }

    setData({ ...data, [name]: value })
  }

  const handleSubmission = (e: any) => {
    e.preventDefault()

    // TESTING ONLY TO BE REMOVED AND REPLACED WITH REAL API CALLS
    // @ts-ignore
    setPayload(data)
    setShowPayload(true)
  }

  return (
    <section className="container">
      <div className="columns">
        <div className="column is-half">
          <img
            src={
              'https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
            }
            alt="farm"
            className="product-image"
          />
        </div>
        <div className="column is-half purchase-form has-background-white-bis">
          <div className="product-title">
            <h1 className="title is-4">Purchase Process</h1>
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
                  <option value={'DEFAULT'}>Select Product</option>
                  <option value="1">Sample Product 1</option>
                  <option value="2">Sample Product 2</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="price"
                  id="price"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="button is-block is-link is-fullwidth mt-3"
              disabled={
                !isPriceFieldValid || data.productId === -1 || data.price === 0
              }
              onClick={(e) => handleSubmission(e)}
            >
              Submit
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

export default Purchase
