import Mongoose from '../config/db';
import fs from 'fs';
import path from 'path';
import { Schema, model, connect } from 'mongoose';
import { ProductLocationRequestModel, ProductTrackingModel } from '../models/TraceModel';
import secrets from "../../secrets.json";
var HDWalletProvider = require("@truffle/hdwallet-provider");
const Eth: any = require('web3-eth');

var Product = require("./../../../client/src/contracts/Trace.json");
var addresses = require("./../../../solidity/addresses.json");

const contractAddress = addresses.trace;
console.log("Trace contract address is:", contractAddress);


// Please setup the private keys. The addresses are 5 and 7.
const provider = new HDWalletProvider({
    mnemonic: {
        phrase: secrets.mnemonic
    },
    providerOrUrl: "http://localhost:7545"
});


const eth = new Eth(provider);

const traceContract = new eth.Contract(Product['abi'], contractAddress);

const maxTick = 10

function retrieveProductLocaionByTrackingNumber() {
    // Code for retrieve the product location.
    // We use random location around -33.91759, 151.23054 to simulate the tracking.

    let latitude = Math.floor(-3391759 + 100 * Math.random());
    let longitude = Math.floor(15123054 + 100 * Math.random());

    return [ latitude, longitude ]
}

Mongoose().initialiseMongoConnection().then(function(mongo) {
    function getLogs() {
        ProductTrackingModel.find({ trackerAddress: addresses.oracle }).exec().then(function(row) {
            let promises = row.filter(r => r.tick == null || r.tick <= maxTick).map((r) => {
                return new Promise<void>((resolve, reject) => {
                    r.tick = (r.tick == null ? 0 : r.tick) + 1;
                    r.save().then(() => {

                        traceContract.methods
                            .logLocation(r.productId, Date.now(), ...retrieveProductLocaionByTrackingNumber())
                            .send({ from: addresses.oracle }, function(err: any, result: any) {

                            console.log(err, result);
                            resolve();
                        });
                    });
                });
            });

            return Promise.all(promises);
        }).then(() => {
            return ProductTrackingModel.find({ trackerAddress: addresses.logistic }).exec().then(function(row) {
                let promises = row.filter(r => r.tick == null || r.tick <= maxTick).map((r) => {
                    return new Promise<void>((resolve, reject) => {
                        r.tick = (r.tick == null ? 0 : r.tick) + 1;
                        r.save().then(() => {
                            
                            traceContract.methods
                                .logLocation(r.productId, Date.now(), ...retrieveProductLocaionByTrackingNumber())
                                .send({ from: addresses.logistic }, function(err: any, result: any) {

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
            return ProductLocationRequestModel.find({ isResponded: false }).exec().then(function(row) {
                let promises = row.map((r) => {
                    return new Promise<void>((resolve, reject) => {
                        ProductTrackingModel.findOne({productId: r.productId}).exec().then(function(product){
                            traceContract.methods
                                .logLocation(r.productId, Date.now(), ...retrieveProductLocaionByTrackingNumber())
                                .send({ from: product?.trackerAddress }, function(err: any, result: any) {

                                console.log(err, result);
                                
                            });

                            r.isResponded = true;
                            r.save().then(()=>{
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
    }

    getLogs();
});