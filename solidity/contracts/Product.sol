// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./Profile.sol";


contract Product{
    
    enum ProcessType {Farming, Manufacturing, Shipping, Retailing, Purchasing, Recalling}
    
    struct Farming {
        uint recordBlock;
        ProcessType productType;
        uint farmingTime;
        uint harvestTime;
    }
    
    // Copy from Profile
    struct Account{
        address  accountAddress;
        AccountType accountType;
        AccountStatus  accountStatus;
        bool isValue; // To check duplicate account
    }
    
    mapping (address => Account) public operator;
    
    
    //Creates a new lunch venue contract
    constructor () {
        manager = msg.sender; //Set contract creator as manager 
    }
    
    function addProduct() public isFarmer isApprove returns (uint){
        
    }
    
    
    modifier isFarmer() {
        require(operator[msg.sender].accountType == Profile.AccountType.Farmer, "This function can only be executed by the farmer."); 
        _;
    } 
    modifier isApprove() {
        require(operator[msg.sender].accountStatus == Profile.AccountStatus.Approved, "This action need to be approved.");
        _;
    }
}