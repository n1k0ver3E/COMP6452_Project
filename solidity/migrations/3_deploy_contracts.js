// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const ProductSC = artifacts.require("ProductSC");
const Trace = artifacts.require("Trace");
const Profile = artifacts.require("Profile");
//const ProductRecall = artifacts.require("ProductRecall");

module.exports = function(deployer, networks, addresses) {
  // deployer.deploy( ProductRecall );
  // deployer.deploy(ProductRecall, Product);
  deployer.deploy(Profile, addresses[0], "Regulator").then(function() {
    return deployer.deploy(Trace, Profile.address).then(function() {
      return deployer.deploy(ProductSC, Trace.address);
    });
  });
};
