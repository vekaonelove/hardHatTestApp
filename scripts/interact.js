const { ethers } = require("hardhat");

async function main() {
    const [owner, user] = await ethers.getSigners();
    const proxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const MyToken = await ethers.getContractAt("MyTokenV2", proxyAddress);

    console.log("Minting 1000 tokens to owner...");
    await MyToken.mint(owner.address, ethers.parseEther("1000"));

    console.log("Transferring 200 tokens to user...");
    await MyToken.transfer(user.address, ethers.parseEther("200"));

    const balOwner = await MyToken.balanceOf(owner.address);
    const balUser = await MyToken.balanceOf(user.address);

    console.log("Owner balance:", ethers.formatEther(balOwner));
    console.log("User balance:", ethers.formatEther(balUser));
}

main().catch(console.error);
