import React, { FC, useContext } from 'react'
import { DocumentContractContext } from '../../../contexts/DocumentContract'

const AddDocument: FC = () => {
  const { documentContract, accounts } = useContext(DocumentContractContext)

  return (
    <div>
      <h1>ADD DOCUMENT</h1>
    </div>
  )
}

export default AddDocument
