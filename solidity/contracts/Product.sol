// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

contract Product {
    uint8 public status;

    event RecallEvent( address indexed _from );

    function recallProduct() public returns (bool success) {
        if( status == 0 ) {
            status = 1;
            emit RecallEvent( msg.sender );
            return true;
        } else {
            return false;
        }
    }
}