// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

import "./Profile.sol";

contract Trace {
    event ProductTracking(uint blockNumber, address indexed logisticAccountAddress, uint productId );
    event ProductLocation(uint blockNumber, uint indexed productId, uint indexed timestamp, int latitude, int longitude);
    event ProductLocationRequest(uint indexed blockNumber, uint indexed productId);

    struct ProductTrack {
        uint timestamp;
        int latitude;
        int longitude;
        address logisticAccountAddress;
        bytes trackingNumber;
        uint nextRequestForLocationBlockNumber;
        bool isRequestingForLocation;
    }

    address public profileAddress;
    mapping (uint => ProductTrack) _tracks;

    function tracks(uint productId)
    public
    view
    returns(string memory trackingNumber, int latitude, int longitude, bool isRequestingForLocation)  {
        ProductTrack memory t = _tracks[ productId ];

        if( t.trackingNumber.length == 0 ) {
            return ("", 0, 0, false);
        } else {
            return ( string(t.trackingNumber), t.latitude, t.longitude, t.isRequestingForLocation );
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

        if( t.trackingNumber.length == 0 ) {
            return false;
        }

        require( msg.sender == t.logisticAccountAddress, "Incorrect logistic account" );

        if( t.isRequestingForLocation ) {
            if ( t.timestamp < timestamp ) {
                saveProductLocation(t, productId, timestamp, latitude, longitude);
            }

            t.isRequestingForLocation = false;

            // TODO:: Insert callback code here

            return true;
        } else {
            if ( t.timestamp >= timestamp ) {
                return false;
            }

            saveProductLocation(t, productId, timestamp, latitude, longitude);

            // TODO:: Insert callback code here

            return true;
        }
    }

    function requestForLocation(uint productId) public returns (bool) {
        ProductTrack storage t = _tracks[ productId ];

        if( t.trackingNumber.length == 0 ) {
            return false;
        }

        if( t.isRequestingForLocation ) {
            return false;
        }

        // If the next allow value is more then current block number then the request is denied.
        if( t.nextRequestForLocationBlockNumber > block.number ) {
            return false;
        }

        t.isRequestingForLocation = true;

        // Update the next request block number to be roughly next 6 hours.
        // This simply work as a rate limit
        t.nextRequestForLocationBlockNumber = block.number + 1650;

        emit ProductLocationRequest(block.number, productId);

        return true;
    }

    function saveProductLocation( ProductTrack storage t, uint productId, uint timestamp, int latitude, int longitude ) 
    private
    {
        t.timestamp = timestamp;
        t.latitude = latitude;
        t.longitude = longitude;

        emit ProductLocation(block.number, productId, timestamp, latitude, longitude);
    }
}