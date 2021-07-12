// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const Profile = artifacts.require("Profile")

module.exports = function(deployer, network, accounts) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  //deployer.deploy(Product);

  // NOTE: Please ensure to enter 2 parameters when deploying Profile contract
  //deployer.deploy(Profile, <address>, <regulator_name>);
  deployer.deploy(Profile, accounts[0], 'regulator');
  //deployer.deploy(Product)
};
