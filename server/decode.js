const fs = require('fs')
const ipfsAPI = require('ipfs-api')
const NodeRSA = require('node-rsa')

// @ts-ignore
const data = new Buffer(fs.readFileSync("fsactc9y.dms"))
const privateKey = fs.readFileSync("keys/private.pem");

const key = new NodeRSA( privateKey );

// write encrypted file
const decrypted = key.decrypt(data);
// @ts-ignore
fs.writeFileSync("uploads/25cc8da10425373bde2716a55f2090e9" + ".decrypted", decrypted, 'utf8');
// fs.rmSync( fileContent.path );
