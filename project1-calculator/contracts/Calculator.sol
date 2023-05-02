// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract Calculator {
    function sum(uint16 number1, uint16 number2) public pure returns (uint16) {
        return (number1 + number2);
    }

    function subtraction(uint16 number1, uint16 number2) public pure returns (uint16) {
        return (number1 - number2);
    }

    function multiplication(uint16 number1, uint16 number2) public pure returns (uint16) {
        return (number1 * number2);
    }

    function division(uint16 number1, uint16 number2) public pure returns (uint16) {
        return (number1 / number2);
    }
}