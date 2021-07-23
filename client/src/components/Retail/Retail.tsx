import React, { FC } from 'react'
import './retail.css'

const Retail: FC = () => {
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
              <label className="label">Product ID</label>
              <div className="select is-normal is-fullwidth">
                <select>
                  <option>Select dropdown</option>
                  <option>Sample Product 1</option>
                  <option>Sample Product 2</option>
                </select>
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

export default Retail
