import React, { FC } from 'react'
import ProfileTrackingImage from '../../../assets/database.png'
import ViewAccountForm from '../../../components/ViewAccountForm'
import './viewaccount.css'

const ViewAccount: FC = () => {
  return (
    <section className="container has-background-light">
      <div className="columns is-multiline">
        <div className="column is-10 is-offset-2 register">
          <div className="columns">
            <div className="column left mt-6">
              <ViewAccountForm />
            </div>
            <div className="column right has-text-centered">
              <img
                src={ProfileTrackingImage}
                alt="profile tracking"
                className="side-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewAccount
