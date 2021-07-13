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

  var productBId = await product.createProduct.call("Product B", { from: farmer });

  await product.addProductFarmingInfo(productBId, 2, 3);

  await product.sendProduct(2, retailer, oracle, "DummyTrackingNumber2", {from: farmer});

  await trace.logLocation(2, 1234, 35, 35, {from: oracle});

  await trace.requestForLocation(2, {from:farmer});

  await trace.logLocation(2, 1568, 36, 35, {from: oracle});
};
