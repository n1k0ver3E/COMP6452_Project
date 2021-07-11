// SPDX-License-Identifier: UNLICENSED

// test
pragma solidity ^0.8.0;

import "./Profile.sol";

contract ProductSC {
    enum status {
        FARMING,
        HARVESTING,
        MANUFACTURING,
        SHIPPING,
        RETAILING,
        PURCHASING,
        RECALLING
    }

    struct Farming {
        uint256 productId;
        uint256 recordBlock;
        uint256 farmingTime;
        uint256 harvestTime;
    }

    struct Manufacturing {
        uint256 productId;
        string processType;
        uint256 recordBlock;
    }

    struct Product {
        uint256 productId;
        string productName;
        status statusType;
        uint256 productPrice;
        address FarmerId;
        address manufacturerId;
        address distributorId;
        address retailerId;
        address ConsumerId;
    }

    //For sendProduct function
    // based on Original design
    enum SendProductStatus {
        pending,
        approved,
        rejected
    }
    struct SendProductItem {
        uint256 productId;
        address sender;
        address receiver;
        SendProductStatus status;
        bool isValue; // To check duplicate SendProductItem
    }

    uint256 public numProducts = 0;
    mapping(uint256 => Product) public products;
    mapping(uint256 => Farming) public farming_process;
    mapping(uint256 => Manufacturing) public manu_process;
    //For sendProduct function
    // based on Original design
    mapping(uint256 => SendProductItem) public sendProducts;
    mapping(address => Product[]) public receiverProducts;

    function createProduct(string memory name) public returns (uint256) {
        Product memory p;
        p.productName = name;
        numProducts = numProducts + 1;
        p.productId = numProducts;
        p.statusType = status.FARMING;
        products[p.productId] = p;
        return numProducts;
    }

    function addProductFarmingInfo(
        uint256 pid,
        uint256 farmtime,
        uint256 harvtime
    ) public {
        require(
            harvtime > farmtime,
            "Harvest time should be later than farm time."
        );

        Product storage existProduct = products[pid];
        existProduct.FarmerId = msg.sender;
        existProduct.statusType = status.HARVESTING;

        Farming memory f;
        f.productId = pid;
        f.farmingTime = farmtime;
        f.harvestTime = harvtime;
        f.recordBlock = block.number;
        farming_process[pid] = f;
    }

    function manuProductInfo(uint256 pid, string memory processtype) public {
        Product storage existProduct = products[pid];
        existProduct.manufacturerId = msg.sender;
        existProduct.statusType = status.MANUFACTURING;

        Manufacturing memory m;
        m.productId = pid;
        m.processType = processtype;
        m.recordBlock = block.number;
        manu_process[pid] = m;
    }

    //For sendProduct function
    // based on Original design
    event SendProduct(
        uint256 indexed productId,
        address sender,
        address receiver,
        uint256 status
    );

    // enum SendProductStatus {0=pending,1=approved,2=rejected}
    // to validate the account type must do it off-chain to call profile contract
    function sendProduct(uint256 productId, address receiver)
        public
        checkDuplicateSendProductItem(productId)
    {
        SendProductItem memory newSendProductItem = SendProductItem(
            productId,
            msg.sender,
            receiver,
            SendProductStatus.pending,
            true
        );

        sendProducts[productId] = newSendProductItem;
        //get product item for products
        Product memory productItem = products[productId];
        receiverProducts[receiver].push(productItem);
        emit SendProduct(
            newSendProductItem.productId,
            newSendProductItem.sender,
            newSendProductItem.receiver,
            uint256(newSendProductItem.status)
        );
    }

    function receiveProduct(uint256 productId, bool receiveStatus) public {
        if (receiveStatus == true) {
            sendProducts[productId].status = SendProductStatus.approved;
        } else {
            sendProducts[productId].status = SendProductStatus.rejected;
        }
    }

    // private functions
    // Does account address exist?
    function isExistSendProductItem(uint256 productId)
        private
        view
        returns (bool)
    {
        if (sendProducts[productId].isValue) {
            return true;
        }
        return false;
    }

    modifier checkDuplicateSendProductItem(uint256 _productId) {
        require(
            isExistSendProductItem(_productId) == false,
            "Cannot send the duplicate product id."
        );
        _;
    }

    // modifier isFarmer() {
    //     require(operator[msg.sender].accountType == Profile.AccountType.Farmer, "This function can only be executed by the farmer.");
    //     _;
    // }
    // modifier isApprove() {
    //     require(operator[msg.sender].accountStatus == Profile.AccountStatus.Approved, "This action need to be approved.");
    //     _;
    // }
}
