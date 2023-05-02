import { ethers } from "hardhat";

async function main() {
  const Calculator = await ethers.getContractFactory("Calculator");
  const contract = await Calculator.deploy();

  await contract.deployed();
  
  console.log(`Contract deployed to: ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});