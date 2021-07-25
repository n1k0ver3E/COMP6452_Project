# Foood Chain Smart Contracts

**Requirements**
- NPM
- Node v16

**Run App Locally**

Ensure that you have npm installed. On the root directory, run the below command to install the dependencies:

`$ npm install`

1. Compiling contract

Select the contract you want to compile in the `/migrations/2_deploy_contracts.js` file. On the root directory, run: 

`$ npm run compile`

2. Truffle Develop shell and contract migration

Open up the truffle develop shell, run:

`$ npm run develop`

The Truffle Develop will run on port **9454**. At this point you should see the list of **account addresses**, **private keys** and **neumonics**.

Inside, the truffle develop shell, run:

`migrate`

This will migrate the JSON files in the contracts folder within the `client` project.

3. Configure meta-mask to point to `http://127.0.0.1:9545/`. There's an article that provides instructions on how to configure meta-task, which you can find [here](https://medium.com/fullstacked/connect-react-to-ethereum-b117986d56c1).
