import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Calculator", function () {
    async function deployFixture() {
        const accounts = await ethers.getSigners();
    
        const Calculator = await ethers.getContractFactory("Calculator");
        const contract = await Calculator.deploy();
        return { contract, accounts };
    }

    it("Calculate the sum of two numbers", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);

        expect(await contract.sum(10, 20)).to.equal(30);
    });

    it("Calculate the subtraction of two numbers", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);

        expect(await contract.subtraction(30, 15)).to.equal(15);
    });

    it("Calculate the multiplication of two numbers", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);

        expect(await contract.multiplication(7, 2)).to.equal(14);
    });

    it("Calculate the division of two numbers", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);

        expect(await contract.division(10, 5)).to.equal(2);
    });

    
});