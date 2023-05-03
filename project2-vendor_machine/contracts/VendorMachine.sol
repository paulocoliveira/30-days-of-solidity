// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract VendorMachine {
    
    address owner;

    mapping(uint16 => uint) public productPrice;
    mapping(uint16 => uint16) public productQty;

    constructor() {

        owner = msg.sender;

        productPrice[1] = 0.1 ether;
        productQty[1] = 10;
        productPrice[2] = 0.2 ether;
        productQty[2] = 10;
        productPrice[3] = 0.3 ether;
        productQty[3] = 10;
        productPrice[4] = 0.4 ether;
        productQty[4] = 10;
        productPrice[5] = 0.5 ether;
        productQty[5] = 1;
    }
    
    function buy(uint16 product) external payable {
        require(productQty[product] > 0, "Product unavailable!");
        require(msg.value == productPrice[product], "Incorrect value!");
        productQty[product]--;      
    }

    function addStock(uint16 product, uint16 quantity) external {
        require(msg.sender == owner, "You don't have permission!");
        require(product > 0 && product <= 5, "Invalid product!");
        require(quantity > 0, "Invalid quantity!");
        productQty[product] += quantity;
    }

    function changePrice(uint16 product, uint newPrice) external {
        require(msg.sender == owner, "You don't have permission!");
        require(product > 0 && product <= 5, "Invalid product!");
        require(newPrice > 0, "Invalid price!");
        productPrice[product] = newPrice;
    }

    function withdraw() external payable {
        require(msg.sender == owner, "You don't have permission!");
        uint balance = address(this).balance;
        require(balance > 0, "No balance to withdraw!");
        payable(owner).transfer(balance);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getStock(uint16 product) public view returns (uint16) {
        return productQty[product];
    }

    function getPrice(uint16 product) public view returns (uint) {
        return productPrice[product];
    }
}