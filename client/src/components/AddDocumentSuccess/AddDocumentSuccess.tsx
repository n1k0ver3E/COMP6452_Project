import React, { FC } from 'react'
import './adddocumentsuccess.css'

// interface IRegistrationSuccessProps {
//   accountName: string
//   accountType: number
//   accountAddress: string
//   backToRegister: () => void
// }

const AddDocumentSuccess: FC = () => {
  return (
    <div className="upload-success mb-3">
      <div className="icon-text upload-check-icon">
        <span className="icon has-text-success">
          <i className="fas fa-check-circle" />
        </span>
      </div>
      <div className="mt-5">
        <div className="notification is-info is-light">
          <div>
            Congratulations,{' '}
            <span className="has-text-weight-bold">Awesome</span>!
          </div>
          <div>The registration was a success</div>
          <div className="mt-4">
            Your registration for account type{' '}
            <span className="has-text-weight-bold">Peekaboo</span> is now in
            pending. You can track the status of this account via the 'View
            Account' menu and entering the below address:
          </div>
          <div className="mt-5 has-text-weight-bold">Got it</div>
        </div>
      </div>

      <div className="mt-3">
        <button className="button is-link">Back to Add Document </button>
      </div>
    </div>
  )
}

export default AddDocumentSuccess
