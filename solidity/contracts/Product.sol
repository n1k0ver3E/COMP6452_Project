// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

contract Product {
    uint8 public status = 0;

    event RecallEvent( address indexed _from, uint8 number );

    function recallProduct() public returns (bool success) {
        if( status == 0 ) {
            status = 1;
            emit RecallEvent( msg.sender, 1 );
            return true;
        } else {
            return false;
        }
    }

    function emitEvent() public returns (uint8 result) {
        status = 2;
        emit RecallEvent( msg.sender, 2 );
        return 8;
    }

    
}