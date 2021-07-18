import React, { FC, ChangeEvent } from 'react'
import ProfileTrackingImage from '../../../assets/database.png'
import { ProfileContractContext } from '../../../contexts/ProfileContract'
// import { ProductContractContext } from '../../../contexts/ProductContract'
// import { ProductContractAPIContext } from '../../../contexts/ProductContractAPI'


const Product: FC = () => {
    return (
      <section className="container has-background-light">
        <div className="columns is-multiline">
          <div className="column is-10 is-offset-2 register">
            <div className="columns">
              <div className="column left mt-6">
              
              <h1 className="title is-4">Add Product</h1>
              <form className="mt-5">
                <div className="field">
                  <div className="control">
                  <input
                    className="input mt-4"
                    id = "productName"
                    name="productName"
                    placeholder = "ProductName"
                  />
                  <input
                    className="input mt-3 mb-4"
                    id="productLocation"
                    name="productLocation"
                    placeholder = "productLocation"
                  />
                  <p className="description"><b>Planting Date</b></p>
                  <input
                    className="input mb-3"
                    name = "plantingDate"
                    id = "plantingDate"
                    type="date"

                  />
                  
                  <p className="description"><b>Harvest Date</b></p>
                  <input
                    className="input mb-3"
                    name = "harvestDate"
                    id = "harvestDate"
                    type="date"
                  />
                  

                  </div>
                  
                  <button 
                    className='button is-block is-link is-fullwidth mt-3'>
                    Add
                  </button>
                </div>
              </form>
              </div>
  
              <div className="column right has-text-centered">
                <img
                  src={ProfileTrackingImage}
                  alt="profile tracking"
                  className="side-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

export default Product
