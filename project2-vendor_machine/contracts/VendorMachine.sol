// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract VendorMachine {
    
    mapping(uint16 => uint) public productPrice;
    mapping(uint16 => uint) public productQty;

    constructor() {
        productPrice[1] = 0.1 ether;
        productQty[1] = 10;
        productPrice[2] = 0.2 ether;
        productQty[2] = 10;
        productPrice[3] = 0.3 ether;
        productQty[3] = 10;
        productPrice[4] = 0.4 ether;
        productQty[4] = 10;
        productPrice[5] = 0.5 ether;
        productQty[5] = 10;
    }
    
    function buy(uint16 product) external payable {
        console.log(productQty[product]);
        require(productQty[product] > 0, "Product unavailable!");
        require(msg.value == productPrice[product], "Incorrect value!");
        productQty[product]--;      
        console.log(productQty[product]);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}