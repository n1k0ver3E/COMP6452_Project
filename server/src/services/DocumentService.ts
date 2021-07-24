import fs from 'fs'
import { DocumentRepository } from '../repositories'
import { IDocumentResp, IDocument } from '../interfaces/document'
const ipfsAPI = require('ipfs-api')
const NodeRSA = require('node-rsa')
const path = require("path");

const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })

const documentUpload = async (
  fileContent: File | undefined | Express.Multer.File,
  body: IDocument
) => {
  // @ts-ignore
  const data = new Buffer(fs.readFileSync(fileContent.path))
  const publicKey = fs.readFileSync( path.join(__dirname, "../../keys/public.pem"));

  const key = new NodeRSA( publicKey );

  // write encrypted file
  const encrypted = key.encrypt(data);
  // @ts-ignore
  fs.writeFileSync(fileContent.path + ".encrypted", encrypted, 'utf8');
  // fs.rmSync( fileContent.path );

  try {
    const file = await ipfs.add(encrypted)

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

const getAllDocuments = async () : Promise<IDocument[]> => {
  try {
    const documents = await DocumentRepository.getAllDocuments();
    
    return documents;
  } catch (err) {
    console.log(err)
    return [];
  }
}

const getDocumentsByStatus = async (
  documentStatus: string[] | string
): Promise<IDocument[]> => {
  const documents = await DocumentRepository.getDocumentsByStatus(
    documentStatus
  )

  return documents
}

export default {
  documentUpload,
  getAllDocuments,
  getDocumentsByStatus
}
