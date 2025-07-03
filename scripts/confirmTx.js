const { ethers } = require("hardhat");

async function main() {
    const walletAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const txIndex = 0;

    const [, owner2] = await ethers.getSigners(); // 2nd owner
    const wallet = await ethers.getContractAt("MultiSigWallet", walletAddress);

    const tx = await wallet.connect(owner2).confirmTransaction(txIndex);
    await tx.wait();

    console.log(`Transaction at index ${txIndex} confirmed by Owner 2`);
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
