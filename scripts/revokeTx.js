const { ethers } = require("hardhat");

async function main() {
    const walletAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const txIndex = 0;

    const [owner1] = await ethers.getSigners();
    const wallet = await ethers.getContractAt("MultiSigWallet", walletAddress);

    const tx = await wallet.connect(owner1).revokeConfirmation(txIndex);
    await tx.wait();

    console.log(`Transaction at index ${txIndex} revoked by Owner 1`);
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
