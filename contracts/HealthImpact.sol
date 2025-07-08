// SPDX-License-Identifier: KAIRO-Covenant-v1.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./FlameBornToken.sol";

contract HealthImpact is AccessControl, ReentrancyGuard, Pausable {
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant FACILITY_ADMIN_ROLE = keccak256("FACILITY_ADMIN_ROLE");
    
    FlameBornToken public flbToken;
    
    struct HealthFacility {
        uint256 id;
        string name;
        string location;
        string facilityType; // Hospital, Clinic, Health Post, Mobile Unit
        address walletAddress;
        bool isVerified;
        uint256 totalDonationsReceived;
        uint256 totalFLBReceived;
        uint256 lastDonationTime;
        string[] services;
        string contactInfo;
        string verificationHash; // IPFS hash for verification documents
    }
    
    struct Donation {
        uint256 id;
        address donor;
        uint256 facilityId;
        uint256 bnbAmount;
        uint256 flbAmount;
        uint256 timestamp;
        string purpose;
        bool isProcessed;
    }
    
    struct ImpactMetrics {
        uint256 totalFacilities;
        uint256 totalDonations;
        uint256 totalBNBDonated;
        uint256 totalFLBDistributed;
        uint256 facilitiesSupported;
        mapping(string => uint256) countryStats; // country => total donations
        mapping(string => uint256) facilityTypeStats; // type => count
    }
    
    // State variables
    mapping(uint256 => HealthFacility) public facilities;
    mapping(uint256 => Donation) public donations;
    mapping(address => uint256[]) public userDonations;
    mapping(uint256 => uint256[]) public facilityDonations;
    
    uint256 public nextFacilityId = 1;
    uint256 public nextDonationId = 1;
    uint256 public donationPool;
    ImpactMetrics public metrics;
    
    // Distribution percentages (basis points: 7000 = 70%)
    uint256 public constant FACILITY_PERCENTAGE = 7000; // 70% to facilities
    uint256 public constant PLATFORM_PERCENTAGE = 3000; // 30% to platform
    
    // Events
    event FacilityRegistered(uint256 indexed facilityId, string name, address wallet);
    event FacilityVerified(uint256 indexed facilityId, address verifier);
    event DonationMade(uint256 indexed donationId, address donor, uint256 facilityId, uint256 amount);
    event DonationProcessed(uint256 indexed donationId, uint256 flbAmount);
    event ImpactUpdated(uint256 totalFacilities, uint256 totalDonations);
    
    constructor(address _flbToken) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
        _grantRole(FACILITY_ADMIN_ROLE, msg.sender);
        flbToken = FlameBornToken(_flbToken);
    }
    
    // Facility Management
    function registerFacility(
        string memory name,
        string memory location,
        string memory facilityType,
        address walletAddress,
        string[] memory services,
        string memory contactInfo,
        string memory verificationHash
    ) external onlyRole(FACILITY_ADMIN_ROLE) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(walletAddress != address(0), "Invalid wallet address");
        
        facilities[nextFacilityId] = HealthFacility({
            id: nextFacilityId,
            name: name,
            location: location,
            facilityType: facilityType,
            walletAddress: walletAddress,
            isVerified: false,
            totalDonationsReceived: 0,
            totalFLBReceived: 0,
            lastDonationTime: 0,
            services: services,
            contactInfo: contactInfo,
            verificationHash: verificationHash
        });
        
        metrics.totalFacilities++;
        metrics.facilityTypeStats[facilityType]++;
        
        emit FacilityRegistered(nextFacilityId, name, walletAddress);
        nextFacilityId++;
    }
    
    function verifyFacility(uint256 facilityId) external onlyRole(VERIFIER_ROLE) {
        require(facilities[facilityId].id != 0, "Facility does not exist");
        require(!facilities[facilityId].isVerified, "Facility already verified");
        
        facilities[facilityId].isVerified = true;
        
        // Register facility address in FLB token contract
        flbToken.verifyHealthFacility(facilities[facilityId].walletAddress, true);
        
        emit FacilityVerified(facilityId, msg.sender);
    }
    
    // Donation Functions
    function donate(uint256 facilityId, string memory purpose) 
        external payable nonReentrant whenNotPaused {
        require(msg.value > 0, "Donation amount must be greater than 0");
        require(facilities[facilityId].id != 0, "Facility does not exist");
        require(facilities[facilityId].isVerified, "Facility not verified");
        
        // Create donation record
        donations[nextDonationId] = Donation({
            id: nextDonationId,
            donor: msg.sender,
            facilityId: facilityId,
            bnbAmount: msg.value,
            flbAmount: 0, // Will be set when processed
            timestamp: block.timestamp,
            purpose: purpose,
            isProcessed: false
        });
        
        // Update tracking
        userDonations[msg.sender].push(nextDonationId);
        facilityDonations[facilityId].push(nextDonationId);
        donationPool += msg.value;
        
        emit DonationMade(nextDonationId, msg.sender, facilityId, msg.value);
        nextDonationId++;
    }
    
    function processDonation(uint256 donationId) 
        external onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
        require(donations[donationId].id != 0, "Donation does not exist");
        require(!donations[donationId].isProcessed, "Donation already processed");
        
        Donation storage donation = donations[donationId];
        HealthFacility storage facility = facilities[donation.facilityId];
        
        // Calculate FLB amount (1 BNB = 1 FLB for simplicity)
        uint256 flbAmount = donation.bnbAmount;
        
        // Calculate distribution
        uint256 facilityAmount = (flbAmount * FACILITY_PERCENTAGE) / 10000;
        uint256 platformAmount = flbAmount - facilityAmount;
        
        // Mint FLB tokens
        flbToken.mint(facility.walletAddress, facilityAmount);
        flbToken.mint(address(this), platformAmount); // Platform treasury
        
        // Update records
        donation.flbAmount = flbAmount;
        donation.isProcessed = true;
        
        facility.totalDonationsReceived += donation.bnbAmount;
        facility.totalFLBReceived += facilityAmount;
        facility.lastDonationTime = block.timestamp;
        
        // Update metrics
        metrics.totalDonations++;
        metrics.totalBNBDonated += donation.bnbAmount;
        metrics.totalFLBDistributed += flbAmount;
        
        if (facility.totalDonationsReceived == donation.bnbAmount) {
            metrics.facilitiesSupported++;
        }
        
        emit DonationProcessed(donationId, flbAmount);
        emit ImpactUpdated(metrics.totalFacilities, metrics.totalDonations);
    }
    
    // Batch processing for efficiency
    function batchProcessDonations(uint256[] calldata donationIds) 
        external onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i = 0; i < donationIds.length; i++) {
            if (!donations[donationIds[i]].isProcessed) {
                processDonation(donationIds[i]);
            }
        }
    }
    
    // Fund management
    function fundRewardPool() external payable onlyRole(DEFAULT_ADMIN_ROLE) {
        require(msg.value > 0, "No funds sent");
        donationPool += msg.value;
    }
    
    function withdrawPlatformFunds(uint256 amount) 
        external onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
        require(amount <= address(this).balance, "Insufficient balance");
        payable(msg.sender).transfer(amount);
    }
    
    // View Functions
    function getFacility(uint256 facilityId) 
        external view returns (HealthFacility memory) {
        return facilities[facilityId];
    }
    
    function getDonation(uint256 donationId) 
        external view returns (Donation memory) {
        return donations[donationId];
    }
    
    function getUserDonations(address user) 
        external view returns (uint256[] memory) {
        return userDonations[user];
    }
    
    function getFacilityDonations(uint256 facilityId) 
        external view returns (uint256[] memory) {
        return facilityDonations[facilityId];
    }
    
    function getImpactMetrics() external view returns (
        uint256 totalFacilities,
        uint256 totalDonations,
        uint256 totalBNBDonated,
        uint256 totalFLBDistributed,
        uint256 facilitiesSupported
    ) {
        return (
            metrics.totalFacilities,
            metrics.totalDonations,
            metrics.totalBNBDonated,
            metrics.totalFLBDistributed,
            metrics.facilitiesSupported
        );
    }
    
    // Emergency functions
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
    
    function emergencyWithdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }
}
