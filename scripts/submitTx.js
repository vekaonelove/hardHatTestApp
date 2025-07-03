const { ethers } = require("hardhat");

async function main() {
    const walletAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const to = "0x000000000000000000000000000000000000dead"; // Target address
    const value = ethers.utils.parseEther("1.0"); // 1 ETH
    const data = "0x";

    const [owner1] = await ethers.getSigners();
    const wallet = await ethers.getContractAt("MultiSigWallet", walletAddress);

    const tx = await wallet.connect(owner1).submitTransaction(to, value, data);
    const receipt = await tx.wait();

    const event = receipt.events.find(e => e.event === "SubmitTransaction");
    const txIndex = event.args.txIndex;

    console.log(`Transaction submitted. Index: ${txIndex}`);
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
