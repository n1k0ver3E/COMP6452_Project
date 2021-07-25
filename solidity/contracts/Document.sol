// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

// import profile contract
import "./Profile.sol";

/**
 * @title Document Management
 * @dev Implements document mMnagement.
 * To strore additional documents for account registration in Profile contract
 */
contract Document {
    //DocumentStatus: 0=Pending, 1=Approved, 2=Rejected
    enum DocumentStatus {
        Pending,
        Approved,
        Rejected
    }

    Profile profile;

    address public regulatorAddress;
    uint256 public lastDocIndex;

    struct DocumentItem {
        uint256 documentId;
        string documentName;
        uint256 accountId;
        address accountAddress;
        DocumentStatus documentStatus;
        string hashContent; // TODO: recheck that it can store hash data
        uint256 timestamp;
    }
    // Get account Info. by referenceId
    mapping(uint256 => DocumentItem[]) public documentsByAccId;

    // @notice To create document contract and have an association relationship with Profile contract
    constructor(address _profileAddress) {
        profile = Profile(_profileAddress);
        lastDocIndex = 0;
        regulatorAddress = profile.getRegulatorAddress();
    }

    // Create events for using in JavaScript API
    // Event 1: AddDocument by Farmer,Manufacturer,Reatiler,Logistic
    event AddDocument(
        uint256 indexed documentId,
        string documentName,
        uint256 indexed accountId,
        address accountAddress,
        uint256 documentStatus,
        string hashContent // To DO: check with Promie that could he send bytes32 ?
    );
    // Event 2: VerifyDocument by Regulator
    event VerifyDocument(
        uint256 indexed accountId,
        address accountAddress,
        uint256 indexed documentId,
        uint256 documentStatus
    );

    /// @notice Function 1: Add document for registration
    function addDocument(
        uint256 _accountId,
        string memory _documentName,
        string memory _hashContent
    ) public onlyDocumentOwner(_accountId) {
        require(
            bytes(_documentName).length != 0,
            "Document name cannot be empty"
        );
        uint256 newId = lastDocIndex + 1;
        // create a new doc item
        DocumentItem memory documentItem = DocumentItem(
            newId,
            _documentName,
            _accountId,
            msg.sender,
            DocumentStatus.Pending,
            _hashContent,
            block.number
        );

        // Add doc item to mapping documentsByRefId
        documentsByAccId[_accountId].push(documentItem);
        // upd next index
        lastDocIndex = lastDocIndex + 1;

        emit AddDocument(
            documentItem.documentId,
            documentItem.documentName,
            documentItem.accountId,
            documentItem.accountAddress,
            uint256(documentItem.documentStatus),
            documentItem.hashContent
        );
    }

    /// @notice Function 2: approveAccount. Only regulator account can use this function.
    function verifydocument(
        uint256 _accountId,
        uint256 _documentId,
        uint256 _documentStatusValue
    ) public onlyRegulator {
        require(
            _documentId > 0 &&
                _documentId <= documentsByAccId[_accountId].length,
            "Cannot find the document."
        );
        // Get document item by referenceId and doc. item index

        documentsByAccId[_accountId][_documentId - 1]
        .documentStatus = DocumentStatus(_documentStatusValue);

        emit VerifyDocument(
            documentsByAccId[_accountId][_documentId - 1].accountId,
            msg.sender,
            documentsByAccId[_accountId][_documentId - 1].documentId,
            uint256(
                documentsByAccId[_accountId][_documentId - 1].documentStatus
            )
        );
    }

    // modifier
    modifier onlyDocumentOwner(uint256 _accountId) {
        require(
            profile.isAccountOwner(msg.sender, _accountId) == true,
            "This function can only be executed by the owner."
        );
        _;
    }

    // modifier
    modifier onlyRegulator {
        require(
            msg.sender == regulatorAddress,
            "This function can only be executed by the regulator."
        );
        _;
    }
}
