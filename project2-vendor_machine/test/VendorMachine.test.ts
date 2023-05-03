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

        expect(await contract.getBalance() == paidValue);
    });

    it("Try to buy a product that is not available", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        const instance = contract.connect(accounts[1]);
        const paidValue = ethers.utils.parseEther("0.5");

        await instance.buy(5, {value: paidValue});

        await expect(instance.buy(5, {value: paidValue})).to.be.revertedWith("Product unavailable!");
    });

    it("Try to buy a product with wrong value", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        const instance = contract.connect(accounts[1]);
        const paidValue = ethers.utils.parseEther("0.2");

        await expect(instance.buy(5, {value: paidValue})).to.be.revertedWith("Incorrect value!");
    });

    it("Add stock", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        const quantity = await contract.getStock(3);

        await contract.addStock(3, 1);

        expect(await contract.getStock(3) == (quantity + 1));
    });

    it("Try to add stock without permission", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        const instance = contract.connect(accounts[1]);

        await expect(instance.addStock(1, 1)).to.be.revertedWith("You don't have permission!");
    });

    it("Try to add stock to an invalid product", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        await expect(contract.addStock(6, 1)).to.be.revertedWith("Invalid product!");
    });

    it("Try to add stock to an invalid quantity", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        await expect(contract.addStock(1, 0)).to.be.revertedWith("Invalid quantity!");
    });

    it("Change price", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        const newPrice = ethers.utils.parseEther("0.11");

        await contract.changePrice(1, newPrice);

        expect(await contract.getPrice(3) == newPrice);
    });

    it("Try to change price without permission", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        const newPrice = ethers.utils.parseEther("0.11");

        const instance = contract.connect(accounts[1]);

        await expect(instance.changePrice(1, newPrice)).to.be.revertedWith("You don't have permission!");
    });

    it("Try to change price to an invalid product", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        const newPrice = ethers.utils.parseEther("0.11");

        await expect(contract.changePrice(6, newPrice)).to.be.revertedWith("Invalid product!");
    });

    it("Try to change price to an invalid price", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        const newPrice = ethers.utils.parseEther("0");
        
        await expect(contract.changePrice(1, newPrice)).to.be.revertedWith("Invalid price!");
    });   

    it("Withdraw", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
        
        const paidValue = ethers.utils.parseEther("0.3");

        const instance = contract.connect(accounts[1]);
        await instance.buy(3, {value: paidValue});
    
        await contract.withdraw();

        const newbalance = ethers.utils.parseEther("0");

        expect(await contract.getBalance() == newbalance);
    });


    it("Try to withdraw without permission", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
                
        const paidValue = ethers.utils.parseEther("0.3");

        const instance = contract.connect(accounts[1]);
        await instance.buy(3, {value: paidValue});
    
        await expect(instance.withdraw()).to.be.revertedWith("You don't have permission!");
    });

    it("Try to withdraw without balance", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
                    
        await expect(contract.withdraw()).to.be.revertedWith("No balance to withdraw!");
    });

    
});