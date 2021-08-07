# Foodie Chain

## Client
**Requirements**
- NPM
- Node v16

- Ensure that you have npm or yarn installed.
npm install
or
yarn install

**Run App Locally**

1. Navigate to the client folder

    ```
    $ cd client
    ```

2. Run app (Port 3000)

    ```
    $ npm run start
    or
    yarn start
    ```
## Server
**Requirements**
- NPM
- Node v16

- Ensure that you have npm or yarn installed.
npm install
or
yarn install

**Run App Locally**

1. Navigate to the server folder

    ```
    $ cd server
    ```

2. Run app (Port 5000)

    ```
    $ npm run server
    or
    yarn run server
    ```
3. Config the server/secrets.json. The file secrets.json.example is the template
    ```
    // server/secrets.json
    // For private blockchain
    {
        "mnemonic": "Please insert the oracle/logistic mnemonic",
        "blockchainUrl": "ws://localhost:9545"
    }
    // or
    // For ropsten blockchain
    {
        "mnemonic": "Please insert the oracle/logistic mnemonic",
        "blockchainUrl": "wss://ropsten.infura.io/ws/v3/{projectId}"
    }
    ```

4. Open a new terminal and run the reverse oracle for trace

    ```
    $ npm run trace-oracle
    ```

5. Open another terminal and run the oracle for trace

    ```
    $ npm run oracle
    ```

## Foood Chain Smart Contracts

**Requirements**
- NPM
- Node v16

**Run App Locally**

- Ensure that you have npm installed. On the root directory, run the below command to install the dependencies:

    ```
    $ npm install
    or
    yarn install
    ```

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

**Option 1: Configuration for public blockchain (Ropsten network)**

3. Delete all json files in `contracts` folder under client/src directory before run migrate

4. Navigate to the server folder

    ```
    $ cd solidity
    ```
5. Access truffle console for Ropsten network, On solidity directory run
truffle console --network ropsten

6. compile and migrate on truffle(ropsten)> , run
migrate

7. All contract.json files will be migrated to client/src/contracts

**Option 2: Configuration for private blockchain (Run on localhost)**

3. Delete all json files in `contracts` folder under client/src directory before run migrate

4. Navigate to the server folder

    ```
    $ cd solidity
    ```

5. Compiling contract

Select the contract you want to compile in the `/migrations/2_deploy_contracts.js` file. On the root directory, run: 

`$ npm run compile`

6. Truffle Develop shell and contract migration

Open up the truffle develop shell, run:

`$ npm run develop`

The Truffle Develop will run on port **9454**. At this point you should see the list of **account addresses**, **private keys** and **neumonics**.

Inside, the truffle develop shell, run:

`migrate`

This will migrate the JSON files in the contracts folder within the `client` project.

7. Configure meta-mask to point to `http://127.0.0.1:9545/`. There's an article that provides instructions on how to configure meta-task, which you can find [here](https://medium.com/fullstacked/connect-react-to-ethereum-b117986d56c1).

## User manual for Foodie Web Application
1. Connect to network and choose account via  MetaMask plugin on web browser
2. For regulator, the fixed account is the first account. (account index = 0)
3. For participant, other accounts
4. Please choose the account via MetaMask before performing any operations on Foodie webpage.
5. For Product section
    5.1 Only farmer account can perform the operations in "Farmer" tab.
    5.2 Only manufacturer account can perform the operations in "Manufacturer" tab.
    5.3 Only manufacturer account can perform the operations in "Shipping" tab and Receiver Address can be only retailer.
    5.4 Only retailer account can perform the operations in "Retail" tab.
    5.5 Only consumer account can perform the operations in "Purchase" tab.
6. For tracking section
    6.1 Click "Request location" button will show Block Number,Time,Lat,Long in the below data table on the webpage.
    6.2 CLick "Get location logs" button will record the data to Collection  productlocationrequests in Mongo DB.