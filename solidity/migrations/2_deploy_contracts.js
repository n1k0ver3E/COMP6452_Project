// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const Product = artifacts.require("Product");
const Profile = artifacts.require("Profile")

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  deployer.deploy(Product);

  // NOTE: Please ensure to enter 2 parameters when deploying Profile contract
  // deployer.deploy(Profile, <address>, <regulator_name>);
  deployer.deploy(Product)
};
