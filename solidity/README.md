# Foood Chain Smart Contracts

**Requirements**
- NPM
- Node v16

**Run App Locally**

Ensure that you have npm installed. On the root directory, run the below command to install the dependencies:

`$ npm install`
or
yarn install

1. create secrets.json
- can find mnemonic from MetaMask settings/security&privacy
- can find projectIf from MetaMask settings/Networks/
if you use Ropsten Network, you can find your project ID from New RPC URL https://ropsten.infura.io/v3/{projectId}
{
    "mnemonic": "cat dog ...",
    "projectId": "{projectId}"
}

2. truffle-config
You can add more networks in networks: {...}
 networks: {
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${projectId}`)
      },
      network_id: 3
    },
  },

**Configuration for public blockchain (Ropsten network)**
3. Delete all json files in `contracts` folder under client/src directory before run migrate
4. Access truffle console for Ropsten network, On solidity directory run
truffle console --network ropsten

5. compile and migrate on truffle(ropsten)> , run
migrate

6. All contract.json files will be migrated to client/src/contracts

**Configuration for private blockchain (Run on localhost)**

3. Compiling contract

Select the contract you want to compile in the `/migrations/2_deploy_contracts.js` file. On the root directory, run: 

`$ npm run compile`

4. Truffle Develop shell and contract migration

Open up the truffle develop shell, run:

`$ npm run develop`

The Truffle Develop will run on port **9454**. At this point you should see the list of **account addresses**, **private keys** and **neumonics**.

Inside, the truffle develop shell, run:

`migrate`

This will migrate the JSON files in the contracts folder within the `client` project.

5. Configure meta-mask to point to `http://127.0.0.1:9545/`. There's an article that provides instructions on how to configure meta-task, which you can find [here](https://medium.com/fullstacked/connect-react-to-ethereum-b117986d56c1).
