const truffleAssert = require('truffle-assertions');

const Product = artifacts.require('Product');

contract('Product', (accounts) => {
    let product;
    const creator = accounts[0];

    beforeEach(async () => {
        product = await Product.new({ from: creator });
    });

    // afterEach(async()=>{
    //     await product.kill({from: creator});
    // });

    it('should has 0 as default status', async () => {
        const productContract = await Product.deployed();
        const status = await productContract.status();

        assert.equal(status.toNumber(), 0, "status wasn't 0 in the init contract");
    });

    it('should emit an event when recall', async () => {
        let emit = await product.emitEvent({ from: creator });

        //truffleAssert.prettyPrintEmittedEvents(emit);

        truffleAssert.eventEmitted(emit, 'RecallEvent', (ev) => {
            // console.log(ev);

            assert.equal(ev.number, 2, 'Number should be 2');

            // Must return true.
            return true;
        });
    });

    it('should set status to 2 when recall the product', async () => {
        let recall = await product.recallProduct({ from: creator });

        truffleAssert.eventEmitted(recall, 'RecallEvent', (ev) => {
            // console.log(ev);

            assert.equal(ev.number, 1, 'Number should be 1');

            // Must return true.
            return true;
        });

        let result = await product.status();

        // console.log( result );

        assert.equal(result.toNumber(), 1, 'Status should be 1 after the recall');
    });

    //   it('should put 10000 MetaCoin in the first account', async () => {
    //     const metaCoinInstance = await MetaCoin.deployed();
    //     const balance = await metaCoinInstance.getBalance.call(accounts[0]);

    //     assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    //   });
    //   it('should call a function that depends on a linked library', async () => {
    //     const metaCoinInstance = await MetaCoin.deployed();
    //     const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
    //     const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

    //     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
    //   });
    //   it('should send coin correctly', async () => {
    //     const metaCoinInstance = await MetaCoin.deployed();

    //     // Setup 2 accounts.
    //     const accountOne = accounts[0];
    //     const accountTwo = accounts[1];

    //     // Get initial balances of first and second account.
    //     const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    //     const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

    //     // Make transaction from first account to second.
    //     const amount = 10;
    //     await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    //     // Get balances of first and second account after the transactions.
    //     const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    //     const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

    //     assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    //     assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
    //   });
});
