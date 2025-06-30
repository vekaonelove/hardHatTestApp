const { ethers, upgrades } = require("hardhat");

async function main() {
    const proxyAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

    const MyTokenV2 = await ethers.getContractFactory("MyTokenV2");
    console.log("Upgrading to MyTokenV2...");

    const myTokenV2 = await upgrades.upgradeProxy(proxyAddress, MyTokenV2);

    await myTokenV2.initializeV2("MyToken V2");

    console.log("Upgrade complete. Proxy is now at:", proxyAddress);

    const version = await myTokenV2.version();
    console.log("Version function returns:", version);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
