// SPDX-License-Identifier: KAIRO-Covenant-v1.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract FlameBornToken is ERC20, ERC20Burnable, ERC20Pausable, AccessControl, ReentrancyGuard {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion FLB
    uint256 public totalMinted;
    
    // Vesting and distribution tracking
    mapping(address => uint256) public vestingSchedule;
    mapping(address => uint256) public vestedAmount;
    mapping(address => bool) public isHealthFacility;
    mapping(address => bool) public isValidator;
    
    // Events
    event HealthFacilityVerified(address indexed facility, bool verified);
    event ValidatorRegistered(address indexed validator, bool registered);
    event TokensVested(address indexed beneficiary, uint256 amount);
    event EmergencyPause(address indexed admin, string reason);
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        require(initialSupply <= MAX_SUPPLY, "Initial supply exceeds max supply");
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
        
        // Mint initial supply to deployer
        _mint(msg.sender, initialSupply);
        totalMinted = initialSupply;
    }
    
    // Minting function with supply cap
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) nonReentrant {
        require(totalMinted + amount <= MAX_SUPPLY, "Minting would exceed max supply");
        require(to != address(0), "Cannot mint to zero address");
        
        _mint(to, amount);
        totalMinted += amount;
    }
    
    // Batch minting for efficiency
    function batchMint(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external onlyRole(MINTER_ROLE) nonReentrant {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        
        require(totalMinted + totalAmount <= MAX_SUPPLY, "Batch minting would exceed max supply");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "Cannot mint to zero address");
            _mint(recipients[i], amounts[i]);
        }
        
        totalMinted += totalAmount;
    }
    
    // Health facility verification
    function verifyHealthFacility(address facility, bool verified) 
        external onlyRole(DEFAULT_ADMIN_ROLE) {
        isHealthFacility[facility] = verified;
        emit HealthFacilityVerified(facility, verified);
    }
    
    // Validator registration
    function registerValidator(address validator, bool registered) 
        external onlyRole(DEFAULT_ADMIN_ROLE) {
        isValidator[validator] = registered;
        emit ValidatorRegistered(validator, registered);
    }
    
    // Vesting functionality
    function setVestingSchedule(address beneficiary, uint256 amount) 
        external onlyRole(DEFAULT_ADMIN_ROLE) {
        vestingSchedule[beneficiary] = amount;
    }
    
    function releaseVestedTokens(address beneficiary) external nonReentrant {
        uint256 vested = vestingSchedule[beneficiary];
        require(vested > 0, "No tokens to vest");
        require(vestedAmount[beneficiary] < vested, "All tokens already vested");
        
        uint256 toRelease = vested - vestedAmount[beneficiary];
        vestedAmount[beneficiary] = vested;
        
        _mint(beneficiary, toRelease);
        totalMinted += toRelease;
        
        emit TokensVested(beneficiary, toRelease);
    }
    
    // Emergency functions
    function pause(string calldata reason) public onlyRole(PAUSER_ROLE) {
        _pause();
        emit EmergencyPause(msg.sender, reason);
    }
    
    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }
    
    // Burn function with role control
    function burnFrom(address account, uint256 amount) public override {
        require(
            hasRole(BURNER_ROLE, msg.sender) || account == msg.sender,
            "Caller is not a burner or token owner"
        );
        super.burnFrom(account, amount);
    }
    
    // Override required by Solidity
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Pausable) {
        super._beforeTokenTransfer(from, to, amount);
    }
    
    // View functions
    function getRemainingSupply() external view returns (uint256) {
        return MAX_SUPPLY - totalMinted;
    }
    
    function getVestingInfo(address beneficiary) 
        external view returns (uint256 scheduled, uint256 released) {
        return (vestingSchedule[beneficiary], vestedAmount[beneficiary]);
    }
}
