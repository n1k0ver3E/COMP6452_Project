// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const ProductSC = artifacts.require("ProductSC");
const Trace = artifacts.require("Trace");
const Profile = artifacts.require("Profile");
//const ProductRecall = artifacts.require("ProductRecall");
const fs = require('fs');


module.exports = async function(deployer, networks, addresses) {
  // deployer.deploy( ProductRecall );
  // deployer.deploy(ProductRecall, Product);
  await deployer.deploy(Profile, addresses[0], "Regulator");
  await deployer.deploy(Trace, Profile.address)
  await deployer.deploy(ProductSC, Trace.address);

  fs.writeFileSync('oracle-address.txt', Trace.address);
};
