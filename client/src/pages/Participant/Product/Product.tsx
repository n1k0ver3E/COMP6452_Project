import React, { FC } from 'react'

const Product: FC = () => {
  return (
    <>
      <div className="tabs is-centered is-boxed">
        <ul>
          <li>
            <a>
              <span className="icon is-small">
                <i className="fas fa-seedling" aria-hidden="true" />
              </span>
              <span>Farmer</span>
            </a>
          </li>
          <li>
            <a>
              <span className="icon is-small">
                <i className="fas fa-industry" aria-hidden="true" />
              </span>
              <span>Manufacturer</span>
            </a>
          </li>
          <li>
            <a>
              <span className="icon is-small">
                <i className="fas fa-store-alt" aria-hidden="true" />
              </span>
              <span>Retail</span>
            </a>
          </li>
          <li>
            <a>
              <span className="icon is-small">
                <i className="fas fa-credit-card" aria-hidden="true" />
              </span>
              <span>Purchase</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Product
