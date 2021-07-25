import Mongoose from '../config/db';
import fs from 'fs';
import path from 'path';
import { Schema, model, connect } from 'mongoose';
import {ProductTrackingModel, ProductLocationModel, ProductLocationRequestModel} from '../models/TraceModel';

const Eth: any = require('web3-eth');

// const fs = require('fs');
// const path = require('path');
// var Eth = require('web3-eth');
var Product = require("./../../../client/src/contracts/Trace.json");
var addresses = require("./../../../solidity/addresses.json");

const contractAddress = addresses.trace;

console.log("Trace contract address is:", contractAddress);

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
const eth = new Eth(Eth.givenProvider || 'ws://localhost:9545');

const traceContract = new eth.Contract(Product['abi'], contractAddress);



let fromBlockProductTracking = 0;
let fromBlockProductLocationRequest = 0;
let fromBlockProductLocation = 0;

Mongoose().initialiseMongoConnection().then(function(mongo) {
    function getLogs() {
        traceContract.events.ProductTracking({ fromBlock: fromBlockProductTracking }, function(err: any, ev: any) {
            if (ev === null)
                return;

            ProductTrackingModel.find({
                productId: ev.returnValues.productId,
                trackerAddress: ev.returnValues.logisticAccountAddress
            }).exec().then(function(row) {
                if (row.length == 0) {

                    let doc = new ProductTrackingModel({
                        blockNumber: ev.blockNumber,
                        productId: ev.returnValues.productId,
                        trackerAddress: ev.returnValues.logisticAccountAddress,
                        tick: 0
                    });

                    return doc.save().then(() => {
                        console.log(arguments);
                    });
                }
            });

            fromBlockProductTracking = ev.blockNumber;
        });

        traceContract.events.ProductLocationRequest({ fromBlock: fromBlockProductLocationRequest }, function(err: any, ev: any) {
            if (ev === null)
                return;

            ProductLocationRequestModel.find({
                productId: ev.returnValues.productId,
                blockNumber: ev.blockNumber,
            }).exec().then(function(row) {
                if (row.length == 0) {
                    let doc = new ProductLocationRequestModel({
                        productId: ev.returnValues.productId,
                        blockNumber: ev.blockNumber,
                        isResponded: false,
                    });

                    return doc.save().then(() => {
                        console.log(arguments);
                    });
                }
            });

            fromBlockProductLocationRequest = ev.blockNumber;
        });

        traceContract.events.ProductLocation({ fromBlock: fromBlockProductLocation }, function(err: any, ev: any) {
            if (ev === null)
                return;

            ProductLocationModel.find({
                productId: ev.returnValues.productId,
                timestamp: ev.returnValues.timestamp,
            }).exec().then(function(row) {
                if (row.length == 0) {
                    let doc = new ProductLocationModel({
                        blockNumber: ev.blockNumber,
                        productId: ev.returnValues.productId,
                        timestamp: ev.returnValues.timestamp,
                        latitude: ev.returnValues.latitude,
                        longitude: ev.returnValues.longitude,
                    });

                    return doc.save().then(() => {
                        console.log(arguments);
                    });
                }
            });


            fromBlockProductLocation = ev.blockNumber;
        });
    }
    getLogs();
});

