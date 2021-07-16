import React, { FC, createContext, useState } from 'react'
import api from '../../api'
import {
  IProductLocation,
} from '../../interfaces/trace'

interface ITraceAPI {
  logs: IProductLocation[],
  queryLogs: (productId: number) => void,
}

const contextDefaultValues: ITraceAPI = {
  logs: [],
  queryLogs: () => {},
}

export const TraceAPIContext = createContext<ITraceAPI>(contextDefaultValues)

const TraceAPIProvider: FC = ({ children }): any => {
  const [logs, setLogs] = useState<IProductLocation[]>([])

  const queryLogs = async (productId: number) => {
    try {
      const resp = await api.get( '/v1/trace/' + productId )

      // @ts-ignore
      setLogs( resp.data.logs );
    } catch (err) {
      setLogs( [] );
    }
  }

  return (
    <TraceAPIContext.Provider
      value={{
        queryLogs,
        logs,
      }}
    >
      {children}
    </TraceAPIContext.Provider>
  )
}

export default TraceAPIProvider
