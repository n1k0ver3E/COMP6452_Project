import React, { FC } from 'react'

const Retail: FC = () => {
  return (
    <section className="container">
      <div className="columns">
        <div className="column is-half">
          <img
            src={
              'https://images.unsplash.com/photo-1601647998384-a6e5b618e8f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=705&q=80'
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

export default Retail
