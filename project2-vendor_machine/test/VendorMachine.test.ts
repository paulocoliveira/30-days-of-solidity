import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("VendorMachine", function () {
    async function deployFixture() {
        const accounts = await ethers.getSigners();
    
        const Calculator = await ethers.getContractFactory("VendorMachine");
        const contract = await Calculator.deploy();
        return { contract, accounts };
    }

    it("Buy a product", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        const instance = contract.connect(accounts[1]);
        const paidValue = ethers.utils.parseEther("0.3");

        await instance.buy(3, {value: paidValue});

        console.log(await contract.getBalance());

        expect(await contract.getBalance() == paidValue);
    });
    
});