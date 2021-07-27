import Mongoose from '../config/db';
import { ProductTrackingModel, ProductLocationModel, ProductLocationRequestModel } from '../models/TraceModel';

const Eth: any = require('web3-eth');

var Product = require("./../../../client/src/contracts/Trace.json");
var addresses = require("./../../../solidity/addresses.json");

// Read the trace contract's address
const contractAddress = addresses.trace;
console.log("Trace contract address is:", contractAddress);

const eth = new Eth(Eth.givenProvider || 'ws://localhost:7545');

const traceContract = new eth.Contract(Product['abi'], contractAddress);

// Keep track of the last event block number.
let fromBlockProductTracking = 0;
let fromBlockProductLocationRequest = 0;
let fromBlockProductLocation = 0;

// Connect to the mongo DB
Mongoose().initialiseMongoConnection().then(function(mongo) {

    // Wrapping function
    function getLogs() {

        // Get the ProductTracking events from the blockchain.
        traceContract.events.ProductTracking({ fromBlock: fromBlockProductTracking }, function(err: any, ev: any) {
            if (ev === null)
                return;
            
            // Search for the event in the mongoDB
            ProductTrackingModel.find({
                productId: ev.returnValues.productId,
                trackerAddress: ev.returnValues.logisticAccountAddress
            }).exec().then(function(row) {

                // Insert it if the data is not in DB.
                if (row.length == 0) {
                    // The data
                    let doc = new ProductTrackingModel({
                        blockNumber: ev.blockNumber,
                        productId: ev.returnValues.productId,
                        trackerAddress: ev.returnValues.logisticAccountAddress,
                        trackingNumber: ev.returnValues.trackingNumber,
                        tick: 0
                    });

                    // Save the data to the database.
                    return doc.save().then(() => {
                        // Log the saved record to console.
                        console.log(`Reverse Oracle [ProductTracking] blockNumber=${doc.blockNumber} productId=${doc.productId} trackerAddress=${doc.trackerAddress} trackingNumber=${doc.trackingNumber}`);
                    });
                }
            });

            // Update the start block number.
            fromBlockProductTracking = ev.blockNumber;
        });

        // Get the ProductLocationRequest events from the blockchain.
        traceContract.events.ProductLocationRequest({ fromBlock: fromBlockProductLocationRequest }, function(err: any, ev: any) {
            if (ev === null)
                return;

            // Find for the record in the database.
            ProductLocationRequestModel.find({
                productId: ev.returnValues.productId,
                blockNumber: ev.blockNumber,
            }).exec().then(function(row) {

                // Insert it if the data is not in DB.
                if (row.length == 0) {

                    // Data
                    let doc = new ProductLocationRequestModel({
                        productId: ev.returnValues.productId,
                        blockNumber: ev.blockNumber,
                        isResponded: false,
                    });

                    // Save the data to database
                    return doc.save().then(() => {
                        // Output the info to the console.
                        console.log(`Reverse Oracle [ProductLocationRequest] blockNumber=${doc.blockNumber} productId=${doc.productId}`);
                    });
                }
            });

            // Update the start block number.
            fromBlockProductLocationRequest = ev.blockNumber;
        });

        // Get the ProductLocation events from the blockchain.
        traceContract.events.ProductLocation({ fromBlock: fromBlockProductLocation }, function(err: any, ev: any) {
            if (ev === null)
                return;

            // Find for the record in the database.
            ProductLocationModel.find({
                productId: ev.returnValues.productId,
                timestamp: ev.returnValues.timestamp,
            }).exec().then(function(row) {

                // Insert it if the data is not in DB.
                if (row.length == 0) {

                    // Data
                    let doc = new ProductLocationModel({
                        blockNumber: ev.blockNumber,
                        productId: ev.returnValues.productId,
                        timestamp: ev.returnValues.timestamp,
                        latitude: ev.returnValues.latitude,
                        longitude: ev.returnValues.longitude,
                    });

                    // Save the data to the database
                    return doc.save().then(() => {
                        // Output the info to the console.
                        console.log(`Reverse Oracle [ProductLocation] blockNumber=${doc.blockNumber} productId=${doc.productId} location=${doc.latitude/100000},${doc.longitude/100000}`);
                    });
                }
            });

            // Update the start block number.
            fromBlockProductLocation = ev.blockNumber;
        });
    }

    // Call the wrapping fnction.
    getLogs();
});

