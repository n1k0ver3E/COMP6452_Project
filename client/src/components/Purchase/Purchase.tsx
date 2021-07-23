import React, { FC } from 'react'
import './purchase.css'

const Purchase: FC = () => {
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
              <label className="label">Price</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="processingType"
                  id="processingType"
                />
              </div>
            </div>

            <button className="button is-block is-link is-fullwidth mt-3">
              Submit
            </button>
            <br />
          </form>
        </div>
      </div>
    </section>
  )
}

export default Purchase
