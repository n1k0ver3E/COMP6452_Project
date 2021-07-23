// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

// import profile contract
import "./Profile.sol";

/**
 * @title Document Management
 * @dev Implements document mMnagement.
 * Constraints:
 * 1. One account address in Profile contract per one document contract
 */
contract Document {
    //DocumentStatus: 0=Pending, 1=Approved, 2=Rejected
    enum DocumentStatus {
        Pending,
        Approved,
        Rejected
    }
    //DocumentType: 1=Profile=,2=Product,3=Traceability
    enum DocumentType {
        Profile,
        Product,
        Traceability
    }

    Profile profile;

    address public documentOwner;
    address public regulatorAddress;
    uint256 public lastDocIndex;

    struct DocumentItem {
        uint256 documentId;
        string documentName;
        DocumentType documentType;
        uint256 referenceId; // can be accountId (reference to account in Profile Contract) or productId (reference to Product Contract or Trace Contract)
        DocumentStatus documentStatus;
        bytes32 hashContent; // To DO: check with Promie that could he send bytes32 ?
        // 0x7465737400000000000000000000000000000000000000000000000000000000
    }
    // Get account Info. by referenceId
    mapping(uint256 => DocumentItem[]) public documentsByRefId;

    // @notice To create document contract and have an association relationship with Profile contract
    constructor(address _profileAddress) {
        profile = Profile(_profileAddress);
        lastDocIndex = 0;
        regulatorAddress = profile.getRegulatorAddress();
        documentOwner = msg.sender;
    }

    // Create events for using in JavaScript API
    // Event 1: AddDocument by Farmer,Manufacturer,Reatiler,Logistic
    event AddDocument(
        uint256 indexed documentId,
        string documentName,
        uint256 documentType,
        uint256 indexed referenceId, // can be accountId (reference to account in Profile Contract) or productId (reference to Product Contract or Trace Contract)
        uint256 documentStatus,
        bytes32 hashContent // To DO: check with Promie that could he send bytes32 ?
    );
    // Event 2: VerifyDocument by Regulator
    event VerifyDocument(
        uint256 indexed referenceId,
        uint256 indexed documentId,
        uint256 documentStatus
    );

    /// @notice Function 1: Add document by Farmer,Manufacturer,Reatiler,Logistic
    /// @param _documentName Input a doc. name.
    /// @param _docTypeValue 1=Profile=,2=Product,3=Traceability
    /// @param _referenceId can be accountId (reference to account in Profile Contract) or productId (reference to Product Contract or Trace Contract)
    function addDocument(
        string memory _documentName,
        uint256 _docTypeValue,
        uint256 _referenceId,
        bytes32 _hashContent
    ) public onlyDocumentOwner {
        require(
            bytes(_documentName).length != 0,
            "Document name cannot be empty"
        );
        uint256 newId = lastDocIndex + 1;
        // create a new doc item
        DocumentItem memory documentItem = DocumentItem(
            newId,
            _documentName,
            DocumentType(_docTypeValue),
            _referenceId,
            DocumentStatus.Pending,
            _hashContent
        );

        // Add doc item to mapping documentsByRefId
        documentsByRefId[_referenceId].push(documentItem);
        // upd next index
        lastDocIndex = lastDocIndex + 1;

        emit AddDocument(
            documentItem.documentId,
            documentItem.documentName,
            uint256(documentItem.documentType),
            documentItem.referenceId,
            uint256(documentItem.documentStatus),
            documentItem.hashContent
        );
    }

    /// @notice Function 2: approveAccount. Only regulator account can use this function.
    /// @param _referenceId can be accountId (reference to account in Profile Contract) or productId (reference to Product Contract or Trace Contract)
    /// @param _documentId Input a doc. id.
    /// @param _documentStatusValue 0=Pending, 1=Approved, 2=Rejected
    function verifydocument(
        uint256 _referenceId,
        uint256 _documentId,
        uint256 _documentStatusValue
    ) public onlyRegulator {
        require(
            _documentId > 0 &&
                _documentId <= documentsByRefId[_referenceId].length,
            ""
        );
        // Get document item by referenceId and doc. item index

        documentsByRefId[_referenceId][_documentId - 1]
        .documentStatus = DocumentStatus(_documentStatusValue);

        emit VerifyDocument(
            documentsByRefId[_referenceId][_documentId - 1].referenceId,
            documentsByRefId[_referenceId][_documentId - 1].documentId,
            uint256(
                documentsByRefId[_referenceId][_documentId - 1].documentStatus
            )
        );
    }

    // modifier
    modifier onlyDocumentOwner {
        require(
            msg.sender == documentOwner,
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
