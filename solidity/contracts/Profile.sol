// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * @title Profile Management
 * @dev Implements profile mMnagement.
 * Constraints:
 * 1. Each participant per 1 account address
 * 2. only one regulator address per 1 profile contract
 * Program flow
 * 1. create "Profile contract" by adding regulator's address in its constructor.
 * 2. The participants(1=Farmer,2=Manufacturer,3=Retailer,4=Logistic) use the backend(off-chain) to call function registerAccount(on-chain)
 * 3. Event RegisterAccount is raised and the backend (off-chain) can get error and result from function registerAccount(on-chain). The backend can store the data in database off-chain.
 * 4. The initial of account status is  0=Pending.
 * 5. The regulator uses the off-chain app to pass the parameter of each participant account address and account status to function approveAccount(on-chain).
 * 6. To get accountInfo (struct Account), can directly call mapping accountInfoByAddress[accountAddress]
 */
contract Profile {
    //AccountStatus: 0=Pending, 1=Approved, 2=Rejected
    enum AccountStatus {
        Pending,
        Approved,
        Rejected
    }
    //AccountType: 0=Regulator,1=Farmer,2=Manufacturer,3=Retailer,4=Consumer,5=Logistic,6=Oracle
    enum AccountType {
        Regulator,
        Farmer,
        Manufacturer,
        Retailer,
        Consumer,
        Logistic,
        Oracle
    }

    // Enable = the participants can register their Accounts.
    // Disable = the participants cannot register their Accounts.
    // Both stages the regulator can still verify the participants' Accounts.
    enum RegisState {
        Enable,
        Disable
    }

    address private regulatorAddress;
    uint256 public lastAccountId;
    RegisState private regisState;

    struct Account {
        address accountAddress;
        string accountName;
        uint256 accountId;
        AccountType accountType;
        AccountStatus accountStatus;
        bool isValue; // To check duplicate account
        uint256 blockNo;
    }
    // Get account Info. by account address.
    mapping(address => Account) public accountInfoByAddress;

    // @notice To create profile contract, have to specify regulator's address first.
    constructor(address _regulatorAddress, string memory _regulatorName) {
        regulatorAddress = _regulatorAddress;
        lastAccountId = 0;
        // Create regulator account. Account index 0 is regulator
        Account memory regulatorAcc = Account(
            _regulatorAddress,
            _regulatorName,
            lastAccountId,
            AccountType.Regulator,
            AccountStatus.Approved,
            true,
            block.number
        );

        //add regulator acc. address to mapping.
        accountInfoByAddress[_regulatorAddress] = regulatorAcc;
    }

    // Create events for using in JavaScript API
    // Event 1: RegisterAccount by Farmer,Manufacturer,Reatiler,Logistic
    event RegisterAccount(
        address indexed accountAddress,
        string accountName,
        uint256 indexed accountId,
        uint256 accountType,
        uint256 accountStatus
    );
    // Event 2: ApproveAccount by Regulator
    event ApproveAccount(address accountAddress, uint256 accountStatus);

    /// @notice Function 1: createProfile for Regulator,Farmer,Manufacturer,Reatiler,Logistic
    /// @param _accountAddress Each participant can have only one accountAddress for this phase.
    /// @param _accountName The account name for account address.
    /// @param _accountTypeValue Specific the interger as following  0=Regulator,1=Farmer,2=Manufacturer,3=Reatiler,4=Logistic
    function registerAccount(
        address _accountAddress,
        string memory _accountName,
        uint256 _accountTypeValue
    ) public checkDuplicateAddress(_accountAddress) onlyActiveRegisState {
        require(_accountTypeValue != 0, "Cannot register as the regulator.");
        require(
            msg.sender == _accountAddress,
            "The account address must be the same as the sender's address"
        );
        uint256 tmpNewId = lastAccountId + 1;
        Account memory newAcc = Account(
            _accountAddress,
            _accountName,
            tmpNewId,
            AccountType(_accountTypeValue),
            AccountStatus.Pending,
            true,
            block.number
        );

        //add a new acc. address to mapping.
        accountInfoByAddress[_accountAddress] = newAcc;
        emit RegisterAccount(
            newAcc.accountAddress,
            newAcc.accountName,
            newAcc.accountId,
            uint256(newAcc.accountType),
            uint256(newAcc.accountStatus)
        );
        lastAccountId = tmpNewId;
    }

    /// @notice Function 2: approveAccount. Only regulator account can use this function.
    /// @param _accountAddress Each participant can have only one accountAddress for this phase.
    /// @param _accountStatus 0=Pending, 1=Approved, 2=Rejected
    function approveAccount(address _accountAddress, uint256 _accountStatus)
        public
        onlyRegulator
    {
        // Get account by accountAddress
        accountInfoByAddress[_accountAddress].accountStatus = AccountStatus(
            _accountStatus
        );
        emit ApproveAccount(
            accountInfoByAddress[_accountAddress].accountAddress,
            uint256(accountInfoByAddress[_accountAddress].accountStatus)
        );
    }

    /// @notice Function 3: getAccountInfoByAddress.(For the frontend off-chain)
    /// @param _accountAddress Each participant can have only one accountAddress for this phase.
    function getAccountInfoByAddress(address _accountAddress)
        public
        view
        returns (
            string memory accountName,
            uint256 accountId,
            uint256 accountTypeValue,
            uint256 accountStatusValue
        )
    {
        Account memory acc = accountInfoByAddress[_accountAddress];
        accountName = acc.accountName;
        accountId = acc.accountId;
        accountTypeValue = uint256(acc.accountType);
        accountStatusValue = uint256(acc.accountStatus);
    }

    function isAccountOwner(address _accountAddress, uint256 _accountId)
        public
        view
        returns (bool)
    {
        Account memory acc = accountInfoByAddress[_accountAddress];
        if (bytes(acc.accountName).length != 0) {
            if (acc.accountId == _accountId) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function isLogisticOrOracle(address _accountAddress)
        public
        view
        returns (bool)
    {
        if (
            bytes(accountInfoByAddress[_accountAddress].accountName).length != 0
        ) {
            if (
                (accountInfoByAddress[_accountAddress].accountStatus ==
                    AccountStatus.Approved) &&
                (accountInfoByAddress[_accountAddress].accountType ==
                    AccountType.Oracle ||
                    accountInfoByAddress[_accountAddress].accountType ==
                    AccountType.Logistic)
            ) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function isFarmer(address _accountAddress) public view returns (bool) {
        if (
            bytes(accountInfoByAddress[_accountAddress].accountName).length != 0
        ) {
            if (
                (accountInfoByAddress[_accountAddress].accountType ==
                    AccountType.Farmer) &&
                (accountInfoByAddress[_accountAddress].accountStatus ==
                    AccountStatus.Approved)
            ) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function isManufacturer(address _accountAddress)
        public
        view
        returns (bool)
    {
        if (
            bytes(accountInfoByAddress[_accountAddress].accountName).length != 0
        ) {
            if (
                (accountInfoByAddress[_accountAddress].accountType ==
                    AccountType.Manufacturer) &&
                (accountInfoByAddress[_accountAddress].accountStatus ==
                    AccountStatus.Approved)
            ) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function isRetailer(address _accountAddress) public view returns (bool) {
        if (
            bytes(accountInfoByAddress[_accountAddress].accountName).length != 0
        ) {
            if (
                (accountInfoByAddress[_accountAddress].accountType ==
                    AccountType.Retailer) &&
                (accountInfoByAddress[_accountAddress].accountStatus ==
                    AccountStatus.Approved)
            ) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function isConsumer(address _accountAddress) public view returns (bool) {
        if (
            bytes(accountInfoByAddress[_accountAddress].accountName).length != 0
        ) {
            if (
                (accountInfoByAddress[_accountAddress].accountType ==
                    AccountType.Consumer) &&
                (accountInfoByAddress[_accountAddress].accountStatus ==
                    AccountStatus.Approved)
            ) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function getRegulatorAddress() public view returns (address) {
        address _regulatorAddress = regulatorAddress;
        return _regulatorAddress;
    }

    function getRegisState() public view returns (uint256) {
        uint256 _regisState = uint256(regisState);
        return _regisState;
    }

    /// @notice Enable registration fn
    function setEnableRegisState() public onlyRegulator returns (uint256) {
        // Disable registration
        regisState = RegisState.Enable;
        return uint256(regisState);
    }

    /// @notice Disable registration fn
    function setDisableRegisState() public onlyRegulator returns (uint256) {
        // Disable registration
        regisState = RegisState.Disable;
        return uint256(regisState);
    }

    /// @notice Destroy Profile Contract
    function destroyContract() public payable onlyRegulator {
        // Disable registration
        regisState = RegisState.Disable;
        address payable regulator_address = payable(address(regulatorAddress));
        selfdestruct(regulator_address);
    }

    // private functions
    // Does account address exist?
    function isExisAccount(address _accountAddress)
        private
        view
        returns (bool)
    {
        if (accountInfoByAddress[_accountAddress].isValue) {
            return true;
        }
        return false;
    }

    // modifier
    modifier onlyRegulator {
        require(
            msg.sender == regulatorAddress,
            "This function can only be executed by the regulator."
        );
        _;
    }
    modifier checkDuplicateAddress(address _accountAddress) {
        require(
            isExisAccount(_accountAddress) == false,
            "Cannot register the duplicate account."
        );
        _;
    }
    modifier onlyActiveRegisState {
        require(
            regisState == RegisState.Enable,
            "The registration function is not enable."
        );
        _;
    }
}
