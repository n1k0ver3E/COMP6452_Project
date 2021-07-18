import React, { FC } from 'react'

interface IGlobalFilterProps {
  filter: any
  setFilter: any
}

const GlobalFilter: FC<IGlobalFilterProps> = ({ filter, setFilter }) => {
  return (
    <span>
      Search:{' '}
      <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

export default GlobalFilter
