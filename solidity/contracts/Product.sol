// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./Profile.sol";


contract Product{
    
    enum ProcessType {FARMING, MANUFACTURING, SHIPPING, RETAILING, PURCHASING, RECALLING}
    
    struct Farming {
        uint productId;
        uint recordBlock;
        uint farmingTime;
        uint harvestTime;
        ProcessType pType;
    }
    
    struct Manufacturing {
        uint productId;
        uint recordBlock;
        uint processingType;
        ProcessType pType;
    }
    
    struct Product {
        uint productId;
        string productName;
        // ProcessType processType;
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
        products[p.productId] = p;
        return numProducts;
    }
    
    function addProductFarmingInfo(uint pid, uint farmtime, uint harvtime) public returns (bool){
        require(harvtime > farmtime, "Harvest time should be later than farm time.");
        
        Farming memory f;
        f.productId = pid;
        f.farmingTime = farmtime;
        f.harvestTime = harvtime;
        f.recordBlock = block.number;
        f.pType = ProcessType.FARMING;
        farming_process[pid] = f;
        return true;
        
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