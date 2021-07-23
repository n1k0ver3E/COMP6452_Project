// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const ProductSC = artifacts.require("ProductSC");
const Trace = artifacts.require("Trace");
const Profile = artifacts.require("Profile");
//const ProductRecall = artifacts.require("ProductRecall");
//const fs = require('fs');


module.exports = async function(deployer, networks, addresses) {
  const regulator = addresses[0];
  const creator = addresses[1];
  const farmer = addresses[2];
  const manufacturer = addresses[3];
  const retailer = addresses[4];
  const logistic = addresses[5];
  const consumer = addresses[6];
  const oracle = addresses[7];

  const profile = await Profile.deployed();
  const product = await ProductSC.deployed();
  const trace = await Trace.deployed();

  await product.sendProduct(1, retailer, logistic, "DummyTrackingNumber", {from: farmer});

  await trace.logLocation(1, 1234, 25, 35, {from: logistic});

  await trace.requestForLocation(1, {from:farmer});

  await trace.logLocation(1, 1568, 26, 35, {from: logistic});
};
