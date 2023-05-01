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

    it("Should deploy", async () => {
        const { contract, accounts } = await loadFixture(deployFixture);
    });
});