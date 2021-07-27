import React, { FC, useState, ChangeEvent, useContext } from 'react'
import MainNavbar from '../../../components/MainNavBar'
import { TraceContractAPIContext } from '../../../contexts/TraceContractAPI'
import { TraceContractContext } from '../../../contexts/TraceContract'
//import getWeb3 from '../../utils/getWeb3'
import useWeb3 from '../../../hooks/web3'
import getAccounts from '../../../utils/getAccounts'

//import api from '../../api'

//import { IProductLocation } from '../../interfaces/trace'

const Track: FC = () => {
  const { accounts } = useWeb3()
  const [inputProductId, setInputProductId] = useState<string>('0')
  //const {  accounts } = useContext(ProfileContractContext)
  const { logs, queryLogs } = useContext(TraceContractAPIContext)
  const { traceContract } = useContext(TraceContractContext)

  const handleRequestLocation = async (e: any) => {
    e.preventDefault()

    //const { accountAddress, accountName, accountType } = data
    //setIsLoading(true)
    //setShowErrorNotice(false)

    try {
      const _accounts = await getAccounts(accounts)
      const resp = await traceContract?.methods
        .requestForLocation(parseInt(inputProductId))
        .send({ from: _accounts[0] })

      if (resp) {
        // alert('REQUESTED')
        console.log(resp)
      }
    } catch (error) {}
  }

  return (
    <>
      <section className="container has-background-light">
        <div className="columns is-multiline">
          <div className="column is-10 is-offset-2">
            <div className="columns is-multiline">
              <div className="column left mt-6 is-half">
                <h1 className="title is-4">Track Product</h1>

                <div className="mt-5">
                  <div className="is-fullwidth">
                    <input
                      className="input"
                      type="number"
                      min="1"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setInputProductId(e.target.value)
                      }
                      placeholder="Product ID"
                    />
                  </div>
                  <button
                    className="button is-link mt-3"
                    onClick={(e) => {
                      e.preventDefault()
                      queryLogs(parseInt(inputProductId))
                    }}
                  >
                    Get location logs
                  </button>
                  <button
                    className="button is-link mt-3 ml-3"
                    onClick={(e) => {
                      e.preventDefault()
                      handleRequestLocation(e)
                    }}
                  >
                    Request location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns is-multiline">
          <div className="column is-10 is-offset-1 is-offset-0 pl-3 pr-3">
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
                    <td>{index + 1}</td>
                    <td>{item.blockNumber}</td>
                    <td>
                      {new Date(item.timestamp).toLocaleDateString()}{' '}
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </td>
                    <td>{item.latitude}</td>
                    <td>{item.longitude}</td>
                  </tr>
                )
              })}
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default Track
