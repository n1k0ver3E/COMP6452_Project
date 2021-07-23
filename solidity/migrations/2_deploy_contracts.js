// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const Profile = artifacts.require("Profile");
const Document = artifacts.require("Document");

module.exports = function (deployer, network, accounts) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  //deployer.deploy(Product);

  // NOTE: Please ensure to enter 2 parameters when deploying Profile contract
  //deployer.deploy(Profile, <address>, <regulator_name>);
  // const profile = deployer.deploy(Profile, accounts[0], "regulator");
  // deployer.deploy(Document, profile.address);
  deployer.deploy(Profile, accounts[0], "regulator").then((profile) => {
    deployer.deploy(Document, profile.address);
  });

  //deployer.deploy(Product)
};
