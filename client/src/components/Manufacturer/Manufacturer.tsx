import React, { ChangeEvent, FC, useState, useContext, useEffect } from 'react'
import './manufacturer.css'
import {
  ICreateProductPayload,
  IManufacturerProcessDetails,
  ISendProductDetails,
} from '../../interfaces/contract'
import { ProductContractAPIContext } from '../../contexts/ProductContractAPI'
import { ProductCategory } from '../../enums/contract'

const initialState: IManufacturerProcessDetails = {
  productId: 'DEFAULT',
  processingType: '',
}

const Manufacturer: FC = () => {
  const { getFarmingAndManufacturingProducts, getProductById, manuProductInfo } = useContext(
    ProductContractAPIContext
  )

  const [data, setData] = useState<IManufacturerProcessDetails>(initialState)
  const [isProcessingTypeFieldValid, setIsProcessingTypeFieldValid] =
    useState<boolean>(false)
  const [products, setProducts] = useState<ICreateProductPayload[]>([])
  const [productDetails, setProductDetails] = useState({
    productId: -1,
    productName: '',
    productLocation: '',
    farmDate: '',
    harvestDate: '',
    processingType: '',
    status: -1,
  })
  const [showTable, setShowTable] = useState<boolean>(false)
  const [isManufacturingLoading, setIsManufacturingLoading] = useState<boolean>(false)

  useEffect(() => {
    const getProducts = async () => {
      const products = await getFarmingAndManufacturingProducts()

      setProducts(products)
    }

    getProducts()
  }, [])

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'productId') {
      const product = await getProductById(parseInt(value))

      setProductDetails(product)
      setShowTable(true)
    }

    if (name === 'processingType') {
      if (value === '') {
        setIsProcessingTypeFieldValid(false)
      } else {
        setIsProcessingTypeFieldValid(true)
      }
    }

    setData({ ...data, [name]: value })
  }

  const handleSubmission = async (e: any) => {
    e.preventDefault()
    setIsManufacturingLoading(true)

    // DO THE ON-CHAIN CALL

    // API CALL
    const product = await manuProductInfo(data)

    // SET PRODUCT DETAILS
    setProductDetails(product)
    setData(initialState)
    setIsManufacturingLoading(false)
    console.log('product', product)
  }

  return (
    <section className="container">
      {showTable && (
        <div className="is-success is-light mb-5">
          <div className="title is-6">
            <strong>Product Information</strong>
          </div>

          <table className="table is-striped table-style">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Farm Date</th>
                <th>Harvest Date</th>
                {productDetails.processingType !== '' && (
                  <th>Processing Type</th>
                )}
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{productDetails.productId}</td>
                <td>{productDetails.productName}</td>
                <td>{productDetails.productLocation}</td>
                <td>{productDetails.farmDate}</td>
                <td>{productDetails.harvestDate}</td>
                {productDetails.processingType !== '' && (
                  <td>{productDetails.processingType}</td>
                )}
                <td>{ProductCategory[productDetails.status]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

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
        <div className="column is-half farmer-form has-background-white-bis">
          <>
            <div className="product-title mt-6">
              <h1 className="title is-4">Manufacturer Process</h1>
            </div>
            <form className="mt-5">
              <div className="field">
                <label className="label">Product</label>
                <div className="select is-normal is-fullwidth">
                  <select
                    name="productId"
                    id="productId"
                    onChange={handleChange}
                    value={data.productId}
                  >
                    <option value={'DEFAULT'} disabled>
                      Select Product
                    </option>
                    {products?.map((product: any, idx: number) => (
                      <option key={idx} value={product.productId}>
                        {product.productName} ({product.productLocation})
                      </option>
                    ))}

                    {!products.length && (
                      <option disabled>Product Selection Unavailable</option>
                    )}
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
                    onChange={handleChange}
                    value={data.processingType}
                  />
                </div>
              </div>

              <button
                className={isManufacturingLoading ? 'button is-block is-link is-fullwidth mt-3 is-loading' : 'button is-block is-link is-fullwidth mt-3'}
                disabled={!isProcessingTypeFieldValid || data.productId === -1}
                onClick={(e) => handleSubmission(e)}
              >
                Add
              </button>
              <br />
            </form>
          </>
        </div>
      </div>
    </section>
  )
}

export default Manufacturer
