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
    mapping(address => Product[]) public receiverProducts;


    event Harvested(uint256 productId);
    event Manufactured(uint256 productId);
    event Distributed(uint256 productId);
    event Retailed(uint256 productId);
    event Purchased(uint256 productId);
  
    address public traceAddress;

    constructor(address _traceAddress) {
        traceAddress = _traceAddress;
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

    function addProductFarmingInfo(
        uint256 _pid,
        uint256 _farmtime,
        uint256 _harvtime
    ) public {
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
        farming_process[_pid] = f;
        
        emit Harvested(_pid);
    }

    function manuProductInfo(
        uint256 _pid, 
        string memory _processtype
    ) public {
        Product storage existProduct = products[_pid];
        existProduct.manufacturerId = msg.sender;
        existProduct.statusType = status.MANUFACTURING;

        Manufacturing memory m;
        m.productId = _pid;
        m.processType = _processtype;
        m.recordBlock = block.number;
        m.timestamp = block.timestamp;
        manu_process[_pid] = m;
        
        
        
        emit Manufactured(_pid);
    }
    
    function logiProductInfo(
        address sender, uint256 _pid
    ) public {
        Product storage existProduct = products[_pid];
        existProduct.distributorId = sender;
        existProduct.statusType = status.SHIPPING;
        
        Logistics memory l;
        l.productId = _pid;
        l.recordBlock = block.number;
        l.timeStamp = block.timestamp;
        logi_process[_pid] = l;
        
        emit Distributed(_pid);
        
    }
    
    function retailProductInfo(
        address sender, uint256 _pid
    ) public {
        Product storage existProduct = products[_pid];
        existProduct.retailerId = sender;
        existProduct.statusType = status.RETAILING;
        
        Retailing memory r;
        r.productId = block.number;
        r.timeStamp = block.timestamp;
        retail_process[_pid] = r;
        
        emit Retailed(_pid);
    }
    
    function purchasingProductInfo(
        address sender,
        uint256 _pid,
        uint256 _price
    ) public {
        Product storage existProduct = products[_pid];
        existProduct.ConsumerId = sender;
        existProduct.statusType = status.PURCHASING;
        existProduct.productPrice = _price;
        
        Purchasing memory p;
        p.productId = block.number;
        p.timeStamp = block.timestamp;
        purchase_process[_pid] = p;
        
        emit Purchased(_pid);
        
        
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
    function sendProduct(uint256 productId, address receiver, address logistic, string memory trackingNumber )
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

        Trace trace = Trace(traceAddress);
        trace.addProduct(productId, logistic, trackingNumber);
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
