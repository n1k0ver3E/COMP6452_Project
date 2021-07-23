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
  // @ts-ignore
  const data = new Buffer(fs.readFileSync(fileContent.path))

  try {
    const file = await ipfs.add(data)

    const newBody: IDocumentResp = {
      documentName: body.documentName,
      docTypeValue: body.docTypeValue,
      referenceId: body.referenceId,
      hashContent: file[0].hash,
    }

    const document = await DocumentRepository.documentUpload(newBody)

    return {
      id: document.id,
      documentName: document.documentName,
      docTypeValue: document.docTypeValue,
      referenceId: document.referenceId,
      hashContent: document.hashContent,
    }
  } catch (err) {
    console.log(err)
  }
}

export default {
  documentUpload,
}
