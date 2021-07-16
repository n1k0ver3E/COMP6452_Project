import React, { FC, useState, ChangeEvent, useContext } from 'react'
import MainNavbar from '../../components/MainNavBar'
// import TraceAPIContext from '../../contexts/TraceAPI'
import api from '../../api'

import { IProductLocation } from '../../interfaces/trace'

const Track: FC = () => {
  const [inputProductId, setInputProductId] = useState<string>('0')
  const [productId, setProductId] = useState<number>()
  const [logs, setLogs] = useState<IProductLocation[]>([])
  //const { queryLogs } = useContext( TraceAPIContext )

  const queryLogs = async (productId: number) => {
    try {
      const resp = await api.post('/v1/track/trace/' + productId)

      // @ts-ignore
      setLogs(resp.data.logs)
    } catch (err) {
      setLogs([])
    }
  }

  // function queryLoop() {
  //   queryLogs(productId == null ? 0 : productId)

  //   setTimeout( queryLoop, 5000);
  // }

  // queryLoop();

  return (
    <>
      <MainNavbar />
      <section className="hero wrapper">
        <div className="hero-body">
          <div className="container">
            <div className="columns reverse-columns">
              <div>
                Product ID
                <input
                  type="number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInputProductId(e.target.value)
                  }
                />
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    queryLogs(parseInt(inputProductId))
                  }}
                >
                  GET
                </button>
              </div>
              {productId}
            </div>
            <div>
              <table className="table">
                <tr>
                  <th></th>
                  <th>Block Number</th>
                  <th>Time</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
                {logs.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.blockNumber}</td>
                      <td>{ new Date(item.timestamp).toLocaleDateString()} { new Date(item.timestamp).toLocaleTimeString()}</td>
                      <td>{item.latitude}</td>
                      <td>{item.longitude}</td>
                    </tr>
                  )
                })}
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Track
