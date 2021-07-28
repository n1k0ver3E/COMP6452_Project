# Foodie Chain

## Client
**Requirements**
- NPM
- Node v16

**Run App Locally**

1. Navigate to the client folder

    ```
    $ cd client
    ```

2. Run app (Port 3000)

    ```
    $ npm run start
    ```


## Server
**Requirements**
- NPM
- Node v16

**Run App Locally**

1. Navigate to the server folder

    ```
    $ cd server
    ```

2. Run app (Port 5000)

    ```
    $ npm run server
    ```
3. Config the server/secrets.json. The file secrets.json.example is the template
    ```
    // server/secrets.json
    {
        "mnemonic": "Please insert the oracle/logistic mnemonic",
        "blockchainUrl": "ws://localhost:9545"
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

