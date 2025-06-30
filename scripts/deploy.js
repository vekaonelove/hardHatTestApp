const hre = require("hardhat");
const { ethers, upgrades } = hre;

async function main() {
    const MyTokenV1 = await ethers.getContractFactory("MyTokenV1");

    console.log("Deploying MyTokenV1...");
    const myToken = await upgrades.deployProxy(MyTokenV1, [ethers.parseEther("1000000")], {
        initializer: "initialize",
    });
    await myToken.waitForDeployment();

    console.log("MyTokenV1 deployed to:", await myToken.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
