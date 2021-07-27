import React, { ChangeEvent, FC, useState, useContext, useEffect } from 'react'
import {
  ICreateProductPayload,
  ISendProductDetails,
} from '../../interfaces/contract'
import './shipping.css'
import { ProductStatus } from '../../enums/contract'
import { ProductContractAPIContext } from '../../contexts/ProductContractAPI'

const sendProductInitialState: ISendProductDetails = {
  productId: 'DEFAULT',
  receiverAddress: '',
  logisticsAddress: '',
  trackNumber: '',
}

const Shipping: FC = () => {
  const { getProductsByStatus, getProductById, shippingProductInfo } =
    useContext(ProductContractAPIContext)

  const [sendProductData, setSendProductData] = useState<ISendProductDetails>(
    sendProductInitialState
  )
  const [isReceiverAddressFieldValid, setIsReceiverAddressFieldValid] =
    useState<boolean>(false)
  const [isLogisticsAddressFieldValid, setIsLogisticsAddressFieldValid] =
    useState<boolean>(false)
  const [isTrackNumberFieldValid, setIsTrackNumberFieldValid] =
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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getProducts = async () => {
      const products = await getProductsByStatus(ProductStatus.MANUFACTURING)

      setProducts(products)
    }

    getProducts()
  }, [])

  const handleChangeSendProduct = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'productId') {
      const product = await getProductById(parseInt(value))

      setProductDetails(product)
      setShowTable(true)
    }

    if (name === 'receiverAddress') {
      if (value === '') {
        setIsReceiverAddressFieldValid(false)
      } else {
        setIsReceiverAddressFieldValid(true)
      }
    }

    if (name === 'logisticsAddress') {
      if (value === '') {
        setIsLogisticsAddressFieldValid(false)
      } else {
        setIsLogisticsAddressFieldValid(true)
      }
    }

    if (name === 'trackNumber') {
      if (value === '') {
        setIsTrackNumberFieldValid(false)
      } else {
        setIsTrackNumberFieldValid(true)
      }
    }

    setSendProductData({ ...sendProductData, [name]: value })
  }

  const handleSubmissionSendProduct = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: DO THE ON-CHAIN CALL

    // API CALL
    await shippingProductInfo(sendProductData)

    // Do an API call to get update for the dropdown
    setTimeout(async () => {
      const products = await getProductsByStatus(ProductStatus.MANUFACTURING)
      setProducts(products)

      // Reset form state, stop loading spinner and hide table
      setSendProductData(sendProductInitialState)
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
              'https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
            }
            alt="farm"
            className="product-image"
          />
        </div>
        <div className="column is-half farmer-form has-background-white-bis">
          <div className="product-title">
            <div className="product-title">
              <h1 className="title is-4">Shipping Process</h1>
            </div>

            <form className="mt-5 shipping-form">
              <div className="field">
                <label className="label">Product</label>
                <div className="select is-normal is-fullwidth">
                  <select
                    name="productId"
                    id="productId"
                    onChange={handleChangeSendProduct}
                    value={sendProductData.productId}
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
                <label className="label">Receiver (Address)</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="receiverAddress"
                    id="receiverAddress"
                    onChange={handleChangeSendProduct}
                    value={sendProductData.receiverAddress}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Logistics (Address)</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="logisticsAddress"
                    id="logisticsAddress"
                    onChange={handleChangeSendProduct}
                    value={sendProductData.logisticsAddress}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Track Number</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="trackNumber"
                    id="trackNumber"
                    onChange={handleChangeSendProduct}
                    value={sendProductData.trackNumber}
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
                  !isReceiverAddressFieldValid ||
                  !isLogisticsAddressFieldValid ||
                  !isTrackNumberFieldValid ||
                  sendProductData.productId === 'DEFAULT'
                }
                onClick={(e) => handleSubmissionSendProduct(e)}
              >
                Send
              </button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Shipping
