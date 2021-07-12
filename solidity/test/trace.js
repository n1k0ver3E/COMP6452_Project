const truffleAssert = require('truffle-assertions');

const Trace = artifacts.require('Trace');
const Profile = artifacts.require('Profile');
const ProductSC = artifacts.require('ProductSC');

contract('Trace', (accounts) => {
    const regulator = accounts[0];
    const creator = accounts[1];
    const farmer = accounts[2];
    const manufacturer = accounts[3];
    const retailer = accounts[4];
    const logistic = accounts[5];
    const consumer = accounts[6];
    const oracle = accounts[7];
    let profile;
    let product;
    let trace;
    let productAId;


    beforeEach(async () => {
        profile = await Profile.new(regulator, "Regulator", { from: creator });
        trace = await Trace.new(profile.address, { from: creator });
        product = await ProductSC.new(trace.address, { from: creator });

        await profile.registerAccount(farmer, "Farmer", 1, { from: farmer });
        await profile.approveAccount(farmer, 1, { from: regulator });

        await profile.registerAccount(manufacturer, "Manufacturer", 2, { from: manufacturer });
        await profile.approveAccount(manufacturer, 1, { from: regulator });

        await profile.registerAccount(retailer, "Retailer", 3, { from: retailer });
        await profile.approveAccount(retailer, 1, { from: regulator });

        await profile.registerAccount(consumer, "Consumer", 4, { from: consumer });
        await profile.approveAccount(consumer, 1, { from: regulator });

        await profile.registerAccount(logistic, "Logistic", 5, { from: logistic });
        await profile.approveAccount(logistic, 1, { from: regulator });

        await profile.registerAccount(oracle, "Oracle", 6, { from: oracle });
        await profile.approveAccount(oracle, 1, { from: regulator });


        productAId = await product.createProduct.call("Product A", { from: farmer });
        await product.createProduct("Product A", { from: farmer });

        await product.addProductFarmingInfo(productAId.toNumber(), 1, 2);
    });

    // it('should has 0 as default status', async () => {
    //     var sendResult = await product.sendProduct( productAId.toNumber(), retailer, logistic, "test" );

    //     truffleAssert.prettyPrintEmittedEvents( sendResult );
    // });

    it('should accept log from logistic', async () => {
        var sendResult = await product.sendProduct(productAId.toNumber(), retailer, logistic, "test", { from: farmer });

        //console.log( sendResult );

        // truffleAssert.prettyPrintEmittedEvents( sendResult );

        var logResult = await trace.logLocation(productAId.toNumber(), 9, -1, -2, { from: logistic });

        //truffleAssert.prettyPrintEmittedEvents( logResult );
        truffleAssert.eventEmitted(logResult, "ProductLocation", function(ev) {
            return ev.productId == productAId.toNumber() &&
                ev.timestamp == 9 &&
                ev.latitude == -1 &&
                ev.longitude == -2;
        });
    });

    it('should accept log from oracle', async () => {
        var sendResult = await product.sendProduct(productAId.toNumber(), retailer, oracle, "test", { from: farmer });

        //console.log( sendResult );

        // truffleAssert.prettyPrintEmittedEvents( sendResult );

        var logResult = await trace.logLocation(productAId.toNumber(), 10, 1, 2, { from: oracle });

        // truffleAssert.prettyPrintEmittedEvents( logResult );

        truffleAssert.eventEmitted(logResult, "ProductLocation", function(ev) {
            return ev.productId == productAId.toNumber() &&
                ev.timestamp == 10 &&
                ev.latitude == 1 &&
                ev.longitude == 2;
        });
    });

    it('should not accept log from manufacturer', async () => {
        try {
            var sendResult = await product.sendProduct(productAId.toNumber(), retailer, manufacturer, "test3", { from: farmer });

            var logResult = await trace.logLocation(productAId.toNumber(), 11, 11, 12, { from: manufacturer });

            // truffleAssert.prettyPrintEmittedEvents( logResult );

            truffleAssert.eventNotEmitted(logResult, "ProductLocation", function(ev) {
                return ev.productId == productAId.toNumber() &&
                    ev.timestamp == 11 &&
                    ev.latitude == 11 &&
                    ev.longitude == 12;
            });
        } catch (error) {
            assert(error, "Expect an error");
            assert(error.message.includes("logisticAccountAddress must be a logistic or an oracle"), "error message check");
        }


    });


    // it('should emit an event when recall', async () => {
    //     let emit = await product.emitEvent({ from: creator });

    //     //truffleAssert.prettyPrintEmittedEvents(emit);

    //     truffleAssert.eventEmitted(emit, 'RecallEvent', (ev) => {
    //         // console.log(ev);

    //         assert.equal(ev.number, 2, 'Number should be 2');

    //         // Must return true.
    //         return true;
    //     });
    // });

    // it('should set status to 2 when recall the product', async () => {
    //     let recall = await product.recallProduct({ from: creator });

    //     truffleAssert.eventEmitted(recall, 'RecallEvent', (ev) => {
    //         // console.log(ev);

    //         assert.equal(ev.number, 1, 'Number should be 1');

    //         // Must return true.
    //         return true;
    //     });

    //     truffleAssert.prettyPrintEmittedEvents(recall);

    //     // truffleAssert.eventEmitted(productRecallContract, 'RecallEvent', (ev) => {
    //     //     console.log(ev);
    //     //     console.log(ev.product, product.address, ev.product == product.address);


    //     //     return ev.product == product.address;
    //     // });

    //     let result = await product.status();

    //     // console.log( result );

    //     assert.equal(result.toNumber(), 1, 'Status should be 1 after the recall');
    // });

    // //   it('should put 10000 MetaCoin in the first account', async () => {
    // //     const metaCoinInstance = await MetaCoin.deployed();
    // //     const balance = await metaCoinInstance.getBalance.call(accounts[0]);

    // //     assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    // //   });
    // //   it('should call a function that depends on a linked library', async () => {
    // //     const metaCoinInstance = await MetaCoin.deployed();
    // //     const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
    // //     const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

    // //     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
    // //   });
    // //   it('should send coin correctly', async () => {
    // //     const metaCoinInstance = await MetaCoin.deployed();

    // //     // Setup 2 accounts.
    // //     const accountOne = accounts[0];
    // //     const accountTwo = accounts[1];

    // //     // Get initial balances of first and second account.
    // //     const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    // //     const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

    // //     // Make transaction from first account to second.
    // //     const amount = 10;
    // //     await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // //     // Get balances of first and second account after the transactions.
    // //     const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    // //     const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

    // //     assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    // //     assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
    // //   });
});
