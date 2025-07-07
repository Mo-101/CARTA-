// SPDX-License-Identifier: KAIRO-Covenant-v1.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./FlameBornToken.sol";

contract YouthReward is AccessControl, ReentrancyGuard {
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");
    bytes32 public constant COURSE_ADMIN_ROLE = keccak256("COURSE_ADMIN_ROLE");
    
    FlameBornToken public flbToken;
    
    struct Course {
        uint256 id;
        string name;
        string description;
        uint256 rewardAmount;
        bool active;
        uint256 completions;
        string contentHash; // IPFS hash for course content
    }
    
    struct YouthProgress {
        uint256 totalFLBEarned;
        uint256 coursesCompleted;
        uint256 lastActivityTime;
        bool isActive;
    }
    
    // Mappings
    mapping(uint256 => Course) public courses;
    mapping(address => mapping(uint256 => bool)) public completed;
    mapping(address => YouthProgress) public youthProgress;
    mapping(address => uint256[]) public userCompletedCourses;
    
    // State variables
    uint256 public nextCourseId = 1;
    uint256 public rewardPool;
    uint256 public totalFLBDistributed;
    uint256 public dailyRewardCap = 500 * 10**18; // 500 FLB per day per user
    mapping(address => mapping(uint256 => uint256)) public dailyEarnings; // user => day => amount
    
    // Events
    event CourseCreated(uint256 indexed courseId, string name, uint256 rewardAmount);
    event CourseCompleted(address indexed user, uint256 indexed courseId, uint256 reward);
    event YouthActionRewarded(address indexed user, string actionType, uint256 amount);
    event RewardPoolFunded(uint256 amount, address funder);
    
    constructor(address _flbToken) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VALIDATOR_ROLE, msg.sender);
        _grantRole(COURSE_ADMIN_ROLE, msg.sender);
        flbToken = FlameBornToken(_flbToken);
    }
    
    // Course Management
    function createCourse(
        string memory name,
        string memory description,
        uint256 rewardAmount,
        string memory contentHash
    ) external onlyRole(COURSE_ADMIN_ROLE) {
        courses[nextCourseId] = Course({
            id: nextCourseId,
            name: name,
            description: description,
            rewardAmount: rewardAmount,
            active: true,
            completions: 0,
            contentHash: contentHash
        });
        
        emit CourseCreated(nextCourseId, name, rewardAmount);
        nextCourseId++;
    }
    
    function updateCourse(
        uint256 courseId,
        string memory name,
        string memory description,
        uint256 rewardAmount,
        bool active
    ) external onlyRole(COURSE_ADMIN_ROLE) {
        require(courses[courseId].id != 0, "Course does not exist");
        
        courses[courseId].name = name;
        courses[courseId].description = description;
        courses[courseId].rewardAmount = rewardAmount;
        courses[courseId].active = active;
    }
    
    // Core Reward Functions
    function completeCourse(uint256 courseId) external nonReentrant {
        require(courses[courseId].active, "Course inactive");
        require(!completed[msg.sender][courseId], "Already completed");
        
        uint256 reward = courses[courseId].rewardAmount;
        require(rewardPool >= reward, "Insufficient reward pool");
        
        // Check daily earning cap
        uint256 today = block.timestamp / 86400; // Current day
        require(dailyEarnings[msg.sender][today] + reward <= dailyRewardCap, "Daily cap exceeded");
        
        // Update state
        completed[msg.sender][courseId] = true;
        userCompletedCourses[msg.sender].push(courseId);
        courses[courseId].completions++;
        
        // Update youth progress
        youthProgress[msg.sender].totalFLBEarned += reward;
        youthProgress[msg.sender].coursesCompleted++;
        youthProgress[msg.sender].lastActivityTime = block.timestamp;
        youthProgress[msg.sender].isActive = true;
        
        // Update daily earnings
        dailyEarnings[msg.sender][today] += reward;
        
        // Transfer reward
        rewardPool -= reward;
        totalFLBDistributed += reward;
        flbToken.mint(msg.sender, reward);
        
        emit CourseCompleted(msg.sender, courseId, reward);
    }
    
    function recordYouthAction(
        address youth,
        uint256 flbAmount,
        string calldata actionType
    ) external onlyRole(VALIDATOR_ROLE) nonReentrant {
        require(youth != address(0), "Invalid address");
        require(flbAmount > 0, "Invalid amount");
        require(rewardPool >= flbAmount, "Insufficient reward pool");
        
        // Check daily earning cap
        uint256 today = block.timestamp / 86400;
        require(dailyEarnings[youth][today] + flbAmount <= dailyRewardCap, "Daily cap exceeded");
        
        // Update state
        youthProgress[youth].totalFLBEarned += flbAmount;
        youthProgress[youth].lastActivityTime = block.timestamp;
        youthProgress[youth].isActive = true;
        dailyEarnings[youth][today] += flbAmount;
        
        // Transfer reward
        rewardPool -= flbAmount;
        totalFLBDistributed += flbAmount;
        flbToken.mint(youth, flbAmount);
        
        emit YouthActionRewarded(youth, actionType, flbAmount);
    }
    
    // Funding Functions
    function fundRewardPool() external payable onlyRole(DEFAULT_ADMIN_ROLE) {
        require(msg.value > 0, "No funds sent");
        
        // Convert BNB to FLB equivalent for reward pool
        uint256 flbEquivalent = msg.value; // 1:1 ratio for simplicity
        rewardPool += flbEquivalent;
        
        emit RewardPoolFunded(flbEquivalent, msg.sender);
    }
    
    function fundRewardPoolWithFLB(uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(amount > 0, "Invalid amount");
        rewardPool += amount;
        emit RewardPoolFunded(amount, msg.sender);
    }
    
    // View Functions
    function getCourse(uint256 courseId) external view returns (Course memory) {
        return courses[courseId];
    }
    
    function getUserProgress(address user) external view returns (YouthProgress memory) {
        return youthProgress[user];
    }
    
    function getUserCompletedCourses(address user) external view returns (uint256[] memory) {
        return userCompletedCourses[user];
    }
    
    function getDailyEarnings(address user) external view returns (uint256) {
        uint256 today = block.timestamp / 86400;
        return dailyEarnings[user][today];
    }
    
    function getRemainingDailyCapacity(address user) external view returns (uint256) {
        uint256 today = block.timestamp / 86400;
        uint256 earned = dailyEarnings[user][today];
        return earned >= dailyRewardCap ? 0 : dailyRewardCap - earned;
    }
    
    // Admin Functions
    function setDailyRewardCap(uint256 newCap) external onlyRole(DEFAULT_ADMIN_ROLE) {
        dailyRewardCap = newCap;
    }
    
    function emergencyWithdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }
}
