import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Voting contract...");
  const votingContract = await ethers.deployContract("Voting");

  await votingContract.waitForDeployment();

  const contractAddress = await votingContract.getAddress();
  console.log(`Voting contract deployed to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
