import React, { FC } from 'react'
import './supplyChainOneLine.css'
import { ISupplyChainOneLine } from '../../interfaces/contract'
import { StepperNav } from "vertical-stepper-nav";

const SupplyChainOneLine: FC<ISupplyChainOneLine> = ({
  manufacturerAddress,
  distributorAddress,
  retailerAddress,
  ConsumerAddress,
  statusType,
}) => {
  return (
    <div style={{ marginLeft: 60 }}>
      {" "}
      <StepperNav
        steps={[
          {
            stepContent: () => <div style={{ fontSize: 20 }}>Farmer
              <div style={{ fontSize: 20 }}>Address: xxxxxxxxxxxxxx</div>
            </div>
            ,
            stepStatusCircleSize: 36,
            stepStateColor: "green"
          },
          {
            stepContent: () => <div style={{ fontSize: 20 }}>Manufacturer
              <div style={{ fontSize: 20 }}>Address: xxxxxxxxxxxxxx</div>
            </div>,
            stepStatusCircleSize: 36,
            stepStateColor: "green"
          },
          {
            stepContent: () => <div style={{ fontSize: 20 }}>Logistic
              <div style={{ fontSize: 20 }}>Address: xxxxxxxxxxxxxx</div>
            </div>,
            stepStatusCircleSize: 36,
            stepStateColor: "red"
          },
          {
            stepContent: () => <div style={{ fontSize: 20 }}>Retailer
              <div style={{ fontSize: 20 }}>Address: xxxxxxxxxxxxxx</div>
            </div>,
            stepStatusCircleSize: 36,
            stepStateColor: "gray"
          },
          {
            stepContent: () => <div style={{ fontSize: 20 }}>Consumer
              <div style={{ fontSize: 20 }}>Address: xxxxxxxxxxxxxx</div>
            </div>,
            stepStatusCircleSize: 36,
            stepStateColor: "gray"
          }
        ]}
      />
    </div>

  )
}

export default SupplyChainOneLine
