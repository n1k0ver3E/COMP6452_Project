// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const Product = artifacts.require("Product");
const ProductRecall = artifacts.require("ProductRecall");

module.exports = function(deployer) {
  deployer.deploy( ProductRecall );
  deployer.deploy(ProductRecall, Product);
  deployer.deploy(Product);
};
