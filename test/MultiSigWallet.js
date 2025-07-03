const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWallet", function () {
    let wallet;
    let owners;
    let requiredConfirmations;
    let owner1, owner2, owner3, nonOwner;

    beforeEach(async function () {
        [owner1, owner2, owner3, nonOwner] = await ethers.getSigners();
        owners = [owner1.address, owner2.address, owner3.address];
        requiredConfirmations = 2;

        const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
        wallet = await MultiSigWallet.deploy(owners, requiredConfirmations);
    });

    it("should initialize with correct owners and required confirmations", async function () {
        for (let i = 0; i < owners.length; i++) {
            expect(await wallet.isOwner(owners[i])).to.equal(true);
        }
        expect(await wallet.required()).to.equal(requiredConfirmations);
    });

    it("should allow only owners to submit a transaction", async function () {
        const to = nonOwner.address;
        const value = 0;

        await expect(
            wallet.connect(nonOwner).submitTransaction(to, value, "0x")
        ).to.be.revertedWith("not owner");

        await expect(wallet.connect(owner1).submitTransaction(to, value, "0x"))
            .to.emit(wallet, "Submit");
    });

    it("should allow owners to confirm and execute transaction after required confirmations", async function () {
        const to = nonOwner.address;
        const value = 0;

        await wallet.connect(owner1).submitTransaction(to, value, "0x");
        const txIndex = 0;

        await wallet.connect(owner1).confirmTransaction(txIndex);
        await wallet.connect(owner2).confirmTransaction(txIndex);

        await expect(wallet.connect(owner1).executeTransaction(txIndex))
            .to.emit(wallet, "Execute");
    });

    it("should prevent double confirmations by the same owner", async function () {
        const to = nonOwner.address;
        const value = 0;
        await wallet.connect(owner1).submitTransaction(to, value, "0x");
        const txIndex = 0;

        await wallet.connect(owner1).confirmTransaction(txIndex);
        await expect(wallet.connect(owner1).confirmTransaction(txIndex))
            .to.be.revertedWith("tx already confirmed");
    });

    it("should not execute transaction before reaching required confirmations", async function () {
        const to = nonOwner.address;
        const value = 0;
        await wallet.connect(owner1).submitTransaction(to, value, "0x");
        const txIndex = 0;

        await wallet.connect(owner1).confirmTransaction(txIndex);

        await expect(wallet.connect(owner1).executeTransaction(txIndex))
            .to.be.revertedWith("not enough confirmations");
    });

    it("should allow owners to revoke confirmation", async function () {
        const to = nonOwner.address;
        const value = 0;
        await wallet.connect(owner1).submitTransaction(to, value, "0x");
        const txIndex = 0;

        await wallet.connect(owner1).confirmTransaction(txIndex);
        await wallet.connect(owner1).revokeConfirmation(txIndex);

        await expect(wallet.connect(owner1).executeTransaction(txIndex))
            .to.be.revertedWith("not enough confirmations");
    });
});
