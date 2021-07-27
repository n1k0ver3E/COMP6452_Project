import React, { ChangeEvent, FC, useState, useContext, useEffect } from 'react'
import './retail.css'
import {
  ICreateProductPayload,
  IRetailProcessDetails,
} from '../../interfaces/contract'
import { ProductContractAPIContext } from '../../contexts/ProductContractAPI'
import { ProductStatus } from '../../enums/contract'

const initialState: IRetailProcessDetails = {
  productId: 'DEFAULT',
}

const Retail: FC = () => {
  const { getProductsByStatus, getProductById, retailProductInfo } = useContext(
    ProductContractAPIContext
  )

  const [data, setData] = useState<IRetailProcessDetails>(initialState)
  const [products, setProducts] = useState<ICreateProductPayload[]>([])
  const [productDetails, setProductDetails] = useState({
    productId: -1,
    productName: '',
    productLocation: '',
    farmDate: '',
    harvestDate: '',
    processingType: '',
    receiverAddress: '',
    logisticsAddress: '',
    trackNumber: '',
    status: -1,
  })
  const [showTable, setShowTable] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getProducts = async () => {
      const products = await getProductsByStatus(ProductStatus.SHIPPING)

      setProducts(products)
    }

    getProducts()
  }, [])

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'productId') {
      const product = await getProductById(parseInt(value))

      setProductDetails(product)
      setShowTable(true)
    }

    setData({ ...data, [name]: value })
  }

  const handleSubmission = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: DO THE ON-CHAIN CALL

    // API CALL
    await retailProductInfo(data)

    // Do an API call to get update for the dropdown
    setTimeout(async () => {
      const products = await getProductsByStatus(ProductStatus.SHIPPING)
      setProducts(products)

      // Reset form state, stop loading spinner and hide table
      setData(initialState)
      setIsLoading(false)
      setShowTable(false)
    }, 1000)
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
                <th>Processing Type</th>
                <th>Receiver (Address)</th>
                <th>Logistics (Address)</th>
                <th>Track Number</th>
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
                <td>{productDetails.processingType}</td>
                <td>{productDetails.receiverAddress}</td>
                <td>{productDetails.logisticsAddress}</td>
                <td>{productDetails.trackNumber}</td>
                <td>{ProductStatus[productDetails.status]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

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
                    <option disabled>No Products To Process</option>
                  )}
                </select>
              </div>
            </div>
            <button
              className={
                isLoading
                  ? 'button is-block is-link is-fullwidth mt-3 is-loading'
                  : 'button is-block is-link is-fullwidth mt-3'
              }
              disabled={data.productId === 'DEFAULT'}
              onClick={(e) => handleSubmission(e)}
            >
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
