const { ethers } = require("hardhat");

async function main() {
    const [owner1, owner2, owner3] = await ethers.getSigners();

    const owners = [owner1.address, owner2.address, owner3.address];
    const requiredConfirmations = 2;

    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const wallet = await MultiSigWallet.deploy(owners, requiredConfirmations);

    await wallet.waitForDeployment();

    console.log("MultiSigWallet deployed to:", wallet.target);
    console.log("Owners:", owners);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
