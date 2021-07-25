// SPDX-License-Identifier: UNLICENSED

// test
pragma solidity ^0.8.0;

import "./Profile.sol";
import "./Trace.sol";

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

    //For sendProduct function
    // based on Original design
    enum SendProductStatus {
        pending,
        approved,
        rejected
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

    struct Farming {
        uint256 productId;
        uint256 recordBlock;
        uint256 farmingTime;
        uint256 harvestTime;
        string productLocation;
    }

    struct Manufacturing {
        uint256 productId;
        string processType;
        uint256 recordBlock;
        uint256 timestamp;
    }

    // relevant to track.sol,
    // may add new attribute after interact with tracker
    struct Logistics {
        uint256 productId;
        uint256 recordBlock;
        uint256 timeStamp;
    }

    struct Retailing {
        uint256 productId;
        uint256 recordBlock;
        uint256 timeStamp;
    }

    struct Purchasing {
        uint256 productId;
        uint256 recordBlock;
        uint256 timeStamp;
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

    // status updating info
    mapping(uint256 => Farming) public farming_process;
    mapping(uint256 => Manufacturing) public manu_process;
    mapping(uint256 => Logistics) public logi_process;
    mapping(uint256 => Retailing) public retail_process;
    mapping(uint256 => Purchasing) public purchase_process;

    //For sendProduct function
    // based on Original design
    mapping(uint256 => SendProductItem) public sendProducts;
    //mapping(address => Product[]) public receiverProducts;

    event Harvested(
        uint256 productId,
        uint256 recordBlock,
        uint256 farmingTime,
        uint256 harvestTime,
        string productLocation
    );
    event Manufactured(
        uint256 productId,
        string processType,
        uint256 recordBlock,
        uint256 timestamp
    );
    event Distributed(
        uint256 productId,
        uint256 recordBlock,
        uint256 timeStamp
    );
    event Retailed(uint256 productId, uint256 recordBlock, uint256 timeStamp);
    event Purchased(uint256 productId, uint256 recordBlock, uint256 timeStamp);

    address public traceAddress;
    Profile profile;

    constructor(address _traceAddress, address _profileAddress) {
        traceAddress = _traceAddress;
        profile = Profile(_profileAddress);
    }

    function createProduct(string memory name) public returns (uint256) {
        Product memory p;
        p.productName = name;
        numProducts = numProducts + 1;
        p.productId = numProducts;
        p.statusType = status.FARMING;
        products[p.productId] = p;
        return numProducts;
    }

    // Valiadation
    // 1. msg.sender account type = farmer
    // 2. The product status is not RECALLING
    function addProductFarmingInfo(
        uint256 _pid,
        uint256 _farmtime,
        uint256 _harvtime,
        string memory _productLocation
    ) public isFarmerOnly isProductActive(_pid) {
        require(
            _harvtime > _farmtime,
            "Harvest time should be later than farm time."
        );

        Product storage existProduct = products[_pid];
        existProduct.FarmerId = msg.sender;
        existProduct.statusType = status.HARVESTING;

        Farming memory f;
        f.productId = _pid;
        f.farmingTime = _farmtime;
        f.harvestTime = _harvtime;
        f.recordBlock = block.number;
        f.productLocation = _productLocation;
        farming_process[_pid] = f;

        emit Harvested(
            f.productId,
            f.farmingTime,
            f.harvestTime,
            f.recordBlock,
            f.productLocation
        );
    }

    function manuProductInfo(uint256 _pid, string memory _processtype)
        public
        isManufacturerOnly
        isProductActive(_pid)
    {
        Product storage existProduct = products[_pid];
        existProduct.manufacturerId = msg.sender;
        existProduct.statusType = status.MANUFACTURING;

        Manufacturing memory m;
        m.productId = _pid;
        m.processType = _processtype;
        m.recordBlock = block.number;
        m.timestamp = block.timestamp;
        manu_process[_pid] = m;

        emit Manufactured(
            m.productId,
            m.processType,
            m.recordBlock,
            m.timestamp
        );
    }

    // no need now
    function logiProductInfo(address sender, uint256 _pid)
        public
        isLogisticOrOracleOnly
        isProductActive(_pid)
    {
        Product storage existProduct = products[_pid];
        existProduct.distributorId = sender;
        existProduct.statusType = status.SHIPPING;

        Logistics memory l;
        l.productId = _pid;
        l.recordBlock = block.number;
        l.timeStamp = block.timestamp;
        logi_process[_pid] = l;

        emit Distributed(l.productId, l.recordBlock, l.timeStamp);
    }

    function retailProductInfo(uint256 _pid)
        public
        isRetailerOnly
        isProductActive(_pid)
    {
        Product storage existProduct = products[_pid];
        existProduct.retailerId = msg.sender;
        existProduct.statusType = status.RETAILING;

        Retailing memory r;
        r.productId = _pid;
        r.recordBlock = block.number;
        r.timeStamp = block.timestamp;
        retail_process[_pid] = r;

        //update status
        sendProducts[_pid].status = SendProductStatus.approved;

        emit Retailed(r.productId, r.recordBlock, r.timeStamp);
    }

    function purchasingProductInfo(uint256 _pid, uint256 _price)
        public
        isConsumerOnly
        isProductActive(_pid)
    {
        Product storage existProduct = products[_pid];
        existProduct.ConsumerId = msg.sender;
        existProduct.statusType = status.PURCHASING;
        existProduct.productPrice = _price;

        Purchasing memory p;
        p.productId = _pid;
        p.recordBlock = block.number;
        p.timeStamp = block.timestamp;
        purchase_process[_pid] = p;

        emit Purchased(p.productId, p.recordBlock, p.timeStamp);
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
    // Valiadation
    // 1. msg.sender account type = manufacturer
    // 2. receiver = retailerId
    // 3. logistic = logistic or oracle
    function sendProduct(
        uint256 productId,
        address receiver,
        address logistic,
        string memory trackingNumber
    ) public checkDuplicateSendProductItem(productId) isManufacturerOnly {
        require(
            profile.isLogisticOrOracle(logistic) == true,
            "It is not the logistic address."
        );
        require(
            profile.isLogisticOrOracle(receiver) == true,
            "The receiver is not the retailer address."
        );
        SendProductItem memory newSendProductItem = SendProductItem(
            productId,
            msg.sender,
            receiver,
            SendProductStatus.pending,
            true
        );

        sendProducts[productId] = newSendProductItem;
        //get product item for products
        //Product memory productItem = products[productId];
        //receiverProducts[receiver].push(productItem);
        emit SendProduct(
            newSendProductItem.productId,
            newSendProductItem.sender,
            newSendProductItem.receiver,
            uint256(newSendProductItem.status)
        );

        Trace trace = Trace(traceAddress);
        trace.addProduct(productId, logistic, trackingNumber);
    }

    // Move to retailProductInfo
    /* function receiveProduct(uint256 productId, bool receiveStatus) public {
        if (receiveStatus == true) {
            sendProducts[productId].status = SendProductStatus.approved;
        } else {
            sendProducts[productId].status = SendProductStatus.rejected;
        }
    }*/

    //event
    event RecallProduct(uint256 productId);

    //Validation
    // 1. the sender must be Farmer; manufacturer; distributor; retailer; Consumer in this product
    // 2. The product status is not RECALLING
    function recallProduct(uint256 productId)
        public
        isProductActive(productId)
    {
        require(
            msg.sender == products[productId].FarmerId ||
                msg.sender == products[productId].manufacturerId ||
                msg.sender == products[productId].distributorId ||
                msg.sender == products[productId].retailerId ||
                msg.sender == products[productId].ConsumerId,
            "The address is not farmer,manufacturer, distributor, retailer or consumer in this product."
        );

        products[productId].statusType = status.RECALLING;
        emit RecallProduct(productId);
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

    // Validation parts
    modifier checkDuplicateSendProductItem(uint256 _productId) {
        require(
            isExistSendProductItem(_productId) == false,
            "Cannot send the duplicate product id."
        );
        _;
    }

    modifier isFarmerOnly {
        require(
            profile.isFarmer(msg.sender) == true,
            "This function can only be executed by the farmer."
        );
        _;
    }

    modifier isManufacturerOnly {
        require(
            profile.isManufacturer(msg.sender) == true,
            "This function can only be executed by the manufacturer."
        );
        _;
    }

    modifier isLogisticOrOracleOnly {
        require(
            profile.isLogisticOrOracle(msg.sender) == true,
            "This function can only be executed by the logistic or oracle."
        );
        _;
    }

    modifier isRetailerOnly {
        require(
            profile.isRetailer(msg.sender) == true,
            "This function can only be executed by the retailer."
        );
        _;
    }

    modifier isConsumerOnly {
        require(
            profile.isConsumer(msg.sender) == true,
            "This function can only be executed by the consumer."
        );
        _;
    }
    modifier isProductActive(uint256 _productId) {
        require(
            products[_productId].statusType != status.RECALLING,
            "This product has already recalled."
        );
        _;
    }
}
