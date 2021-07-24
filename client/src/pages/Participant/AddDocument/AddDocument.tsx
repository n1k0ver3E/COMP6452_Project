import React, { FC, useContext, useEffect } from 'react'
import { DocumentContractContext } from '../../../contexts/DocumentContract'
import { ProfileContractAPIContext } from '../../../contexts/ProfileContractAPI'
import DocumentImage from '../../../assets/documents.png'
import './adddocument.css'
import { IParticipantDetails } from '../../../interfaces/contract'
import { titleCase } from '../../../helpers'
import { AccountType } from '../../../enums/contract'
import { shortenedAddress } from '../../../helpers/stringMutations'

const AddDocument: FC = () => {
  const { documentContract, accounts } = useContext(DocumentContractContext)
  const { registeredAccounts, getAllParticipants } = useContext(
    ProfileContractAPIContext
  )

  useEffect(() => {
    getAllParticipants()
  }, [])

  return (
    <div>
      <section className="container has-background-light">
        <div className="columns is-multiline">
          <div className="column is-10 is-offset-2 register">
            <div className="columns">
              <div className="column left mt-6">
                <h1 className="title is-4">Upload Document</h1>
                <form className="mt-5">
                  <div className="select is-fullwidth">
                    <select
                      defaultValue={'DEFAULT'}
                      name="registeredAddress"
                      id="registeredAddress"
                    >
                      <option value={'DEFAULT'} disabled>
                        Select Account Address
                      </option>
                      {registeredAccounts?.map(
                        (account: IParticipantDetails, idx: number) => (
                          <option key={idx} value={account.accountId}>
                            {`${account.accountName} (${titleCase(
                              AccountType[account.accountType]
                            )}) [${shortenedAddress(account.accountAddress)}`}
                            ]
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="file has-name is-primary mt-3 is-fullwidth">
                    <label className="file-label">
                      <input className="file-input" type="file" name="resume" />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload" />
                        </span>
                        <span className="file-label">Select file…</span>
                      </span>
                      <span className="file-name">file_name</span>
                    </label>
                  </div>

                  <button className="button is-block is-link is-fullwidth mt-3">
                    Upload
                  </button>
                  <br />
                </form>
              </div>
              <div className="column right has-text-centered">
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

export default AddDocument
