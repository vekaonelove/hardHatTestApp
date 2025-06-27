const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
    let myToken;
    let deployer, addr1, addr2;

    beforeEach(async function () {
        [deployer, addr1, addr2] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory("MyToken");
        myToken = await MyToken.deploy(ethers.utils.parseEther("1000000"));
        await myToken.deployed();
    });

    it("Should assign the initial supply to the deployer", async function () {
        const deployerBalance = await myToken.balanceOf(deployer.address);
        expect(deployerBalance).to.equal(ethers.utils.parseEther("1000000"));
    });

    it("Should allow owner to mint tokens", async function () {
        const mintAmount = ethers.utils.parseEther("5000");

        await myToken.mint(addr1.address, mintAmount);

        const addr1Balance = await myToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(mintAmount);
    });

    it("Should not allow non-owner to mint tokens", async function () {
        const mintAmount = ethers.utils.parseEther("5000");

        await expect(
            myToken.connect(addr1).mint(addr2.address, mintAmount)
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should allow token transfers", async function () {
        await myToken.transfer(addr1.address, ethers.utils.parseEther("100"));

        const addr1Balance = await myToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(ethers.utils.parseEther("100"));
    });

    it("Should fail if sender tries to transfer more tokens than balance", async function () {
        const initialDeployerBalance = await myToken.balanceOf(deployer.address);

        await expect(
            myToken.connect(addr1).transfer(deployer.address, ethers.utils.parseEther("1"))
        ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

        expect(await myToken.balanceOf(deployer.address)).to.equal(initialDeployerBalance);
    });
});
