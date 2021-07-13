import React, { FC } from 'react'
import RegistrationImage from '../../../assets/registration.png'
import ViewAccountForm from '../../../components/ViewAccountForm'

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
              <img src={RegistrationImage} alt="registration infographics" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewAccount
