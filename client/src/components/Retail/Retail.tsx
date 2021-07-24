import React, { ChangeEvent, FC, useState } from 'react'
import './retail.css'
import { IRetailProcessDetails } from '../../interfaces/contract'

const initialState: IRetailProcessDetails = {
  productId: -1,
}

const Retail: FC = () => {
  const [data, setData] = useState<IRetailProcessDetails>(initialState)
  // TESTING ONLY
  const [showPayload, setShowPayload] = useState<boolean>(false)
  const [payload, setPayload] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target

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
              'https://images.unsplash.com/photo-1601647998384-a6e5b618e8f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=705&q=80'
            }
            alt="farm"
            className="product-image"
          />
        </div>
        <div className="column is-half retail-form has-background-white-bis">
          <div className="product-title">
            <h1 className="title is-4">Retail Process</h1>
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
            <button
              className="button is-block is-link is-fullwidth mt-3"
              disabled={data.productId === -1}
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

export default Retail
