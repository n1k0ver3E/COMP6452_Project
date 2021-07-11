// SPDX-License-Identifier: UNLICENSED

// test
pragma solidity ^0.8.0;

import "./Profile.sol";


contract ProductSC{
    
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
        uint productId;
        uint recordBlock;
        uint farmingTime;
        uint harvestTime;
        
    }
    
    struct Manufacturing {
        uint productId;
        uint recordBlock;
        
    }
    
    struct Product {
        uint productId;
        string productName;
        status statusType;
        uint productPrice;
        address FarmerId;
        address manufacturerId;
        address distributorId;
        address retailerId;
        address ConsumerId;
    }
    
    
    uint public numProducts = 0; 
    mapping (uint => Product) public products;
    mapping (uint => Farming) public farming_process;
    mapping (uint => Manufacturing) public manu_process;
    
    function createProduct(string memory name) public returns (uint){
        Product memory p;
        p.productName = name;
        numProducts = numProducts + 1;
        p.productId = numProducts;
        p.statusType = status.FARMING;
        products[p.productId] = p;
        return numProducts;
    }
    
    function addProductFarmingInfo(uint pid, uint farmtime, uint harvtime) public returns (bool){
        require(harvtime > farmtime, "Harvest time should be later than farm time.");
        
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
    

    // modifier isFarmer() {
    //     require(operator[msg.sender].accountType == Profile.AccountType.Farmer, "This function can only be executed by the farmer."); 
    //     _;
    // } 
    // modifier isApprove() {
    //     require(operator[msg.sender].accountStatus == Profile.AccountStatus.Approved, "This action need to be approved.");
    //     _;
    // }

}