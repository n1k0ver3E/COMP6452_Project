import fs from 'fs'
import { DocumentRepository } from '../repositories'
import { IDocument } from '../interfaces/document'
import { IDocumentResp } from '../interfaces/document'
const ipfsAPI = require('ipfs-api')

const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })

const documentUpload = async (
  fileContent: File | undefined | Express.Multer.File,
  body: IDocument
) => {
  let hashContent: string

  // @ts-ignore
  const data = new Buffer(fs.readFileSync(fileContent.path))

  ipfs.add(data, async (err: any, file: any) => {
    if (err) {
      console.log(err)
    }

    const { hash } = file[0]
    hashContent = hash

    const newBody: IDocumentResp = {
      documentName: body.documentName,
      docTypeValue: body.docTypeValue,
      referenceId: body.referenceId,
      hashContent: hashContent,
    }

    await DocumentRepository.documentUpload(newBody)

    return newBody
  })
}

export default {
  documentUpload,
}
