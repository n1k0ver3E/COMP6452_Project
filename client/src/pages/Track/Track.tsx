import React, { FC, useState, ChangeEvent, useContext } from 'react'
import MainNavbar from '../../components/MainNavBar'
import { TraceContractAPIContext } from '../../contexts/TraceContractAPI'
import { TraceContractContext } from '../../contexts/TraceContract'
import useWeb3 from '../../hooks/web3'
//import api from '../../api'

//import { IProductLocation } from '../../interfaces/trace'

const Track: FC = () => {
  const { isLoading, isWeb3, web3, accounts } = useWeb3()
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
      const resp = await traceContract?.methods
        .requestForLocation(parseInt(inputProductId))
        .send({from: accounts[0]})

      if (resp) {
        alert("REQUESTED");
      }
      
    } catch (error) {
    }
  }

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
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleRequestLocation(e)
                  }}
                >
                  REQUEST LOCATION
                </button>
              </div>
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
        </div>
      </section>
    </>
  )
}

export default Track
