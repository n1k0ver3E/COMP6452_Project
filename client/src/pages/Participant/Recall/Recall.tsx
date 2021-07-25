import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
// import { DocumentContractContext } from '../../../contexts/DocumentContract'
// import { DocumentContractAPIContext } from '../../../contexts/DocumentContractAPI'
// import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'
import { ProfileContractContext } from '../../../contexts/ProfileContract'
import { ProductContractContext } from '../../../contexts/ProductContract'
import { ProductContractAPIContext } from '../../../contexts/ProductContractAPI'
import DocumentImage from '../../../assets/documents.png'
// import { IParticipantDetails } from '../../../interfaces/contract'
// import { titleCase } from '../../../helpers'
// import { AccountType } from '../../../enums/contract'
// import { shortenedAddress } from '../../../helpers/stringMutations'
import RecallProductSuccess from '../../../components/RecallProductSuccess'
import getAccounts from '../../../utils/getAccounts'

const Recall: FC = () => {
  // const [accountId, setAccountId] = useState<{ accountId: number }>({
  //   accountId: -1,
  // })
  // const [address, setAddress] = useState<{ accountAddress: string }>({
  //   accountAddress: '',
  // })
  // const [documentName, setDocumentName] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  // const [file, setFile] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [successDocumentContent, setSuccessDocumentContent] = useState(undefined)
  const [recallSuccess, setRecallSuccess] = useState<boolean>(false)
  //const { documentContract, accounts } = useContext(DocumentContractContext)
  //const { uploadDocument } = useContext(DocumentContractAPIContext)
  // const { registeredAccounts, getAllParticipants } = useContext(
  //   ProfileContractAPIContext
  // )

  const { accounts } = useContext(ProfileContractContext)

  const { productContract } = useContext(ProductContractContext)
  const { recallProduct, recallProductResult } = useContext(
    ProductContractAPIContext
  )

  const [inputProductId, setInputProductId] = useState<number>(0)

  // useEffect(() => {
  //   getAllParticipants()
  // }, [])

  // const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target

  //   if (name === 'accountId') {
  //     const splitVal = value.split(':')

  //     const id = splitVal[0]
  //     const sendAddress = splitVal[1]

  //     setAccountId({ ...accountId, ['accountId']: parseInt(id) })
  //     setAddress({ ...address, ['accountAddress']: sendAddress })
  //   }
  // }

  // const handleCaptureFile = (e: any) => {
  //   e.stopPropagation()
  //   e.preventDefault()

  //   const file = e.target.files[0]

  //   setFile(file)
  //   setDocumentName(file.name)
  // }

  const handleRecall = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    const _accounts = await getAccounts(accounts)

    // if (address.accountAddress !== _accounts[0]) {
    //   setError(true)
    //   setErrorMessage('This function can only be executed by the owner.')
    //   return
    // }

    // const document = await uploadDocument(file, payload)

    try {
      // if (document) {
      const recallResp = await productContract?.methods.recallProduct(
        inputProductId
      )
      // .send({ from: _accounts[0] })

      if (recallResp) {
        await recallProduct(inputProductId)

        console.log( recallProductResult );

        if (recallProductResult) {
          // setSuccessDocumentContent(document)
          setRecallSuccess(true)
          setIsLoading(false)
        } else {
          setRecallSuccess(false)
          setIsLoading(false)
          setError(true)
          setErrorMessage('An error occurred.')
        }
      }
      // }
    } catch (error) {
      setRecallSuccess(false)
      setIsLoading(false)
      setError(true)
      setErrorMessage(error.message)
    }
  }

  const backToRecallProduct = () => {
    setRecallSuccess(false)
    // setDocumentName('')
    // setFile('')
  }

  return (
    <div>
      <section className="container has-background-light">
        <div className="columns is-multiline">
          <div className="column is-10 is-offset-2">
            <div className="columns">
              <div className="column left mt-6 is-half">
                {!recallSuccess ? (
                  <>
                    <h1 className="title is-4">Recall Product</h1>
                    {error && (
                      <div className="notification is-danger is-light">
                        {errorMessage}
                      </div>
                    )}

                    <form className="mt-5">
                      <div className="is-fullwidth">
                        <input
                          type="number"
                          min="0"
                          onChange={(e) => {
                            setInputProductId(parseInt(e.target.value))
                          }}
                        ></input>
                        {/* <select
                          defaultValue={'DEFAULT'}
                          name="accountId"
                          id="accountId"
                          onChange={handleChange}
                        >
                          <option value={'DEFAULT'} disabled>
                            Input product id
                          </option>
                          {registeredAccounts?.map(
                            (account: IParticipantDetails, idx: number) => (
                              <option
                                key={idx}
                                value={`${account.accountId}:${account.accountAddress}`}
                              >
                                {`${account.accountName} (${titleCase(
                                  AccountType[account.accountType]
                                )}) [${shortenedAddress(
                                  account.accountAddress
                                )}`}
                                ]
                              </option>
                            )
                          )}
                        </select> */}
                      </div>

                      {/* <div className="file has-name is-primary mt-3 is-fullwidth">
                        <label className="file-label">
                          <input
                            className="file-input"
                            type="file"
                            name="resume"
                            onChange={handleCaptureFile}
                          />
                          <span className="file-cta">
                            <span className="file-icon">
                              <i className="fas fa-upload" />
                            </span>
                            <span className="file-label">Select file…</span>
                          </span>
                          <span className="file-name">{documentName}</span>
                        </label>
                      </div> */}

                      <button
                        className={
                          isLoading
                            ? 'button is-block is-link is-fullwidth mt-3 is-loading'
                            : 'button is-block is-link is-fullwidth mt-3'
                        }
                        disabled={inputProductId === 0}
                        onClick={(e) => handleRecall(e)}
                      >
                        Recall
                      </button>
                      <br />
                    </form>
                  </>
                ) : (
                  <RecallProductSuccess
                    productId={inputProductId}
                    backToRecallProduct={backToRecallProduct}
                  />
                )}
              </div>
              <div className="column right has-text-centered is-half">
                <img
                  src={DocumentImage}
                  alt="registration infographics"
                  className="side-image-document"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Recall
