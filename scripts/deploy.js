const hre = require("hardhat");

async function main() {
    const Greeting = await hre.ethers.getContractFactory("Greeting");
    const greeting = await Greeting.deploy("Alice"); // Deploy contract with constructor argument

    await greeting.waitForDeployment();

    console.log("Greeting deployed to:", greeting.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

//Greeting deployed to: 0x07Bd329467eA8FbaC3FBc5e58FEa2bCd3e3407B7