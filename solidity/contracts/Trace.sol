// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

import "./Profile.sol";

contract Trace {
    event ProductLocation(uint blockNumber, uint productId, uint timestamp, uint latitude, uint longitude);
    event ProductTracking(uint blockNumber, address indexed logisticAccountAddress, uint productId );

    struct ProductTrack {
        uint timestamp;
        uint latitude;
        uint longitude;
        address logisticAccountAddress;
        bytes trackNumber;
    }

    address public profileAddress;
    mapping (uint => ProductTrack) _tracks;

    function tracks(uint productId) public returns(string memory trackNumber, uint latitude, uint longtitude)  {
        ProductTrack memory t = _tracks[ productId ];

        if( t.trackNumber.length == 0 ) {
            return ("", 0, 0);
        } else {
            return ( string(t.trackNumber), t.latitude, t.longitude );
        }
    }

    constructor(address _profileAddress) {
        profileAddress = _profileAddress;
    }

    function addProduct(uint productId, address logisticAccountAddress, string memory trackNumber) public {
        Profile pf = Profile( profileAddress );
        bool isLogistic = pf.isLogisticOrOracle(logisticAccountAddress);

        require( isLogistic, "logisticAccountAddress must be logistic" );

        ProductTrack memory t = _tracks[ productId ];
        
        require( t.trackNumber.length == 0, "Product already added" );

        t.logisticAccountAddress = logisticAccountAddress;
        t.trackNumber = bytes(trackNumber);
        t.latitude = 0;
        t.longitude = 0;

        _tracks[ productId  ] = t;
    }

    function logLocation(uint productId, uint timestamp, uint latitude, uint longitude)
    public
    returns(bool success) {
        ProductTrack storage t = _tracks[ productId ];

        if( t.trackNumber.length == 0 ){
            return false;
        }

        require( msg.sender == t.logisticAccountAddress, "Incorrect logistic account" );

        if ( t.timestamp >= timestamp ) {
            return false;
        }

        t.timestamp = timestamp;
        t.latitude = latitude;
        t.longitude = longitude;

        emit ProductLocation(block.number, productId, timestamp, latitude, longitude);

        return true;
    }
}