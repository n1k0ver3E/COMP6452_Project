import React, { FC } from 'react'

const Purchase: FC = () => {
  return (
    <section className="container">
      <div className="columns">
        <div className="column is-half">
          <img
            src={
              'https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
            }
            alt="farm"
            className="product-image"
          />
        </div>
        <div className="column is-half product-form has-background-light">
          SECOND COLUMN
        </div>
      </div>
    </section>
  )
}

export default Purchase
