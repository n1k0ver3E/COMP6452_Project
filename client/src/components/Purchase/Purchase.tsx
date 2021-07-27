import React, { ChangeEvent, FC, useContext, useState, useEffect } from 'react'
import format from 'date-fns/format'
import ReactTooltip from 'react-tooltip'
import './purchase.css'
import {
  ICreateProductPayload,
  IPurchaseProcessDetails,
} from '../../interfaces/contract'
import { ProductContractAPIContext } from '../../contexts/ProductContractAPI'
import { ProductStatus } from '../../enums/contract'
import { shortenedAddress } from '../../helpers/stringMutations'

const initialState: IPurchaseProcessDetails = {
  productId: 'DEFAULT',
  price: 0,
}

const Purchase: FC = () => {
  const { getProductsByStatus, getProductById } = useContext(
    ProductContractAPIContext
  )

  const [data, setData] = useState<IPurchaseProcessDetails>(initialState)
  const [isPriceFieldValid, setIsPriceFieldValid] = useState<boolean>(false)
  const [products, setProducts] = useState<ICreateProductPayload[]>([])
  const [productDetails, setProductDetails] = useState({
    productId: -1,
    productName: '',
    productLocation: '',
    farmDate: new Date(),
    harvestDate: new Date(),
    processingType: '',
    receiverAddress: '',
    trackNumber: '',
    status: -1,
  })

  const [showTable, setShowTable] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getProducts = async () => {
      const products = await getProductsByStatus(ProductStatus.RETAILING)

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
                <th>Receiver Address</th>
                <th>Track Number</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{productDetails.productId}</td>
                <td>{productDetails.productName}</td>
                <td>{productDetails.productLocation}</td>
                <td>
                  {format(new Date(productDetails.farmDate), 'dd MMMM yyy')}
                </td>
                <td>
                  {format(new Date(productDetails.harvestDate), 'dd MMMM yyy')}
                </td>
                <td>{productDetails.processingType}</td>
                <td data-tip={productDetails.receiverAddress}>
                  {productDetails.receiverAddress.length > 20
                    ? shortenedAddress(productDetails.receiverAddress)
                    : productDetails.receiverAddress}
                  <ReactTooltip />
                </td>{' '}
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

            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="price"
                  id="price"
                  onChange={handleChange}
                  value={data.price}
                />
              </div>
            </div>

            <button
              className={
                isLoading
                  ? 'button is-block is-link is-fullwidth mt-3 is-loading'
                  : 'button is-block is-link is-fullwidth mt-3'
              }
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
    </section>
  )
}

export default Purchase
