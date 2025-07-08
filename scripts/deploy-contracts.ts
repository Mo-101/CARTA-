import { ethers } from "hardhat"
import { writeFileSync } from "fs"

async function main() {
  console.log("🔥 Starting FlameBorn Smart Contract Deployment...")

  // Get the deployer account
  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with account:", deployer.address)
  console.log("Account balance:", (await deployer.getBalance()).toString())

  // Deploy FlameBorn Token Contract
  console.log("\n📄 Deploying FlameBorn Token...")
  const FlameBornToken = await ethers.getContractFactory("FlameBornToken")
  const flbToken = await FlameBornToken.deploy(
    "FlameBorn Token",
    "FLB",
    ethers.utils.parseEther("1000000000"), // 1 billion FLB total supply
  )
  await flbToken.deployed()
  console.log("✅ FlameBorn Token deployed to:", flbToken.address)

  // Deploy Youth Reward Contract
  console.log("\n🎓 Deploying Youth Reward Contract...")
  const YouthReward = await ethers.getContractFactory("YouthReward")
  const youthReward = await YouthReward.deploy(flbToken.address)
  await youthReward.deployed()
  console.log("✅ Youth Reward Contract deployed to:", youthReward.address)

  // Deploy Health Impact Contract
  console.log("\n🏥 Deploying Health Impact Contract...")
  const HealthImpact = await ethers.getContractFactory("HealthImpact")
  const healthImpact = await HealthImpact.deploy(flbToken.address)
  await healthImpact.deployed()
  console.log("✅ Health Impact Contract deployed to:", healthImpact.address)

  // Deploy Validator Contract
  console.log("\n✅ Deploying Validator Contract...")
  const ValidatorReward = await ethers.getContractFactory("ValidatorReward")
  const validatorReward = await ValidatorReward.deploy(flbToken.address)
  await validatorReward.deployed()
  console.log("✅ Validator Contract deployed to:", validatorReward.address)

  // Grant roles and setup permissions
  console.log("\n🔐 Setting up permissions...")

  // Grant minter role to reward contracts
  const MINTER_ROLE = await flbToken.MINTER_ROLE()
  await flbToken.grantRole(MINTER_ROLE, youthReward.address)
  await flbToken.grantRole(MINTER_ROLE, healthImpact.address)
  await flbToken.grantRole(MINTER_ROLE, validatorReward.address)
  console.log("✅ Minter roles granted to reward contracts")

  // Fund reward pools with initial amounts
  console.log("\n💰 Funding reward pools...")
  await youthReward.fundRewardPool({ value: ethers.utils.parseEther("100") }) // 100 BNB
  await healthImpact.fundRewardPool({ value: ethers.utils.parseEther("500") }) // 500 BNB
  await validatorReward.fundRewardPool({ value: ethers.utils.parseEther("50") }) // 50 BNB
  console.log("✅ Reward pools funded")

  // Save deployment addresses
  const deploymentInfo = {
    network: "BSC Testnet",
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      FlameBornToken: flbToken.address,
      YouthReward: youthReward.address,
      HealthImpact: healthImpact.address,
      ValidatorReward: validatorReward.address,
    },
    transactionHashes: {
      FlameBornToken: flbToken.deployTransaction.hash,
      YouthReward: youthReward.deployTransaction.hash,
      HealthImpact: healthImpact.deployTransaction.hash,
      ValidatorReward: validatorReward.deployTransaction.hash,
    },
  }

  writeFileSync(`deployments/${Date.now()}-deployment.json`, JSON.stringify(deploymentInfo, null, 2))

  console.log("\n🎉 Deployment Complete!")
  console.log("📋 Contract Addresses:")
  console.log("   FLB Token:", flbToken.address)
  console.log("   Youth Reward:", youthReward.address)
  console.log("   Health Impact:", healthImpact.address)
  console.log("   Validator Reward:", validatorReward.address)
  console.log("\n📁 Deployment info saved to deployments/ directory")

  // Verify contracts on BSCScan
  console.log("\n🔍 Contract verification commands:")
  console.log(
    `npx hardhat verify --network bscTestnet ${flbToken.address} "FlameBorn Token" "FLB" "1000000000000000000000000000"`,
  )
  console.log(`npx hardhat verify --network bscTestnet ${youthReward.address} ${flbToken.address}`)
  console.log(`npx hardhat verify --network bscTestnet ${healthImpact.address} ${flbToken.address}`)
  console.log(`npx hardhat verify --network bscTestnet ${validatorReward.address} ${flbToken.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error)
    process.exit(1)
  })
