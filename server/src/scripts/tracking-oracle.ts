import Mongoose from '../config/db';
import fs from 'fs';
import path from 'path';
import { Schema, model, connect } from 'mongoose';
import {ProductLocationRequestModel, ProductTrackingModel} from '../models/TraceModel';
var HDWalletProvider = require("@truffle/hdwallet-provider");
const Eth: any = require('web3-eth');

var Product = require("./../../../client/src/contracts/Trace.json");
var addresses = require("./../../../solidity/addresses.json");

const contractAddress = addresses.trace;
console.log("Trace contract address is:", contractAddress);


// Please setup the private keys. The addresses are 5 and 7.
const provider = new HDWalletProvider([
    "b8abd31cde151ed426c119d02f0b3c79851bbfda64e43daaafbb1c8006e8cb52",
    "09ae8c83fb214d9647e904d2f01508bd5296ec913b1b70a525818a6005d76d8c"
], "http://localhost:9545", 0, 2);

const eth = new Eth(provider);

const traceContract = new eth.Contract(Product['abi'], contractAddress);

Mongoose().initialiseMongoConnection().then(function(mongo) {
    function getLogs() {
        ProductTrackingModel.find({ trackerAddress: addresses.oracle }).exec().then(function(row) {
            let promises = row.filter(r => r.tick == null || r.tick <= 200).map((r) => {
                return new Promise<void>((resolve, reject) => {
                    r.tick = (r.tick == null ? 0 : r.tick) + 1;
                    r.save().then(() => {

                        // Location is a random point around (-33.91759, 151.23054).

                        let latitude = Math.floor(-3391759 + 100 * Math.random());
                        let longitude = Math.floor(15123054 + 100 * Math.random());

                        traceContract.methods.logLocation(r.productId, Date.now(), latitude, longitude).send({ from: addresses.oracle }, function(err: any, result: any) {
                            console.log(err, result);
                            resolve();
                        });
                    });
                });
            });

            return Promise.all(promises);
        }).then(() => {
            return ProductTrackingModel.find({ trackerAddress: addresses.logistic }).exec().then(function(row) {
                let promises = row.filter(r => r.tick == null || r.tick <= 200).map((r) => {
                    return new Promise<void>((resolve, reject) => {
                        r.tick = (r.tick == null ? 0 : r.tick) + 1;
                        r.save().then(() => {
                            let latitude = Math.floor(-3391759 + 100 * Math.random());
                            let longitude = Math.floor(15123054 + 100 * Math.random());

                            traceContract.methods.logLocation(r.productId, Date.now(), latitude, longitude).send({ from: addresses.logistic }, function(err: any, result: any) {
                                console.log(err, result);
                                resolve();
                            });
                        });
                    });
                });

                console.log(promises);

                return Promise.all(promises);
            });
        }).then(() => {
            console.log("timeout")
            setTimeout(getLogs, 1000);
        });


        // traceContract.events.ProductTracking({ fromBlock: fromBlockProductTracking }, function(err: any, ev: any) {
        //     if( ev === null )
        //         return;

        //     let data = {
        //         productId: ev.returnValues.productId,
        //         trackerAddress: ev.returnValues.logisticAccountAddress
        //     };



        //     fromBlockProductTracking = ev.blockNumber;
        // });

        // traceContract.events.ProductLocationRequest({ fromBlock: fromBlockProductLocationRequest }, function(err: any, ev: any) {
        //     if( ev === null )
        //         return;

        //     let data = {
        //         productId: ev.returnValues.productId,
        //         blockNumber: ev.blockNumber,
        //     };

        //     Mongoose().initialiseMongoConnection().then(function(mongo) {
        //         ProductLocationRequestModel.find(data).exec().then(function(row) {
        //             if( row.length == 0 ) {
        //                 let doc = new ProductLocationRequestModel(data);

        //                 return doc.save().then(()=>{
        //                     console.log(arguments);
        //                 });
        //             }
        //         });
        //     });

        //     fromBlockProductLocationRequest = ev.blockNumber;
        // });


    }

    getLogs();
});