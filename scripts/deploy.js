const { ethers } = require("hardhat");
const { parseEther } = require("ethers");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with account:", deployer.address);

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(parseEther("1000000")); // 1 million tokens

    await myToken.waitForDeployment();

    console.log("MyToken deployed to:", myToken.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

//made some changes to the script to compile, because my local hardhat uses Ethers.js v6