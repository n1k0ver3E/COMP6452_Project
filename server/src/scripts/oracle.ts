import Mongoose from './../config/db';
import fs from 'fs';
import path from 'path';
import { Schema, model, connect } from 'mongoose';

const Eth: any = require('web3-eth');

// const fs = require('fs');
// const path = require('path');
// var Eth = require('web3-eth');
var Product = require("./../../../client/src/contracts/Trace.json");

const PORT = process.env.PORT || 5000;

const addressFilePath = path.join(__dirname, "./../../../solidity/oracle-address.txt");
const contractAddress = fs.readFileSync(addressFilePath, 'utf8');

console.log("Trace contract address is:", contractAddress);

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
const eth = new Eth(Eth.givenProvider || 'ws://localhost:9545');

const traceContract = new eth.Contract(Product['abi'], contractAddress);

let fromBlock = 0;

interface ProductTracking {
    trackerAddress: string;
    productId: Number;
}

const productTrackingSchema = new Schema<ProductTracking>({
    trackerAddress: { type: String, required: true },
    productId: { type: Number, required: true },
});

const ProductTrackingModel = model<ProductTracking>('ProductTracking', productTrackingSchema);

function getLogs() {
    traceContract.events.ProductTracking({ fromBlock: fromBlock }, function(err: any, ev: any) {
        let data = {
            productId: ev.returnValues.productId,
            trackerAddress: ev.returnValues.logisticAccountAddress
        };

        Mongoose().initialiseMongoConnection().then(function(mongo) {
            ProductTrackingModel.find(data).exec().then(function(row) {
                if( row.length == 0 ) {
                    let doc = new ProductTrackingModel(data);

                    return doc.save().then(()=>{
                        console.log(arguments);
                    });
                }
            });
        });
    });
}

getLogs();