// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

import "./Profile.sol";

contract Trace {
    event ProductLocation(uint blockNumber, uint productId, uint timestamp, int latitude, int longitude);
    event ProductTracking(uint blockNumber, address indexed logisticAccountAddress, uint productId );

    struct ProductTrack {
        uint timestamp;
        int latitude;
        int longitude;
        address logisticAccountAddress;
        bytes trackingNumber;
    }

    address public profileAddress;
    mapping (uint => ProductTrack) _tracks;

    function tracks(uint productId)
    public
    view
    returns(string memory trackingNumber, int latitude, int longtitude)  {
        ProductTrack memory t = _tracks[ productId ];

        if( t.trackingNumber.length == 0 ) {
            return ("", 0, 0);
        } else {
            return ( string(t.trackingNumber), t.latitude, t.longitude );
        }
    }

    constructor(address _profileAddress) {
        profileAddress = _profileAddress;
    }

    function addProduct(uint productId, address logisticAccountAddress, string memory trackingNumber)
    public {
        Profile pf = Profile( profileAddress );
        bool isLogistic = pf.isLogisticOrOracle(logisticAccountAddress);

        require( isLogistic, "logisticAccountAddress must be a logistic or an oracle" );

        ProductTrack memory t = _tracks[ productId ];
        
        require( t.trackingNumber.length == 0, "Product already added" );

        t.logisticAccountAddress = logisticAccountAddress;
        t.trackingNumber = bytes(trackingNumber);
        t.latitude = 0;
        t.longitude = 0;

        _tracks[ productId  ] = t;

        emit ProductTracking(block.number, logisticAccountAddress, productId);
    }

    function logLocation(uint productId, uint timestamp, int latitude, int longitude)
    public
    returns(bool success) {
        ProductTrack storage t = _tracks[ productId ];

        if( t.trackingNumber.length == 0 ){
            require(false, "no tracking");
            return false;
        }

        require( msg.sender == t.logisticAccountAddress, "Incorrect logistic account" );

        if ( t.timestamp >= timestamp ) {
            require(false, "invalid timestamp");
            return false;
        }

        t.timestamp = timestamp;
        t.latitude = latitude;
        t.longitude = longitude;

        emit ProductLocation(block.number, productId, timestamp, latitude, longitude);

        return true;
    }
}