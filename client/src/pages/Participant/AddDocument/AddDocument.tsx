import React, { ChangeEvent, FC, useContext } from 'react'
import { DocumentContractContext } from '../../../contexts/DocumentContract'
import DocumentImage from '../../../assets/documents.png'
import './adddocument.css'
import { IAccountTypeDropdown } from '../../../interfaces/contract'

const AddDocument: FC = () => {
  const { documentContract, accounts } = useContext(DocumentContractContext)

  return (
    <div>
      <section className="container has-background-light">
        <div className="columns is-multiline">
          <div className="column is-10 is-offset-2 register">
            <div className="columns">
              <div className="column left mt-6">
                <h1 className="title is-4">Upload Document</h1>
                <form className="mt-5">
                  <div className="field mb-4">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Account Id"
                        name="accountId"
                        id="accountId"
                      />
                    </div>
                  </div>

                  <div className="file is-boxed is-primary has-name mb-5 mt-5">
                    <label className="file-label">
                      <input className="file-input" type="file" name="resume" />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload" />
                        </span>
                        <span className="file-label">Select file…</span>
                      </span>
                      <span className="file-name">
                        Screen Shot 2017-07-29 at 15.54.25.png
                      </span>
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
